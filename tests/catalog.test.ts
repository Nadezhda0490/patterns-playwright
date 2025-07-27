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

  test("should open product detail page when clicking on item name", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Детям и мамам");
    await catalogPage.selectPopularSection("Бассейны");
    await catalogPage.acceptCookies();
    await catalogPage.openSelectedItem(
      "Каркасный бассейн Intex Prism Frame 26718 (366x122)"
    );

    const productTitle = catalogPage.getProductTitle();

    await expect(productTitle).toBeVisible();
    await expect(productTitle).toHaveText(
      "Каркасный бассейн Intex Prism Frame 26718 (366x122)"
    );
    await expect(catalogPage.page).toHaveURL(/\/pool\/intex\/intex26718/);
  });

  test("should display product image when clicking on item name", async () => {
    const catalogPage = await PageFactory.getCatalogPage(browser);
    await catalogPage.navigate();
    await catalogPage.selectCategory("Детям и мамам");
    await catalogPage.selectPopularSection("Бассейны");
    await catalogPage.acceptCookies();
    await catalogPage.openSelectedItem(
      "Каркасный бассейн Intex Prism Frame 26718 (366x122)"
    );

    const productImage = catalogPage.getProductImage();
    await expect(productImage).toBeVisible();
  });
});
