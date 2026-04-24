// @ts-check
require('dotenv').config();
const { defineConfig, devices } = require('@playwright/test');

/** @param {string | undefined} raw @param {import('@playwright/test').TraceMode} fallback */
function traceModeFromEnv(raw, fallback) {
  if (!raw) return fallback;
  const v = raw.trim().toLowerCase();
  if (v === '1' || v === 'true' || v === 'on') return 'on';
  if (v === 'off') return 'off';
  if (v === 'on-first-retry') return 'on-first-retry';
  if (v === 'retain-on-failure') return 'retain-on-failure';
  return fallback;
}

/** @param {string | undefined} raw @param {import('@playwright/test').VideoMode} fallback */
function videoModeFromEnv(raw, fallback) {
  if (!raw) return fallback;
  const v = raw.trim().toLowerCase();
  if (v === '1' || v === 'true' || v === 'on') return 'on';
  if (v === 'off') return 'off';
  if (v === 'on-first-retry') return 'on-first-retry';
  if (v === 'retain-on-failure') return 'retain-on-failure';
  return fallback;
}

const recordAll =
  String(process.env.PLAYWRIGHT_RECORD_ALL || '').toLowerCase() === '1' ||
  String(process.env.PLAYWRIGHT_RECORD_ALL || '').toLowerCase() === 'true';

const defaultTrace = recordAll ? 'on' : 'on-first-retry';
const defaultVideo = recordAll ? 'on' : 'on-first-retry';

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
  reporter: [
    ['html', { open: 'never' }],
    ['list'],
    [
      'allure-playwright',
      {
        resultsDir: 'allure-results',
        detail: true,
        suiteTitle: true,
        environmentInfo: {
          os_platform: process.platform,
          node_version: process.version,
        },
      },
    ],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://fstravel.com',
    actionTimeout: process.env.ACTION_TIMEOUT ? Number(process.env.ACTION_TIMEOUT) : undefined,
    navigationTimeout: process.env.NAVIGATION_TIMEOUT
      ? Number(process.env.NAVIGATION_TIMEOUT)
      : undefined,
    trace: traceModeFromEnv(process.env.PLAYWRIGHT_TRACE, defaultTrace),
    screenshot: 'only-on-failure',
    video: videoModeFromEnv(process.env.PLAYWRIGHT_VIDEO, defaultVideo),
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
