// Import required modules
import {defineConfig} from '@playwright/test';
import {getConfig} from './config';
import {devices} from "playwright";
import dotenv from 'dotenv';

dotenv.config();

module.exports = defineConfig({
    testDir: './src/tests', // Set the correct path to your test directory
    outputDir: 'artifacts', // Folder for test artifacts such as screenshots, videos, traces, etc.
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 0 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    timeout: 100000, // Timeout is shared between all tests.
    reporter: [
        ['line'],
        ['json', { outputFile: 'test-results/json/test-results.json' }],
        ['junit', { outputFile: 'test-results/xml/test-results.xml' }],
        ['html', { outputFolder: 'test-results/html/', outputFile: 'index.html', open: 'never' }],
        [
            '@alex_neo/playwright-azure-reporter',
            {
                orgUrl: 'https://dev.azure.com/medicalsolutions',
                token: process.env.AZURE_TOKEN,
                planId: 51973,
                projectName: 'Med Sol Tech',
                environment: process.env.NODE_ENV,
                logging: true,
                testRunTitle: 'Ciro Web App Test Run',
                publishTestResultsMode: 'testRun',
                uploadAttachments: true,
                attachmentsType: ['screenshot', 'trace', /test.*/],
                testRunConfig: {
                    configurationIds: [42],
                },
            }
        ],
     ],
    use: {
        /* Base URL to use in actions like `await page.goto('/')`. */
        // baseURL: 'http://127.0.0.1:3000',

        /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
        trace: 'off', //on-first-retry'
        launchOptions: {
            slowMo: 100,
        },
        actionTimeout: 30000,
        //headless: false,
        acceptDownloads: true,
        ignoreHTTPSErrors: false,
        //storageState: './tests/common/storage_state.json',
        viewport: { width: 1920, height: 1080 }, // Set the desired viewport size
        screenshot: 'only-on-failure',
        //video: 'on',
        testIdAttribute:'data-qa-id',
    },
    projects: [
        {
            name: process.env.NODE_ENV,
            use: {
                baseURL: getConfig().baseUrl,
                browserName: 'chromium', // Use Chrome browser
                ...devices['Desktop Chrome'], channel:'chrome',
                viewport: { width: 1600, height: 800 },
            },
            retries: 0,

        },
    ],
});