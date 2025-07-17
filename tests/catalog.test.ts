import { test, expect, Browser } from "@playwright/test";
import { BrowserSingleton } from "../core/BrowserSingleton";
import { PageFactory } from "../factories/PageFactory";

test.describe("Tests for Catalog page", () => {
  let browser: Browser;

  test.beforeAll(async () => {
    browser = await BrowserSingleton.getInstance();
  });

  test.afterAll(async () => {
    await BrowserSingleton.close();
  });

  test("should display the selected category title", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Детям и мамам");

    const selectedCategoryHeader = catalogPage.getCategoryHeader();

    await expect(selectedCategoryHeader).toBeVisible();
    await expect(selectedCategoryHeader).toHaveText("Детям и мамам");
  });

  test("should open the selected category section", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Детям и мамам");
    await catalogPage.selectCategorySection("Детский транспорт");

    const categorySectionHeader = catalogPage.getCategorySectionHeader();

    await expect(categorySectionHeader).toBeVisible();
    await expect(categorySectionHeader).toHaveText("Детский транспорт");
    await expect(catalogPage.page).toHaveURL(/\/detskiy-transport/);
  });
});
