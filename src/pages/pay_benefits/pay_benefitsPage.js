import {expect} from "@playwright/test";

class Pay_BenefitsPage {

    constructor(page) {
        this.page = page;
        this.payBenefitsExpand = page.getByText('Pay & Benefits');
        this.payBenefitsLink = page.getByRole('link',{name:'Pay & Benefits'});
        this.payBenefitsLinkHeader = page.getByRole('heading', { name: 'Pay & Benefits' });
        this.helpfulFaqsLink = page.getByRole('link',{name:'helpful FAQs'});
        this.interactiveWalkthroughLink = page.getByRole('link',{name:'view an interactive walkthrough'});
        this.breadcrumbPayBenefits = page.locator('span').filter({ hasText: 'Pay & Benefits' }).nth(1);
        this.benefitsViewLink = page.locator('xpath=//span[text()=\'Elect or View\']');
        this.goToUKGButton = page.getByRole('button', { name: 'Go to UKG' });
       
        // Pay&Benefits Document Elements
        this.legalNoticesDocumentdownload = page.getByRole('link', { name: 'Legal-Notices.Pdf' });
        this.benefitComplianceNoticesDocumentdownload = page.getByRole('link', { name: '2024 Benefit Compliance Notices.pdf' });
        this.clinicianBenefitsGuideDocumentdownload = page.getByRole('link', { name: 'Clinician-Benefits-Guide-2024.pdf' });
        this.dependentVerificationFAQDocumentdownload = page.getByRole('link', { name: '2024 Dependent Verification FAQ.pdf' });
        this.healthComplianceNoticesDocumentdownload = page.getByRole('link', { name: 'Health-Compliance-Notices-2024.pdf' });
        this.iDCardTemplateDocumentdownload = page.getByRole('link', { name: 'ID-Card-Template-2024.pdf' });
        this.oEDependentVerificationFAQDocumentdownload = page.getByRole('link', { name: 'OE-Dependent-Verification-FAQ-2024.pdf' });
    }
    
    async interactiveWalkthrough() {
        const page1Promise = this.page.waitForEvent('popup');
        await this.interactiveWalkthroughLink.click();
        const page1 = await page1Promise;
        await this.page.waitForTimeout(1000);
        await expect(page1.getByText('Traveler\'s Guide to UKG')).toBeVisible();
        await this.page.waitForTimeout(1000);
        const newPopup = await page1Promise;

        // Close the popup
        await newPopup.close();
    }
    async waitForBreadcrumbPayBenefits(){
        const breadcrumbPayBenefits = this.breadcrumbPayBenefits;
        await breadcrumbPayBenefits.waitFor();
    }
    /**
     * Method to open the Traveler Benefits popup and validate its visibility.
     */
    async openTravelerBenefits() {

        // Validate heading text
        await expect(this.page.getByRole('heading')).toContainText('Leaving ciro clinician');

        // Validate heading text
        await expect(this.page.getByRole('main')).toContainText('Go to UKG');

        // Wait for a new popup to open when clicking the benefitsViewLink
        const popupPromise = this.page.waitForEvent('popup');

        // Click the link that will open the popup
        await this.clickElement(this.goToUKGButton);

        // Wait for the popup to open and store it in a variable
        const popupPage = await popupPromise;

        // Wait for the new tab to finish loading
        await this.waitForPageToLoad(popupPage);

        // Expected URL (change this to the URL you're expecting)
        const expectedURL = 'https://medsolutions.ultipro.com/default.aspx';

        await this.waitForExpectedURL(popupPage, expectedURL);
    }
    async clickElement(element) {
        await element.click();
    }
    async waitForExpectedURL(page, expectedURL, timeout = 30000) {
        const startTime = Date.now();
        let currentURL = '';

        // Keep checking the URL until it matches the expected URL or the timeout is reached
        do {
            currentURL = page.url();
            if (currentURL === expectedURL) {
                return;
            }
            await page.waitForTimeout(500);  // Wait for 500ms before checking again
        } while (Date.now() - startTime < timeout);

        throw new Error(`Timed out waiting for URL to be '${expectedURL}'. Last known URL was '${currentURL}'.`);
    }
    async waitForPageToLoad(page) {
        await page.waitForLoadState('load');
    }

    /**
      * Asynchronous function to validate pay benefits documents.
      * 
      * @param {Object} payBenefitsDocumentElement  - Document element as a parameter in the method.
      * @param {string} expectedURL - The expected URL string that the popup should redirect to.
      * @param {string} hrefURL - Attribute Element Locator
      * @returns {Promise<void>}
    */
    async validatePayBenefitsDocuments(payBenefitsDocumentElement, expectedEndOfURL, hrefURL) {
        try {
            // Ensure the payBenefitsDocumentElement is visible
            await expect(payBenefitsDocumentElement).toBeVisible();
    
            // Get the current URL
            const currentURL = await this.page.getAttribute(hrefURL, 'href');
            console.log('Current Page URL:', currentURL);
    
            // Click on the payBenefitsDocumentElement
            await payBenefitsDocumentElement.click();
    
            // Validate the URL
            if (currentURL) {
                if (currentURL.endsWith(expectedEndOfURL)) {
                    // Log validation passing if URL matches the expectation
                    console.log(`Validation Passed: Expected End Of URL "${expectedEndOfURL}" - Actual URL "${currentURL}"`);
                } else {
                    // If URL doesn't match the expected one, throw an error
                    throw new Error(`Validation Failed: Expected End of URL to be "${expectedEndOfURL}" but received Actual URL "${currentURL}"`);
                }
            } else {
                //Could not find the PDF URL, throw an error 
                throw new Error('Could not find the PDF URL. It might be null or the element does not exist.');
            }
        } catch (error) {
            // Log any errors and re-throw
            console.error('Error during validation:', error);
            throw error;
        }
    }

}
export {Pay_BenefitsPage};