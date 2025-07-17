import { Page, Locator, FrameLocator } from "@playwright/test";

export class MainPage {
  public readonly page: Page;
  public readonly catalogLink: Locator;
  public readonly searchInput: Locator;
  public readonly searchFrame: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.catalogLink = page.locator(".b-main-navigation__item:first-child");
    this.searchInput = page.locator(".fast-search__input");
    this.searchFrame = page.frameLocator("#fast-search-modal iframe");
  }

  async navigate() {
    await this.page.goto("https://www.onliner.by/");
  }

  async search(text: string) {
    await this.searchInput.fill(text);
    await this.searchInput.press("Enter");
  }

  async clickCatalog() {
    await this.catalogLink.click();
  }

  getCategoryTitleByName(name: string) {
    return this.searchFrame
      .locator(".category__title")
      .filter({ hasText: name });
  }
}
