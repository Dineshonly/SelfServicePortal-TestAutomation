import {expect} from "playwright/test";

class I9EmploymentEligibilityVerificationPage{
    
    constructor(page) {
        this.page = page;
        this.i9GuardianTaskCard = page.getByTestId('task-card-i-9-employment-eligibility-verification');
    }
    
    // Function/methods

// Function to validate URL on the new page and interact with it
    async validateNewTabPage() {
        // Wait for the popup event before clicking
        const [newPage] = await Promise.all([
            this.page.waitForEvent('popup'),
            this.i9GuardianTaskCard.click(),
        ]);

        // Make sure the newPage is fully loaded
        await newPage.waitForLoadState('load');

        // Validate the URL of the new page
        let currentURL = await newPage.url();
        console.log("Current URL of new tab:", currentURL);
        expect(currentURL.endsWith('/guardian')).toBe(true);

        // Wait for the "Get Started" button to appear on the new page
        await newPage.waitForSelector('button:text("Get Started")');

        // Click the "Get Started" button and wait for navigation to complete
        await Promise.all([
            newPage.waitForNavigation(),  // Wait for navigation
            newPage.click('button:text("Get Started")')  // Click the button
        ]);

        // Validate the URL of the new navigated page
        currentURL = await newPage.url();
        console.log("URL after clicking Get Started:", currentURL);
        expect(currentURL.includes('/guardian/i9')).toBe(true);
    }


}
export {I9EmploymentEligibilityVerificationPage};