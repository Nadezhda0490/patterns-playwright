import { Page, Locator } from "@playwright/test";
import dotenv from "dotenv";
dotenv.config();

export class CatalogPage {
  public readonly page: Page;
  public readonly categoryLink: Locator;
  public readonly categorySectionsLink: Locator;
  public readonly popularSectionsLink: Locator;
  public readonly selectedItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryLink = page.locator(".catalog-navigation-classifier__item");
    this.categorySectionsLink = page.locator(
      ".catalog-navigation-list__aside-title"
    );
    this.popularSectionsLink = page.locator(
      ".catalog-navigation-list__popular-title"
    );
    this.selectedItem = page.locator(".catalog-form__link_primary-additional");
  }

  async navigate() {
    await this.page.goto(process.env.CATALOG_URL || "");
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

  async selectPopularSection(name: string) {
    await this.popularSectionsLink.filter({ hasText: name }).first().click();
  }

  async openSelectedItem(name: string) {
    await this.selectedItem.filter({ hasText: name }).first().click();
  }

  getProductTitle() {
    return this.page.locator("h1.catalog-masthead__title");
  }

  getProductImage() {
    return this.page.locator(".offers-description__image");
  }

  async acceptCookies() {
    const cookieBanner = this.page.locator("#submit-button");
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click();
    }
  }
}
