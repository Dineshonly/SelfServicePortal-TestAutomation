import {expect} from '@playwright/test';
class ESignatureFormPage {
    constructor(page) {
        this.page = page;

        this.confidentialityAgreementTaskCard = page.getByTestId(`task-card-confidentiality-agreement`);
        this.continueButton = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Continue' });
        this.startButton = page.frameLocator('iframe[title="eSignatureForm"]').locator('#navigate-btn');
        this.requiredSignHere = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Required - Sign Here');
        this.finishButton = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Finish');
        this.firstNameConfidentialityAgreement = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Required').nth(1);
    }

    async disclosureAccepted() {
        await this.page.frameLocator('iframe[title="eSignatureForm"]').getByText('I agree to use electronic records and signatures. Required').click();
    }
    async continueForm() {
        await expect(this.page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Continue' })).toBeVisible();
        await this.page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Continue' }).click();
    }

    async navigateForm() {
        await expect(this.page.frameLocator('iframe[title="eSignatureForm"]').locator('#navigate-btn')).toBeVisible();
        const formFrame = this.page.frameLocator('iframe[title="eSignatureForm"]');
        await formFrame.locator('#navigate-btn').click();
        await formFrame.locator('#navigate-btn').click();
    }

    async fillForm(firstName, lastName) {
        const formFrame = this.page.frameLocator('iframe[title="eSignatureForm"]');
        await formFrame.getByLabel('Required').nth(1).click();
        await formFrame.getByLabel('Required').nth(1).fill(firstName);

        await formFrame.getByLabel('Required').nth(2).click();
        await formFrame.getByLabel('Required').nth(2).fill(lastName);
        await formFrame.locator('#navigate-btn').click();
    }

    async signAndFinish() {
        const formFrame = this.page.frameLocator('iframe[title="eSignatureForm"]');
        await formFrame.locator('xpath=//div[text()=\'Sign\']').click();
        try {
            await formFrame.getByRole('button', { name: 'Adopt and Sign' }).click();
        } catch (error) {
            console.log('Signature already added, proceeding to the next step')
        }
        await formFrame.getByLabel('Finish').click();
    }

}
export {ESignatureFormPage};