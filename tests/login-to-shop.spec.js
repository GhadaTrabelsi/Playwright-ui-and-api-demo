// Author: Ghada Trabelsi
const { test, expect } = require('@playwright/test');
const { PracticeLoginPage } = require('../pageobjects/PracticeLoginPage');
const { PracticeShopPage } = require('../pageobjects/PracticeShopPage');

test('Login to shop and verify iPhone X', async ({ page }) => {
  const loginPage = new PracticeLoginPage(page);
  const shopPage = new PracticeShopPage(page);

  await loginPage.goTo();
  await loginPage.login('rahulshettyacademy', 'Learning@830$3mK2');
  // select User role explicitly (label click toggles the radio)
  await page.locator("label:has-text('User')").first().click().catch(() => {});
  await loginPage.checkRemember();
  await loginPage.clickSignIn();

  // Wait for the product to appear on the shop page (longer timeout)
  const visible = await shopPage.isProductVisible('iPhone X');
  expect(visible).toBeTruthy();
});
