import { Browser } from "@playwright/test";
import { MainPage } from "../pages/MainPage";
import { CatalogPage } from "../pages/CatalogPage";

export class PageFactory {
  static async getMainPage(browser: Browser): Promise<MainPage> {
    const context = await browser.newContext();
    const page = await context.newPage();
    return new MainPage(page);
  }

  static async getCatalogPage(browser: Browser): Promise<CatalogPage> {
    const context = await browser.newContext();
    const page = await context.newPage();
    return new CatalogPage(page);
  }
}
