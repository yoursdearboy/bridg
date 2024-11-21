from typing import Any, Callable, Type, overload

from cattr import Converter
from flask import abort, current_app, redirect, render_template, request
from flask.views import MethodView
from flask_sqlalchemy import SQLAlchemy
from wtforms import Form

from bridg import converter
from web.breadcrumbs import Breadcrumb, breadcrumbs


class BaseView(MethodView):
    """
    [On design](https://stackoverflow.com/q/21383063)
    """

    def setup(self, **kwargs):
        self.kwargs = kwargs

    def dispatch_request(self, **kwargs):
        all_args = request.args.to_dict() | kwargs
        self.setup(**all_args)
        return super().dispatch_request(**all_args)




class SQLAlchemyMixin(BaseView):
    db: SQLAlchemy
    model: Any
    get_query: Callable


class ContextMixin(BaseView):
    # TODO: add kwargs?
    def get_context(self):
        return self.kwargs


class JinjaMixin(ContextMixin, BaseView):
    template_name: str

    # TODO: add kwargs?
    def render_template(self):
        ctx = self.get_context()
        return render_template(self.template_name, **ctx)


class JSONMixin(BaseView):
    schema: Any

    def dump(self, object):
        return self.schema.model_validate(object).model_dump()


class FormMixin(BaseView):
    object: Any
    form_class: Type[Form]

    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.form = self.get_form(object=self.object, **kwargs)

    def get_form(self, object=None, **kwargs):
        return self.form_class(obj=object)

    def validate(self, form, **kwargs):
        return form.validate()

    def get_data(self, form, **kwargs):
        return form.data


class ConverterMixin(BaseView):
    converter: Converter

    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.converter = converter


class RedirectMixin:
    def url_for_redirect(self, **kwargs):
        raise ValueError("Redirect url not defined")

    def redirect(self, **kwargs):
        return redirect(self.url_for_redirect(**kwargs))


def _get_rule(endpoint: str):
    blueprint_name = request.blueprint
    if endpoint[:1] == ".":
        if blueprint_name is not None:
            endpoint = f"{blueprint_name}{endpoint}"
        else:
            endpoint = endpoint[1:]
    rules = current_app.url_map._rules_by_endpoint[endpoint]
    if len(rules) > 0:
        return rules[0]
    return


def _select_keys(x, keys):
    return {k: v for k, v in x.items() if k in keys}


class BreadcrumbsMixin(ContextMixin, BaseView):
    breadcrumbs = breadcrumbs

    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.setup_breadcrumbs(**kwargs)

    def setup_breadcrumbs(self, **kwargs):
        return

    @overload
    def add_breadcrumb(self, arg: Breadcrumb): ...

    @overload
    def add_breadcrumb(self, arg: str, text: str, **kwargs): ...

    @overload
    def add_breadcrumb(self, arg: None, text: str, **kwargs): ...

    def add_breadcrumb(self, arg: Breadcrumb | str | None, text: str | None = None, **kwargs):
        if isinstance(arg, Breadcrumb):
            self.breadcrumbs.append(arg)
        elif isinstance(arg, str) or arg is None:
            if text is None:
                raise ValueError("No breadcrumb text")
            url = arg
            if arg and (built_url := self._url_for(arg, **kwargs)):
                url = built_url
            self.breadcrumbs.append(Breadcrumb(url, text))
        else:
            raise ValueError("Unknown breadcrumb type")

    def _url_for(self, endpoint: str, **kwargs):
        "Context aware url_for"
        if rule := _get_rule(endpoint):
            args = self.get_context()
            args = _select_keys(args, rule.arguments) | kwargs
            res = rule.build(args)
            if res:
                return res[1]


class ItemMixin(SQLAlchemyMixin, BaseView):
    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.object = self.get_object(**kwargs)

    def get_object(self, **kwargs):
        return self.get_query(**kwargs).one_or_none()

    def get_query(self, id, **kwargs):
        return self.db.session.query(self.model).filter_by(id=id)


class NewItemMixin(ConverterMixin, SQLAlchemyMixin, BaseView):
    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.object = None

    def convert(self, data, **kwargs):
        return self.converter.structure(data, self.model)


class ListMixin(SQLAlchemyMixin, BaseView):
    def get_list(self, **kwargs):
        return self.get_query(**kwargs).all()

    def get_query(self, **kwargs):
        return self.db.session.query(self.model)


class IndexView(JinjaMixin, ListMixin):
    def get_context(self):
        ctx = super().get_context()
        ctx["list"] = self.get_list()
        return ctx

    def get(self, **kwargs):
        return self.render_template()


class IndexDataTableView(JinjaMixin, JSONMixin, ListMixin):
    schema: Any

    def get(self, **kwargs):
        if request.is_json:
            return self.dump(self.get_list(**kwargs))
        return self.render_template()


class ShowView(JinjaMixin, ItemMixin, BaseView):
    def get_context(self):
        ctx = super().get_context()
        ctx["object"] = self.object
        return ctx

    def get(self, **kwargs):
        if self.object is None:
            return abort(404)
        return self.render_template()


class CreateView(RedirectMixin, JinjaMixin, FormMixin, NewItemMixin, BaseView):
    def get_context(self):
        ctx = super().get_context()
        ctx["object"] = self.object
        ctx["form"] = self.form
        return ctx

    def get(self, **kwargs):
        return self.render_template()

    def post(self, **kwargs):
        if self.validate(self.form, **kwargs):
            data = self.get_data(self.form, **kwargs)
            self.object = self.convert(data, **kwargs)
            self.db.session.add(self.object)
            self.db.session.commit()
            return self.redirect(**kwargs)
        return self.render_template()


class EditView(RedirectMixin, JinjaMixin, FormMixin, ItemMixin, BaseView):
    def get_context(self):
        ctx = super().get_context()
        ctx["object"] = self.object
        ctx["form"] = self.form
        return ctx

    def get(self, **kwargs):
        if self.object is None:
            return abort(404)
        return self.render_template()

    def post(self, **kwargs):
        if self.object is None:
            return abort(404)
        if self.validate(self.form, **kwargs):
            self.form.populate_obj(self.object)
            self.db.session.add(self.object)
            self.db.session.commit()
            return self.redirect(**kwargs)
        return self.render_template()


class DeleteView(RedirectMixin, ItemMixin, BaseView):
    def delete(self, **kwargs):
        if self.object is None:
            return abort(404)
        self.db.session.delete(self.object)
        self.db.session.commit()
        return self.redirect(**kwargs)


class HTMXDeleteMixin:
    def redirect(self, **kwargs):
        res = super().redirect(**kwargs)
        res.headers["HX-Redirect"] = res.headers.pop("Location")
        return res
