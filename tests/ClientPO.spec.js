// Author: Ghada Trabelsi
const { test,expect } = require('@playwright/test');
const { networkInterfaces } = require('node:os');

const {POManager } = require('../pageobjects/POManager');
//json->string->js object
const data = JSON.parse(JSON.stringify(require('../utils/placeorderTestData.json'))); //Convertir le fichier JSON en objet JavaScript 


test('Browser Context  Playwright test',async({page})=>
    {   
        const pomManager = new POManager(page);
        const email = data.email;
        const passvalue = data.passvalue;
        const productName = data.productName;
         const loginPage = await pomManager.getLoginPage();
       await loginPage.goTo();
        await loginPage.validLogin(email, passvalue);
       
        const dashboardPage = await pomManager.getDashboardPage();
        await dashboardPage.searchProductAddToCart(productName);
        await dashboardPage.navigateToCart();

        

await page.locator("h3:has-text('ZARA COAT 3')").waitFor();
await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
expect(page.locator("h3:has-text('ZARA COAT 3')")).toBeVisible();

await page.locator("button:has-text('Checkout')").click();

await page.locator("input[placeholder='Select Country']").pressSequentially("ind",{delay:150});
await page.locator(".ta-results").waitFor();
await page.locator(".ta-results").locator("button").nth(1).click();

await expect(page.locator("label[type='text']")).toHaveText(email);
await page.locator(".btnn.action__submit.ng-star-inserted").click();

await page.locator(".hero-primary").waitFor();
await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderid = await page.locator("label.ng-star-inserted").textContent();
const orderIdTrimmed = orderid.split("|")[1].trim();
console.log(orderIdTrimmed);

await page.locator("button:has-text('ORDERS')").click();
   await page.locator("tbody").waitFor();

 await page.locator("tbody").waitFor();
   const rows = await page.locator("tbody tr");
 
 
   for (let i = 0; i < await rows.count(); ++i) {
      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderIdTrimmed === rowOrderId) {
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }
   const orderIdDetails = await page.locator(".col-text").textContent();
  expect(orderIdDetails).toContain(orderIdTrimmed);

await page.pause();

    })
