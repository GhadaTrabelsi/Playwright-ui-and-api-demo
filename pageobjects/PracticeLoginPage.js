// Author: Ghada Trabelsi
class PracticeLoginPage {
  constructor(page) {
    this.page = page;
    this.userName = page.locator("#username, #userEmail");
    this.password = page.locator("#password, #userPassword");
    this.rememberCheckbox = page.locator("#terms, input[type='checkbox']");
    this.signInButton = page.locator("#signInBtn, [value='Sign In'], button:has-text('Sign In'), button:has-text('Sign in')");
  }

  async goTo() {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
  }

  async login(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
  }

  async checkRemember() {
    // Toggle the checkbox if not already checked
    try {
      const checked = await this.rememberCheckbox.isChecked();
      if (!checked) await this.rememberCheckbox.check();
    } catch (e) {
      // fallback: click if isChecked not supported for this locator
      await this.rememberCheckbox.click().catch(() => {});
    }
  }

  async clickSignIn() {
    // click the sign in button; do not block on navigation here
    await this.signInButton.first().click().catch(() => {});
  }
}

module.exports = { PracticeLoginPage };
