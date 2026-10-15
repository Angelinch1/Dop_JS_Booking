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

/** @type {import('@playwright/test').ReporterDescription[]} */
const reporters = [
  ['dot'],
  ['html', { open: 'never' }],
];

if (String(process.env.ALLURE_REPORT || '').toLowerCase() === '1' || process.env.CI) {
  reporters.push([
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
  ]);
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './test',
  timeout: process.env.TEST_TIMEOUT ? Number(process.env.TEST_TIMEOUT) : undefined,
  /** По одному тесту за раз (без нескольких вкладок). Параллель: PLAYWRIGHT_WORKERS=4 npx playwright test */
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.PLAYWRIGHT_WORKERS
    ? Number(process.env.PLAYWRIGHT_WORKERS)
    : 1,
  reporter: reporters,
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
