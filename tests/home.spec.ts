import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle("Unphrased - Daily phrase guessing game");
});

test("tutorial popup screenshot", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");

  await expect(page.getByTestId("popup")).toBeVisible();
  await expect(page).toHaveScreenshot();
});

test("puzzle view screenshot", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000");

  await page
    .getByTestId("popup")
    .getByRole("button", { name: "Close" })
    .click();
  await expect(page.getByTestId("puzzle-view")).toBeVisible();
  await expect(page).toHaveScreenshot();
});
