# Playwright + Cucumber Demo — UI & API Automation

**Author:** Ghada Trabelsi

## Project overview

This repository is a training/demo project that combines Playwright (UI automation) and Cucumber (BDD) to exercise end-to-end and API test scenarios. It demonstrates a Page Object Model (POM) structure, API utilities, and example tests for the Rahul Shetty Academy practice site.

Tech stack
- Node.js (JavaScript)
- Playwright (UI automation)
- @cucumber/cucumber (BDD)

## Prerequisites
- Node.js 16+ and npm
- Internet access to reach test targets (e.g. rahulshettyacademy.com)

## Security notice

Important: this repository had personal credentials in some source files during development. All known personal passwords have been replaced with the placeholder `password` in source files. Do not add or commit real credentials to the repo. Instead, store secrets in environment variables (for example `TEST_USER` and `TEST_PASSWORD`) or a secret manager and update tests to read `process.env` values before running in CI or public repositories.

## Install

```bash
npm install
```

If you use Playwright browsers for the first time, install browsers:

```bash
npx playwright install --with-deps
```

## Project structure

- `features/` — Cucumber feature files, step definitions, and hooks
- `pageobjects/` — Page Object Model classes
- `tests/` — Playwright test files (Playwright Test runner)
- `utils/` — API helpers and other utilities
- `playwright.config.js` — Playwright configuration
- `cucumber.js` — Cucumber profile configuration

## Running tests

Run the Playwright test suite (headed):

```bash
npx playwright test --headed
```

Run a single Playwright test file:

```bash
npx playwright test tests/login-to-shop.spec.js --headed
```

Run Cucumber features (uses `cucumber.js` profile):

```bash
npx cucumber-js
```

Run a specific feature:

```bash
npx cucumber-js features/API.feature --exit
```

## Reports & debugging

- Playwright generates results and traces in `test-results/`. To view an interactive Playwright report:

```bash
npx playwright show-report
```

- Capture traces on failure to debug interactively:

```bash
npx playwright test --trace on
npx playwright show-trace <trace.zip>
```

## Page Objects and Examples

- `pageobjects/PracticeLoginPage.js` — login page for https://rahulshettyacademy.com/loginpagePractise/
- `pageobjects/PracticeShopPage.js` — shop page helpers
- `tests/login-to-shop.spec.js` — Playwright test that logs in and verifies the product `iPhone X`
- `utils/APIUtils.js` — helper for API calls (login, create order, fetch details)

## Cucumber configuration

`cucumber.js` contains the default profile used by `npx cucumber-js`. It configures required step files, reporter format, parallelism and retry policy.

## Continuous Integration (example)

Below is a simple GitHub Actions snippet you can add under `.github/workflows/ci.yml` to run Playwright tests and save the report:

```yaml
name: CI - Playwright

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 18
      - run: npm ci
      - name: Install Playwright browsers
        run: npx playwright install --with-deps
      - name: Run Playwright tests
        run: npx playwright test --reporter=list
      - name: Upload Playwright report
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: test-results/
```

## Contribution

1. Fork the repository
2. Create a feature branch
3. Add tests / page objects / docs
4. Open a pull request with a clear description and screenshots if relevant

## Troubleshooting

- If locators fail, open the page in a browser and capture stable selectors (prefer `id`, `data-*`, or stable text).  
- Adjust timeouts for slow networks or resources: modify `playwright.config.js` or use explicit `waitForSelector` with a higher timeout.

## License
MIT
