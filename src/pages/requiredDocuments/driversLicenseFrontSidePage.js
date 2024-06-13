class DriversLicenseFrontSidePage{
    
    constructor(page) {
        this.page = page;
        this.driverLicenseFrontSideDisplayNameHeader = page.locator('h2',{hasText:'Driver\'s License Front Side - Display Name'});
        this.succesHeader = page.locator('h4',{hasText:'Success'});
        this.closeButton = page.getByRole('button', { name: 'Close' });
        this.driverLicenseState = '[data-qa-id="State"]';
        this.driverLicenseNumber = '[data-qa-id="License number"]';
        this.driverLicenseExpirationDate = '[data-qa-id="Expiration Date"]';
        this.uploadFileButton = page.getByRole('button', { name: 'Upload File' });
        this.submitButton = page.getByTestId('btn_submit');
        this.downloadACopyButton = page.locator('#downloadFileButton');
    }
    
    get fillExpirationDate() {return 'input[id="Expiration Date"]';}
    get fillState(){return 'input[id="State"]';}
    get fillLicenseNumber(){ return 'xpath=//input[@id=\'License Number\' or @id=\'License number\']';}

    // A method to fill a text field. This method can be shared among various text field inputs.
    async fillTextField(selector, value) {
        // Wait for the selector to be visible and then fill the value.
        await this.page.waitForSelector(selector);
        await this.page.fill(selector, value);
    }

    async fillDriversLicenseForm(expirationDate, state, licenseNumber) {
        // Create an object from the passed parameters
        const fields = {
            expirationDate,
            state,
            licenseNumber
        };

        // Existing logic for filling form fields
        for (const [field, value] of Object.entries(fields)) {
            let selector;
            switch(field) {
                case 'expirationDate':
                    selector = this.fillExpirationDate;
                    break;
                case 'state':
                    selector = this.fillState;
                    break;
                case 'licenseNumber':
                    selector = this.fillLicenseNumber;
                    break;
                default:
                    throw new Error(`Unknown field: ${field}`);
            }
            await this.fillTextField(selector, value);
        }
    }
    async fillDriversLicenseFrontSide(
        expirationDate,
        state,
        licenseNumber
    ){
        await this.page.fill(this.fillExpirationDate,expirationDate);
        await this.page.fill(this.fillState,state);
        await this.page.fill(this.fillLicenseNumber,licenseNumber);
    }    
    async waitForSuccessModal(){
        const successModal = this.succesHeader;
        await successModal.waitFor();
    }    
    async waitForDownloadACopyButton(){
        const downloadACopyButton = this.downloadACopyButton;
        await downloadACopyButton.waitFor();
    }
    
    async waitForNewTabDriverLicense(){
        const newTab = this.page.waitForEvent('popup');
        await this.downloadACopyButton.click();
        const tab2 = await newTab;
        await tab2.waitForSelector('img');
        await tab2.screenshot({path: 'artifacts/new_tab_screenshot.png' });        
    }
}

export {DriversLicenseFrontSidePage}