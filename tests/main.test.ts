import { test, expect, Browser } from "@playwright/test";
import { BrowserSingleton } from "../core/BrowserSingleton";
import { PageFactory } from "../factories/PageFactory";

test.describe("Tests for Main page", () => {
  let browser: Browser;

  test.beforeAll(async () => {
    browser = await BrowserSingleton.getInstance();
  });

  test.afterAll(async () => {
    await BrowserSingleton.close();
  });

  test("should search by name", async () => {
    const mainPage = await PageFactory.getMainPage(browser);
    await mainPage.navigate();
    await mainPage.search("Холодильники");

    const fridgeCategory = mainPage
      .getCategoryTitleByName("Холодильники")
      .first();

    await expect(fridgeCategory).toBeVisible();
    await expect(fridgeCategory).toContainText("Холодильники");
  });

  test("should open catalog", async () => {
    const mainPage = await PageFactory.getMainPage(browser);
    await mainPage.navigate();
    await mainPage.clickCatalog();

    await expect(mainPage.page).toHaveURL(/\/catalog\.onliner\.by\//);
    await expect(mainPage.page).toHaveTitle("Каталог Onlíner");
  });
});
