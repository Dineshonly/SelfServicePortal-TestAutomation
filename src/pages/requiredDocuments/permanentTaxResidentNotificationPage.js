class PermanentTaxResidentPage {

    constructor(page) {
        this.page = page;
        this.iAgreeToUseCheckbox = page.frameLocator('iframe[title="eSignatureForm"]').getByText('I agree to use electronic');
        this.continueButtonPermanentTaxButton = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Continue' });
        this.startButtonPermanentTaxButton = page.frameLocator('iframe[title="eSignatureForm"]').locator('#navigate-btn');
        this.fillInButton = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Fill In' });
        this.firstNameTextbox = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Required - First Name');
        this.lastNameTextbox = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Required - Last Name');
        this.applicableBoxB = page.frameLocator('iframe[title="eSignatureForm"]').locator('label').filter({ hasText: 'Required - Radio Group' }).nth(1);
        this.requiredSignHerePermanent = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Required - Sign Here');
        this.adoptAndSignPermanent = page.frameLocator('iframe[title="eSignatureForm"]').getByRole('button', { name: 'Adopt and Sign' });
        this.finishPermanentButton = page.frameLocator('iframe[title="eSignatureForm"]').getByLabel('Finish');
    }
    
    // Functions/methods
    async disclosureAccepted() {
        await this.iAgreeToUseCheckbox.click();
    }
    async clickOnContinueButton(){
        await this.continueButtonPermanentTaxButton.click();
    }
    async clickOnStartButtonFillIn() {
        // Click the start button to initiate the process
        await this.startButtonPermanentTaxButton.click();

        // Fill in the first name
        const firstNameFrame = this.page.frameLocator('iframe[title="eSignatureForm"]');
        const firstName = firstNameFrame.getByLabel('Required - First Name');
        await firstName.fill('FirstNameText');

        // Fill in the last name
        const lastName = firstNameFrame.getByLabel('Required - Last Name');
        await lastName.fill('LastNameText');

        // Select the 'No Permanent Address' option
        const noPermanentAddress = firstNameFrame.locator('label').filter({ hasText: 'Required - Radio Group' }).nth(1);
        await noPermanentAddress.click();

        // Click the start button again to proceed
        await this.startButtonPermanentTaxButton.click();

        // Sign the document
        await this.requiredSignHerePermanent.click();

        // Try adopting and signing, log if already clicked
        try {
            await this.adoptAndSignPermanent.click();
        } catch (error) {
            console.log('Already clicked, proceeding to the next step');
        }

        // Click the 'Finish' button to complete the process
        const finishDocButton = firstNameFrame.getByLabel('Finish');
        await finishDocButton.click();

        // Wait for the next page or action to be ready
        // Ideally, replace this with a more specific wait condition
        await this.page.waitForTimeout(5000);
    }

}
export {PermanentTaxResidentPage};