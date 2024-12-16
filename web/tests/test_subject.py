from playwright.sync_api import Page, expect


def test_subject_index(app, server, page: Page):
    url = app.url_for("subject.index", space_id=1)
    request = page.request.get(url)
    expect(request).to_be_ok()
