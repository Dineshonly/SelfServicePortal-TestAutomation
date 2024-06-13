import {expect} from "@playwright/test";
import taskNames from '../../../fixtures/hippaanoticedocument/taskcardhippanotice.json';

class HipaaNoticePandadocPage{    
    constructor(page) {
        this.page = page;
        this.hipaaNoticeTaskCard = page.getByTestId(`task-card-hipaa-notice`);
        this.hipaaNoticeHeader = page.getByRole('heading', { name: 'HIPAA Notice'});
        this.readyToFinish = page.frameLocator('iframe[title="eSignatureForm"]').locator('[id="slide-up-bar-finish-button"]');
        this.iframe = page.frameLocator('iframe[title="eSignatureForm"]');
        this.cookies = page.frameLocator('iframe[title="eSignatureForm"]').getByText('I agree to use electronic records and signatures. Required');
        this.continueButton = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Continue' });
        this.startButton = page.frameLocator('iframe[title="eSignatureForm"]').locator('#navigate-btn');
        this.readyToFinishHeading = page.frameLocator('iframe[title="eSignatureForm"]').locator('h3', { hasText: 'Ready to Finish?' });
        this.requiredSignHere = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Required - Sign Here');
        this.requiredSignHereApplied = page.frameLocator('iframe[title="eSignatureForm"]').locator('//div[contains(@class,\'signature-tab-content tab-button-yellow\')]');
        this.adoptAndSign = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Adopt and Sign' });
        this.selectDate = page.frameLocator('iframe[title="eSignatureForm"]').getByText('Select date');
        this.selectTodaysDate = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Today' });
        this.finishFormButton = page.frameLocator('iframe[title="eSignatureForm"]').getByTestId('styledPrimaryAction');
        this.finishButton = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Finish');
        this.downloadButton = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Download' });
        this.whenYouAreFinishedText = page.frameLocator('iframe[title="eSignatureForm"]').getByTestId('styledText');
        this.goBackButton = page.getByRole('button', { name: 'Go Back' });
        this.downloadACopyButton = page.getByRole('button', { name: 'Download a Copy' });
        this.completeNewFormButton = page.getByRole('button', { name: 'Complete New Form' });
    }
    
    // functions/methods
    
    async acceptCookies(){
    const acceptButton = this.cookies;
    await acceptButton.click();
    }
    
    async clickOnStartSigning(){
        // Please review the documents below
        await expect(this.continueButton).toBeVisible;
        await this.continueButton.click();

        // Click on the Start button
        await expect(this.startButton).toBeVisible;
        await this.startButton.click();

        // Click on the Sign button
        await expect(this.startButton).toBeVisible;
        await this.startButton.click();

        // Sign Here
        await this.requiredSignHere.click();

        // Adopt and Sign
        await this.adoptAndSign.click();

        // Finish Button
        await this.readyToFinish.click();
        await this.page.waitForTimeout(5000);
    }

    /**
     * Extracts the date from the status element on the page.
     * @returns {Promise<string|null>} The extracted date or null if not found.
     * @throws {Error} If the status element with the specific pattern is not found.
     */
    async extractStatusDate(testId) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Resetting time part for accurate comparison

        const potentialElements = this.page.getByTestId(testId);
        const elementCount = await potentialElements.count();

        if (elementCount === 0) {
            throw new Error('Status element not found');
        }

        for (let i = 0; i < elementCount; i++) {
            const element = potentialElements.nth(i);
            const text = await element.textContent();
            const dateRegex = /Completed:\s*(\d{2}\/\d{2}\/\d{4})/;
            const dateMatch = text.match(dateRegex);

            if (dateMatch) {
                const extractedDate = new Date(dateMatch[1]);
                extractedDate.setHours(0, 0, 0, 0); // Resetting time part

                if (extractedDate.getTime() === currentDate.getTime()) {
                    return "The extracted date is today.";
                } else if (extractedDate.getTime() < currentDate.getTime()) {
                    return "The extracted date is in the past.";
                } else {
                    return "The extracted date is in the future.";
                }
            }
        }

        throw new Error('Status element with the correct date format not found');
    }

    // HIPAA Notice
    async clickHippaNotice() {
        const environment = process.env.NODE_ENV;
        const taskName = taskNames[environment];

        if (!taskName) {
            throw new Error(`Invalid environment: ${environment}`);
        }
        await this.page.click(`text=${taskName}`);
    }
    
}

export {HipaaNoticePandadocPage}