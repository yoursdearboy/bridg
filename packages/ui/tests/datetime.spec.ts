import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("/spaces/ce946229-9746-46cd-8dd3-b27a2fbfd48a/subjects");
  await page.getByRole("button", { name: "New patient" }).click();
  await page.getByRole("textbox", { name: "Family name" }).click();
  await page.getByRole("textbox", { name: "Family name" }).fill("Test");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByText("Study sites").click();
  await page.getByText("DGOI").click();
  await page.getByText("StatusStatus dateStudy").click();
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Add" }).click();
  await page.getByRole("menuitem", { name: "Laboratory" }).click();
  await page.getByRole("menuitem", { name: "Immunophenotyping" }).click();
  await page.getByRole("textbox", { name: "Status", exact: true }).click();
  await page.getByRole("option", { name: "Complete", exact: true }).click();
  await page.getByRole("textbox", { name: "Status date" }).click();
  await page
    .getByRole("button", { name: "1 December 2025", exact: true })
    .click();
  await page.locator("form").getByRole("button", { name: "Submit" }).click();
  await page.getByRole("cell").nth(6).hover();
  await page.getByRole("cell").nth(6).getByRole("link").click();
  await expect(page.getByRole("textbox", { name: "Status date" })).toHaveValue(
    "12/01/2025"
  );
  await page.getByRole("textbox", { name: "Status date" }).click();
  await page.locator("form").getByRole("button", { name: "Submit" }).click();
  await page.getByRole("cell").nth(6).hover();
  await page.getByRole("cell").nth(6).getByRole("link").click();
  await expect(page.getByRole("textbox", { name: "Status date" })).toHaveValue(
    "12/01/2025"
  );
});
