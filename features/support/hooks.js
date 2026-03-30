// Author: Ghada Trabelsi
// hook: This function will run before each scenario, allowing us to set up any necessary preconditions or initialize objects that will be used in the tests.
const { Before, After, AfterStep, status} = require('@cucumber/cucumber');// We are importing the Before and After functions from the @cucumber/cucumber library, which will allow us to define hooks that run before and after each scenario. We also import the POManager class from our pageobjects directory, which will help us manage our page objects in the tests. Additionally, we import the playwright library to interact with the browser during our tests.
const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
Before(async function () {
    const browser = await playwright.chromium.launch({ headless: false });
    const context = await browser.newContext();
     this.page = await context.newPage();
    this.poManager = new POManager(this.page);
});
AfterStep(async function ({result}) {
    if (result.status === "FAILED") {
        console.log("Step failed, taking screenshot...");
    
    // take screenshot after each step
    const screenshot = await this.page.screenshot();
await this.page.screenshot({ path: `screenshot-${Date.now()}.png`});
    }
 });


After(async function () {
    console.log("Closing the browser after the scenario");
    if (this.poManager && this.poManager.page) {
        await this.poManager.page.close();
    }
    if (this.apiContext) {
        await this.apiContext.dispose();
    }
});
