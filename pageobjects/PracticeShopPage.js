// Author: Ghada Trabelsi
class PracticeShopPage {
  constructor(page) {
    this.page = page;
    // Generic product container locator; search by product name text when needed
    this.productLocator = (name) => page.locator(`.card:has-text("${name}")`);
    this.productNameLocator = (name) => page.locator(`text=${name}`);
  }

  async isProductVisible(name) {
    try {
      // Wait longer as page might take time to load products
      await this.page.waitForSelector(`text=${name}`, { timeout: 20000 });
      return await this.productNameLocator(name).isVisible();
    } catch (e) {
      return false;
    }
  }
}

module.exports = { PracticeShopPage };
