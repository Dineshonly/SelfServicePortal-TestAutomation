import {expect} from "@playwright/test";
import taskNames from '../../../fixtures/driversLicenseFrontSide/taskNames.json';
import actionsUtils from "../../utils/actionsUtils";

class EmploymentDocumentsPage {

    constructor(page) {
        this.page = page;
        this.employmentDocumentsPageLinkProd = page.getByRole('link',{name:'Documents'});
        this.employmentDocumentsPageLinkUat = page.getByRole('link',{name:'Documents'});
        this.employmentDocumentsPageLinkQa = page.getByRole('link',{name:'Documents'});
        this.employmentDocumentsPageLinkHeader = page.locator('h2',{hasText:'Employment Documents'});
        this.searchBar = page.getByTestId('searchBar');
        this.acknowledgementTaskCard = page.getByTestId('task-card-acknowledgement-of-release-of-information-to-clients');
        this.automationSpecialDocumentTaskCard = page.getByTestId('task-card-automation-special-document');
        this.uploadDocumentLink = page.getByRole('link',{name:'Upload Document'});
        this.uploadDocumentLinkHeader = page.getByRole('heading', { name: 'Employment Documents' });
        this.breadcrumbEmploymentDocument = page.locator('span').filter({ hasText: 'Employment Documents' }).nth(1);
    }
    
    // Functions/Methods 
    async EmploymentDocumentsVerifyUrl() {
        await this.clickEnvironmentDocumentLink();
        await this.page.waitForTimeout(1000); // Add a delay of 1 second (adjust as needed)
        const expectedEndOfURL = '/docs';
        const currentURL = await this.page.url();
        console.log("Current URL:", currentURL);
        await this.page.waitForTimeout(1000);
        expect(currentURL.endsWith(expectedEndOfURL)).toBe(true);
    }

    // Driver's License Front Side
    async clickDriversLicenseFront() {
        const environment = process.env.NODE_ENV;
        const taskName = taskNames[environment];

        if (!taskName) {
            throw new Error(`Invalid environment: ${environment}`);
        }
        await this.page.click(`text=${taskName}`);
    }
    
    async searchForDriverLicenseFrontSideAndClick(){
        await this.searchBar.fill('Driver\'s License Front Side');
        await this.page.click('[data-qa-id="task-card-drivers-license-front-side"]');
    }
    
    async waitForBreadcrumbEmploymentDocuments(){
        const breadcrumbEmploymentDocuments = this.breadcrumbEmploymentDocument;
        await breadcrumbEmploymentDocuments.waitFor();
    }

    async getEnvironmentDocumentLink() {
        const environment = process.env.NODE_ENV;
        switch (environment) {
            case 'prod':
                return this.employmentDocumentsPageLinkProd;
            case 'uat':
                return this.employmentDocumentsPageLinkUat;
            case 'qa':
                return this.employmentDocumentsPageLinkQa;
        }
    }
    async clickEnvironmentDocumentLink() {
        const specificLocator = await this.getEnvironmentDocumentLink();
        await specificLocator.click();
    }

    async getCurrentFormattedDate() {
        const currentDate = new Date();
        return currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    }

    async searchAndVerifyDocument(documentName) {
        const date = await this.getCurrentFormattedDate();
        const expectedText = `Completed: ${date}Confidentiality AgreementView`;

        await this.page.getByPlaceholder('Search Documents').click();
        await this.page.getByPlaceholder('Search Documents').fill(documentName);
        await expect(this.page.getByText(expectedText)).toBeVisible();
        await expect(this.page.locator('#main')).toContainText(`Completed: ${date}`);
    }

    async reloadHomePageMultipleTimes(times) {
        await actionsUtils.reloadPageMultipleTimes(this.page, times);
    }

}
export {EmploymentDocumentsPage};