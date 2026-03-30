// Author: Ghada Trabelsi
// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'node:console';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config =({
  testDir: './tests',
  timeout : 40000,
  expect :{
    timeout: 40000,
  },
  reporter : 'html',
  retries :1,
  use: {
    browserName : 'chromium',
    headless : false,
    screenshot: 'on',
    trace: 'retain-on-failure', // Capture trace when retrying the failed test.
  },

 
});
module.exports = config;
