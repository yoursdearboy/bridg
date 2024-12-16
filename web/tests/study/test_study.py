from playwright.sync_api import Page, expect


def test_study_index(app, server, page: Page):
    url = app.url_for("study.index")
    request = page.request.get(url)
    expect(request).to_be_ok()
