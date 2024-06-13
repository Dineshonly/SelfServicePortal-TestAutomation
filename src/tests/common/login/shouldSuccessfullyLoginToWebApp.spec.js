// @ts-check
import { test, expect } from '@playwright/test';
import {performLoginCiroClinicianDefaultUser} from '../../../../testBase';

// Define the test case
test('Login To Web App', async ({ page }) => {

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Wait for the 'Welcome' heading to appear on the page.
    // This would typically indicate a successful login.
    await page.waitForFunction(() => {
        const headingElement = document.querySelector('h1');
        return headingElement && headingElement.textContent.includes('Welcome');
    });

    // Once the heading is detected, retrieve it for validation.
    const headingElement = await page.$('h1');

    // Extract the text content of the heading element.
    const headingText = await headingElement.textContent();

    // Verify that the heading text includes 'Welcome', confirming a successful login.
    expect(headingText).toContain('Welcome');
});
