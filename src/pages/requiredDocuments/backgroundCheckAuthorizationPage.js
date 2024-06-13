import {expect} from "playwright/test";

class BackgroundCheckAuthorizationPage{
    constructor(page) {
        this.page = page;
        this.backgroundCheckAuthorizationTaskCard = page.locator('xpath=//span[contains(text(),\'Background Check Authorization\')]');
    }
    
    // Function/methods
// Function to validate URL on the new tab
    async validateNewTabPage() {
        // Wait for the popup event before clicking
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.backgroundCheckAuthorizationTaskCard.click(),
        ]);

        // Validate the URL of the new page immediately after it's opened
        let currentURL = await newPage.url();
        console.log("Current URL of new tab immediately:", currentURL);
        expect(currentURL.endsWith('/universal')).toBe(true);

        // Wait for the URL to change to the expected value after redirect
        await newPage.waitForFunction(
            () => window.location.href.includes('universalbackground.com/eForms9/Landing/'),
            { polling: 'raf' }
        );

        // Re-fetch the URL after the redirect
        currentURL = await newPage.url();
        console.log("URL after redirect:", currentURL);

        // Validate that the URL includes the expected substring
        expect(currentURL.includes('universalbackground.com/eForms9/Landing/')).toBe(true);
    }


}
export {BackgroundCheckAuthorizationPage};