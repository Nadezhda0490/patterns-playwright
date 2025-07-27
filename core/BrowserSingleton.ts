import { Browser, chromium } from "@playwright/test";

export class BrowserSingleton {
  private static browserInstance: Browser | null = null;

  static async getInstance(): Promise<Browser> {
    if (!this.browserInstance) {
      this.browserInstance = await chromium.launch({ headless: true });
    }
    return this.browserInstance;
  }

  static async close(): Promise<void> {
    if (this.browserInstance) {
      await this.browserInstance.close();
      this.browserInstance = null;
    }
  }
}
