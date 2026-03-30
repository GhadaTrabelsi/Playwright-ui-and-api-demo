// Author: Ghada Trabelsi
const { test,expect } = require('@playwright/test');
test('Browser Context  Playwright test',async({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');

await page.goto('https://rahulshettyacademy.com/loginpagePractise');

await username.fill('rahulshettyacademy');
await password.fill('learning');
await signInBtn.click();

//await expect(page.locator('.alert-danger')).toHaveText('Incorrect username/password.');
//console.log(await page.locator(".alert-danger").textContent());

console.log(await cardTitles.nth(0).textContent());
const allTitles = await cardTitles.allTextContents();
console.log(allTitles);

});

test('Page Playwright test',async({page})=>
{
await page.goto('https://www.google.com');
await expect(page).toHaveTitle('Google');
});

test('UI Playwright test',async({browser})=>
{   
    const context = await browser.newContext();
    const page = await context.newPage();

    const username = page.locator('#username');
    const password = page.locator('#password');
    const signInBtn = page.locator('#signInBtn');
    const cardTitles = page.locator('.card-body a');
    const dropdown = page.locator("select.form-control");
    const checkbox = page.locator("input[value='user']");
     const terms = page.locator("#terms");
     const documentsLink = page.locator("a.blinkingText");
     
await page.goto('https://rahulshettyacademy.com/loginpagePractise');

await username.fill('rahulshettyacademy');
await password.fill('learning');
await dropdown.selectOption('consult');
await checkbox.click();
expect(checkbox).toBeChecked();
console.log(await checkbox.isChecked());
await page.locator("#okayBtn").click();
await terms.click();
const[newPage] = await Promise.all([ //await for the new tab
 context.waitForEvent('page'),
 documentsLink.click()
])
const text = newPage.locator("p.im-para.red");
await expect(text).toContainText("Please email us at");
const content = await text.textContent();
console.log(content);
const arrayText = content.split("@");
console.log(arrayText[1]);
const domain = arrayText[1].split(" ")[0];
console.log(domain);
await page.bringToFront(); // switch back to original page

await page.locator('#username').fill(domain);
console.log( await page.locator('#username').inputValue());//get the value filled in the input field because textContent() doesn't work on input fields

//await signInBtn.click();

//console.log(await cardTitles.nth(0).textContent());
//const allTitles = await cardTitles.allTextContents();
//console.log(allTitles);

});
