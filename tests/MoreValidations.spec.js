// Author: Ghada Trabelsi
const { test,expect } = require('@playwright/test');
test(' PopUp test',async({page})=>
{
    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
    // await page.goto('https://www.google.com');
    // await page.goBack();
    // await page.goForward();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect (page.locator("#displayed-text")).not.toBeVisible(); //or .toBeHidden()
    await page.on('dialog', dialog =>dialog.accept());
    await page.locator("#confirmbtn").click();
    console.log("Popup handled successfully");
//hover
    await page.locator("#mousehover").hover();
    await page.locator("a[href='#top']").click();
    console.log("Mouse hover successful");
    const frame = page.frameLocator("#courses-iframe");

await frame.getByRole('link', { name: 'NEW All Access plan' }).click();
const text =  await frame.locator("h2:has-text('Join 13,522 Happy Subscibers!')").textContent();
console.log(text.split(' ')[1]);

})

test('screenshot and visual comparision',async({page})=>
{
     await page.goto('https://rahulshettyacademy.com/AutomationPractice/');
 await expect(page.locator("#displayed-text")).toBeVisible();
 await page.locator("#displayed-text").screenshot({path:'textbox.png'});
    await page.locator("#hide-textbox").click();
    await page.screenshot({path:'screenshot.png',fullPage:true});
    await expect (page.locator("#displayed-text")).not.toBeVisible(); //or .toBeHidden()

})

test.only('visual',async ({page})=>
{

    await page.goto('https://www.flightaware.com/');
expect(await page.screenshot()).toMatchSnapshot('landing.png');

})

