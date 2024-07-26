from fastapi import APIRouter, Request
from fastapi.openapi.docs import get_swagger_ui_html
from fastapi.staticfiles import StaticFiles

router = APIRouter()


files = StaticFiles(directory="node_modules/swagger-ui-dist")


@router.get("/swagger-ui/{path:path}", include_in_schema=False)
async def custom_swagger_ui_files(path: str, request: Request):
    return await files.get_response(path, request.scope)


@router.get("/docs", include_in_schema=False)
async def custom_swagger_ui_html(request: Request):
    return get_swagger_ui_html(
        openapi_url=request.app.openapi_url,
        title=request.app.title + " - Swagger UI",
        oauth2_redirect_url=request.app.swagger_ui_oauth2_redirect_url,
        swagger_js_url="/swagger-ui/swagger-ui-bundle.js",
        swagger_css_url="/swagger-ui/swagger-ui.css",
    )
