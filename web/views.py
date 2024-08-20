from typing import Any, Callable, Type

from flask import abort, redirect, render_template, request
from flask.views import MethodView
from flask_sqlalchemy import SQLAlchemy
from wtforms import Form

from web.breadcrumbs import breadcrumbs


class BaseView(MethodView):
    """
    [On design](https://stackoverflow.com/q/21383063)
    """

    def setup(self, **kwargs):
        self.kwargs = kwargs

    def dispatch_request(self, **kwargs):
        self.setup(**kwargs)
        return super().dispatch_request(**kwargs)


class SQLAlchemyMixin(BaseView):
    db: SQLAlchemy
    model: Any
    get_query: Callable


class JinjaMixin(BaseView):
    template_name: str

    # TODO: add kwargs?
    def get_context(self):
        return self.kwargs

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


class RedirectMixin:
    def url_for_redirect(self, **kwargs):
        raise ValueError("Redirect url not defined")

    def redirect(self, **kwargs):
        return redirect(self.url_for_redirect(**kwargs))


class BreadcrumbsMixin(BaseView):
    breadcrumbs = breadcrumbs

    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.add_breadcrumbs(**kwargs)

    def add_breadcrumbs(self, **kwargs):
        return


class ItemMixin(SQLAlchemyMixin, BaseView):
    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.object = self.get_object(**kwargs)

    def get_object(self, **kwargs):
        return self.get_query(**kwargs).one_or_none()

    def get_query(self, id, **kwargs):
        return self.db.session.query(self.model).filter_by(id=id)


class NewItemMixin(SQLAlchemyMixin, BaseView):
    def setup(self, **kwargs):
        super().setup(**kwargs)
        self.object = self.get_object(**kwargs)

    def get_object(self, **kwargs):
        return self.model()


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
        if self.form.validate():
            self.form.populate_obj(self.object)
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
        if self.form.validate():
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
