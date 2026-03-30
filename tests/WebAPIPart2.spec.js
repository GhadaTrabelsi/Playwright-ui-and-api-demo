// Author: Ghada Trabelsi
const { test,expect } = require('@playwright/test');
const { networkInterfaces } = require('node:os');

test.beforeEach(async ({ page }) => {
    {   

      
        const username = page.locator("#userEmail");
        const password = page.locator("#userPassword");
        const loginBtn = page.locator("#login");
        const email = 'tghada0211@gmail.com';

await page.goto('https://rahulshettyacademy.com/client/#/auth/login');
        await username.fill(email);
        await password.fill('password');
        await loginBtn.click();
        //await page.waitForLoadState('networkidle');

        await page.context().storageState({path:'state.json'});


    }});

test('Browser Context  Playwright test',async({page})=>
    {   
        
        const titles =  page.locator('.card-body b');
        const products =  page.locator('.card-body');
        
        const cart = page.locator("button:has-text('Cart 1')");

       
        await titles.nth(0).waitFor();
        console.log( await titles.nth(0).textContent());
        console.log(await titles.allTextContents());
              
        //Zara coat 3

        const count = await  products.count();
        for(let i=0;i<count;i++)
        {
            if(await titles.nth(i).textContent() === "ZARA COAT 3")
            {
                await page.locator("button:has-text('Add To Cart')").nth(i).click();
                console.log("Product found");
                break;
                
            }
        }

await cart.click();
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
