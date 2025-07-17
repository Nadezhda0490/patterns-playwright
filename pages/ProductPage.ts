import { Page, Locator } from "@playwright/test";

export class ProductPage {
  public readonly page: Page;
  public readonly categoryLink: Locator;
  public readonly popularSectionsLink: Locator;
  public readonly selectedItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryLink = page.locator(".catalog-navigation-classifier__item");
    this.popularSectionsLink = page.locator(
      ".catalog-navigation-list__popular-title"
    );
    this.selectedItem = page.locator(".catalog-form__link_primary-additional");
  }

  async navigate() {
    await this.page.goto("https://catalog.onliner.by/");
  }

  async selectCategory(name: string) {
    await this.categoryLink.filter({ hasText: name }).first().click();
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

  async acceptCookies() {
    const cookieBanner = this.page.locator("#submit-button");
    if (await cookieBanner.isVisible()) {
      await cookieBanner.click();
    }
  }

  getProductImage() {
    return this.page.locator(".offers-description__image");
  }
}
