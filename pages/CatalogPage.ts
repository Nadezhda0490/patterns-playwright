import { Page, Locator } from "@playwright/test";

export class CatalogPage {
  public readonly page: Page;
  public readonly categoryLink: Locator;
  public readonly categorySectionsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryLink = page.locator(".catalog-navigation-classifier__item");
    this.categorySectionsLink = page.locator(
      ".catalog-navigation-list__aside-title"
    );
  }

  async navigate() {
    await this.page.goto("https://catalog.onliner.by/");
  }

  async selectCategory(name: string) {
    await this.categoryLink.filter({ hasText: name }).first().click();
  }

  async selectCategorySection(name: string) {
    await this.categorySectionsLink.filter({ hasText: name }).first().click();
  }

  getCategoryHeader() {
    return this.page.locator("div.catalog-navigation-list__aside-title");
  }

  getCategorySectionHeader() {
    return this.page.locator("h1.catalog-form__title");
  }
}
