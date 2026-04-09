// @ts-check
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: process.env.TEST_TIMEOUT ? Number(process.env.TEST_TIMEOUT) : undefined,
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.BASE_URL || 'https://fstravel.com',
    actionTimeout: process.env.ACTION_TIMEOUT ? Number(process.env.ACTION_TIMEOUT) : undefined,
    navigationTimeout: process.env.NAVIGATION_TIMEOUT
      ? Number(process.env.NAVIGATION_TIMEOUT)
      : undefined,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
