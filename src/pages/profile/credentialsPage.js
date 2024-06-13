import ActionUtils from "../../utils/actionsUtils";
import UploadUtils from "../../utils/uploadUtils";
class CredentialsPage {

    constructor(page) {
        this.page = page;
        this.actionUtils = new ActionUtils(page);
        this.uploadUtils = new UploadUtils(page);
        this.credentialsPageLink = page.getByRole('link',{name:'Credentials'});
        this.credentialsPageLinkHeader = page.locator('h2',{hasText:'Credentials'});
        this.credentialsBreadcrumb = page.locator('span').filter({ hasText: 'Credentials' }).nth(1);
        this.activeLicensesTaskCardCounter = page.getByTestId('tabs--1-tab--0');
        this.activeLicensesText = page.locator('h1',{hasText:'Active Licenses'});
        this.certificationsText = page.locator('h1',{hasText:'Certification'});
        this.activeLicensesTab = page.getByRole('tab', { name: 'Active Licenses 0' });
        this.addLicensesButton = page.getByRole('button',{name:'Add License'});
        this.addLicensesText = page.locator('h2',{hasText:'Add License'});
        this.addLicenseStateDropdown = '#stateLicence';
        this.certificaitons = page.locator('h2',{hasText:'Certifications'});
        this.activeCertificationsTab = page.getByTestId('tabs--1-tab--1')
        this.addCertificationText = page.locator('h2',{hasText:'Add Certification'});
        this.addCertificationsButton = page.getByRole('button', { name: 'Add Certification' });
        this.addCertificationTypeDropdown = '#certificationType';
        this.licenseNumberInputField = page.getByTestId('license-number');
        this.expirationDateInputField = page.getByTestId('expiration-date');
        this.saveLicenseButton = page.getByTestId('update-license');
        this.saveCertificationButton = page.getByTestId('update-certification');
        this.taskCardStateLicenseAK = page.getByTestId('task-card-state-license-ak');
        this.taskCardCertARDMS = page.getByTestId('task-card-ardms');
        this.taskCardCertATC = page.getByTestId('task-card-atc');
        this.compactLicenseCheckbox = page.getByTestId('compact-license');
        this.stateLicenseDropdown = page.getByTestId('state-license');
        this.deleteLicenseButton = page.getByTestId('button-delete-license');
        this.frontSideNurseLicense = page.getByText('Choose File').first();
        this.backSideNurseLicense = page.getByText('Choose File').nth(1);
        this.frontSideNurseLicenseInput = 'xpath=//span[text()=\'Choose File \']/following::input[@type="file"]';
        this.backSideNurseLicenseInput = 'xpath=//text()[contains(.,"Choose File")][1]/following::input[@type="file"]';
    }
    
    // Functions/Methods
    async waitForBreadcrumbCredentials(){
        const breadcrumbCredentials = this.credentialsBreadcrumb;
        await breadcrumbCredentials.waitFor();
    }

    async enterLicenseNumber(number){
        await this.licenseNumberInputField.fill(number);
    }

    async selectState(state){
        await this.actionUtils.selectOptionFromDropdownTestId(state);
    }

    async selectCertificationType(type){
        await this.actionUtils.selectCertificationTypeFromDropdown(type)
    }

    async enterExpiration(date){
        await this.expirationDateInputField.fill(date);
    }

    async uploadFrontImage(imagePath) {
        // Wait for the first "Choose File" span to be visible
        await this.page.locator('text=Choose File').first().waitFor({ state: 'visible' });

        // Assuming the input is either a preceding sibling or closely related in the DOM
        const inputFile = await this.page.locator('input[type="file"]').first();
        await inputFile.setInputFiles(imagePath);
    }

    async uploadBackImage(imagePath) {
        // Wait for the first "Choose File" span to be visible
        await this.page.locator('text=Choose File').first().waitFor({ state: 'visible' });

        // Assuming the input is either a preceding sibling or closely related in the DOM
        const inputFile = await this.page.locator('input[type="file"]').first();
        await inputFile.setInputFiles(imagePath);
    }

}
export {CredentialsPage};