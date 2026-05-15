require('dotenv').config();

// Алиасы для Test IT
if (process.env.URL && !process.env.TMS_URL) process.env.TMS_URL = process.env.URL.trim();
if (process.env.USER_PRIVATE_TOKEN && !process.env.TMS_PRIVATE_TOKEN) {
  process.env.TMS_PRIVATE_TOKEN = process.env.USER_PRIVATE_TOKEN.trim();
}
if (process.env.PROJECT_ID && !process.env.TMS_PROJECT_ID) {
  process.env.TMS_PROJECT_ID = process.env.PROJECT_ID.trim();
}
if (process.env.CONFIGURATION_ID && !process.env.TMS_CONFIGURATION_ID) {
  process.env.TMS_CONFIGURATION_ID = process.env.CONFIGURATION_ID.trim();
}
if (process.env.TEST_RUN_ID && !process.env.TMS_TEST_RUN_ID) {
  process.env.TMS_TEST_RUN_ID = process.env.TEST_RUN_ID.trim();
}
if (process.env.TEST_RUN_NAME && !process.env.TMS_TEST_RUN_NAME) {
  process.env.TMS_TEST_RUN_NAME = process.env.TEST_RUN_NAME.trim();
}
if (process.env.ADAPTER_MODE && !process.env.TMS_ADAPTER_MODE) {
  process.env.TMS_ADAPTER_MODE = process.env.ADAPTER_MODE.trim();
}

/**
 * Репортёр Test IT 
 * @type {import('@playwright/test').ReporterDescription}
 */
const testItPlaywrightReporter = [
  'testit-adapter-playwright',
  {
    url: (process.env.TMS_URL || process.env.URL)?.trim(),
    privateToken: (process.env.TMS_PRIVATE_TOKEN || process.env.USER_PRIVATE_TOKEN)?.trim(),
    projectId: (process.env.TMS_PROJECT_ID || process.env.PROJECT_ID)?.trim(),
    configurationId: (process.env.TMS_CONFIGURATION_ID || process.env.CONFIGURATION_ID)?.trim(),
    testRunId: (process.env.TMS_TEST_RUN_ID || process.env.TEST_RUN_ID)?.trim(),
    testRunName: (process.env.TMS_TEST_RUN_NAME || process.env.TEST_RUN_NAME)?.trim(),
    adapterMode:
      process.env.TMS_ADAPTER_MODE != null && String(process.env.TMS_ADAPTER_MODE).length > 0
        ? parseInt(String(process.env.TMS_ADAPTER_MODE), 10)
        : process.env.ADAPTER_MODE
          ? parseInt(String(process.env.ADAPTER_MODE), 10)
          : undefined,
  },
];

function isTestItAdapterInstalled() {
  try {
    require.resolve('testit-adapter-playwright');
    return true;
  } catch {
    return false;
  }
}

function shouldUseTestItReporter() {
  if (!isTestItAdapterInstalled()) return false;
  const url = (process.env.TMS_URL || process.env.URL)?.trim();
  const token = (process.env.TMS_PRIVATE_TOKEN || process.env.USER_PRIVATE_TOKEN)?.trim();
  return Boolean(url && token);
}

module.exports = { testItPlaywrightReporter, shouldUseTestItReporter };
