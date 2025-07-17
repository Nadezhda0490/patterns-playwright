import { test, expect, Browser } from "@playwright/test";
import { BrowserSingleton } from "../../core/BrowserSingleton";

let browser: Browser;

test("Check that used the same driver", async () => {
  const instance1 = await BrowserSingleton.getInstance();
  const instance2 = await BrowserSingleton.getInstance();
  expect(instance1).toBe(instance2);
});
