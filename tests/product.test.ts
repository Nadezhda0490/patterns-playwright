import { test, expect, Browser } from "@playwright/test";
import { BrowserSingleton } from "../core/BrowserSingleton";
import { PageFactory } from "../factories/PageFactory";

test.describe("Tests for Product page", () => {
  let browser: Browser;

  test.beforeAll(async () => {
    browser = await BrowserSingleton.getInstance();
  });

  test.afterAll(async () => {
    await BrowserSingleton.close();
  });

  test("should open product detail page when clicking on item name", async () => {
    const productPage = await PageFactory.getProductPage(browser);
    await productPage.navigate();
    await productPage.selectCategory("Детям и мамам");
    await productPage.selectPopularSection("Бассейны");
    await productPage.acceptCookies();
    await productPage.openSelectedItem(
      "Каркасный бассейн Intex Prism Frame 26718 (366x122)"
    );

    const productTitle = productPage.getProductTitle();

    await expect(productTitle).toBeVisible();
    await expect(productTitle).toHaveText(
      "Каркасный бассейн Intex Prism Frame 26718 (366x122)"
    );
    await expect(productPage.page).toHaveURL(/\/pool\/intex\/intex26718/);
  });

  test("should display product image when clicking on item name", async () => {
    const productPage = await PageFactory.getProductPage(browser);
    await productPage.navigate();
    await productPage.selectCategory("Детям и мамам");
    await productPage.selectPopularSection("Бассейны");
    await productPage.acceptCookies();
    await productPage.openSelectedItem(
      "Каркасный бассейн Intex Prism Frame 26718 (366x122)"
    );

    const productImage = productPage.getProductImage();
    await expect(productImage).toBeVisible();
  });
});
