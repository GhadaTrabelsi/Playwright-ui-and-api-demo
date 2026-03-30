// Author: Ghada Trabelsi

const assert = require('assert')
const { Given, When, Then } = require('@cucumber/cucumber')
const { POManager } = require('../../pageobjects/POManager');
const { expect } = require('@playwright/test');
const playwright = require('@playwright/test');

Given('a login to the ecommerce website with valid credentials {string} and {string}', { timeout: 100 * 1000 }, async function (username, password) {

    this.loginPage = this.poManager.getLoginPage();
    await this.loginPage.goTo();
    await this.loginPage.validLogin(username, password);
});


When('add {string} to the shopping cart', async function (productName) {
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(productName);
    await this.dashboardPage.navigateToCart();
});



Then('verify that {string} is added to the shopping cart', async function (productName) {
    this.cartPage = this.poManager.getCartPage();
    await this.cartPage.VerifyProductIsDisplayed(productName);
    await this.cartPage.Checkout();
});


When('proceed to checkout and place the order with {string} as the country', async function (string) {
    this.ordersReviewPage = this.poManager.getOrdersReviewPage();
    await this.ordersReviewPage.searchCountryAndSelect("ind", "India");
    this.orderId = await this.ordersReviewPage.SubmitAndGetOrderId();
    console.log(this.orderId);
});



Then('verify that the order is placed successfully in the order history', async function () {
    await this.dashboardPage.navigateToOrders();
    this.ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await this.ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await this.ordersHistoryPage.getOrderId())).toBeTruthy();
});

  Then('verify Error message is displayed', async function () {
    const message = await this.loginPage.getErrorMessage();
        expect(message.trim()).toBe("Incorrect email or password.");
         });

