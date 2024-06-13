import {expect} from "@playwright/test";
import ActionUtils from "../../utils/actionsUtils";
import ApiUtils from "../../utils/apiUtils";
class PersonalInfoPage {
    constructor(page) {
        this.page = page;
        this.actionUtils = new ActionUtils(page);
        this.apiUtils = new ApiUtils(page);
        this.personalInfoLink = page.getByRole('link',{name:'Personal Info'});
        this.personalInfoLinkBreadcrumb = page.locator('span').filter({ hasText: 'Personal Info' }).nth(1);
        this.personalInfoLinkHeader = page.locator('h3',{hasText:'Personal Info'});
        this.personalInfoAboutMeHeader = page.locator('p',{hasText:'About Me'})
        this.personalInfoCurrentAddressHeader = page.locator('h3',{hasText:'Current Address'});
        this.personalInfoCurrentAddress1 = page.locator('#currentAddress1');
        this.personalInfoCurrentAddress2 = page.locator('#currentAddress2');
        this.personalInfoCurrentAddress3 = page.locator('#currentAddress3');
        this.personalInfoCurrentAddressCity = page.locator('#currentAddressCity');
        this.personalInfoCurrentAddressState = page.locator('#currentAddressState');
        this.persionalInfoCurrentAddressZip = page.locator('#currentAddressPostalCode');
        this.currentAddressState = 'xpath=//div[@id=\'currentAddressState\']';
        this.personalInfoCurrentAddressPostalCode = page.locator('#currentAddressPostalCode');
        this.personalInfoCurrentCredentialsHeader = page.locator('h3',{hasText:'Credentials'});
        this.personalInfoPreferredMethodOfContact = page.locator('#contactPreference');
        this.communicationPreferences = 'xpath=//div[text()=\'Preferred Method of Contact\']';
        this.personalInfoCurrentCommunicationPreferencesHeader = page.locator('h3',{hasText:'Communication Preferences'});
        this.personalInfoCertifications = page.locator('div.sc-hgRfpC.eTDQLx');
        this.certificaitons = 'xpath=//div[text()=\'Certifications\']';
        this.personalInfoCertificationsDropdown = page.locator('#certifications');
        this.personalInfoCurrentActiveLicensesHeader = page.locator('h4',{hasText:'Active Licenses'});
        this.personalInfoCurrentJobPreferencesHeader = page.locator('h3',{hasText:'Job Preferences'});
        this.personalInfoShiftPreference = page.locator('#shiftPreference');
        this.preferredShift = 'xpath=//div[text()=\'Preferred Shift\']';
        this.personalInfoCurrentTwoStepVerificationHeader = page.locator('h3',{hasText:'Two-step verification'});
        this.permTaxFormLink = page.getByText('click here');
        this.permTaxFormLinkHeader = page.locator('h2',{hasText:'Permanent Tax Resident Notification'});
        this.profileName = page.locator('span.profile-desc__name');
        this.preferredFirstName = page.locator('#preferredFirstName');
        this.navbarProfileInfoName = page.locator('div.navbar__profile__info');
        this.saveChangesButton = page.locator('xpath=//button[text()=\'Save Changes\']');
        this.saveChangesButtonXpath = page.locator('xpath=//*[@id="main"]/div[3]/div[3]/div/button');
        this.removeCert = page.getByLabel('Remove');
        this.removeCertFilter = page.locator('div').filter({ hasText: /^CertificationsCertificationsARDMSARDMS$/ }).getByLabel('Remove');
        this.removeStateFilter = page.locator('div').filter({hasText: /^Alaska$/}).getByLabel('Remove');
        this.ARDMSCert = page.getByText('ARDMS').nth(1);
        this.alaskaState = page.getByText('Alaska').nth(1);
        this.mobilePhoneInput = page.locator('#mobilePhone');
        this.aboutMeTextArea = page.getByPlaceholder('Describe yourself (2000');
        this.myFavoritePlacesInput = page.locator('#favouritePlaces');
        this.myPetNames = page.locator('#favouritePetsAndNames');
        this.myhobbiesInput = page.locator('#favouriteHobbies');
        this.myFavoriteBandInput = page.locator('#favouriteBandsOrMusic');
        this.myFavoriteFoodInput = page.locator('#favouriteFoodsOrSnacks');
        this.myFavoriteBeverageInput = page.locator('#favouriteBeverages');
        this.myFavoriteBookInput = page.locator('#favouriteBooksOrMagazines');
    }
    
    // Functions/Methods 

    // Asserts that the value of address line 1 input field equals the expected address
    async assertAddressComponent(expectedValue,selector) {
        const actualAddress = await this.page.inputValue(selector);
        await actualAddress.waitFor();
        expect(actualAddress).toEqual(expectedValue);
    }

    get fillPreferredFirstName() {return 'input[id="preferredFirstName"]';}
    get fillInfoCurrentAddress1() {return 'input[id="currentAddress1"]';}
    get fillInfoCurrentAddressCity(){return 'input[id="currentAddressCity"]';}
    
    get fillCurrentAddressState() {return '//div[@id=\'currentAddressState\']'}
    get fillInfoCurrentAddressPostalCode(){return 'input[id="currentAddressPostalCode"]';}
    async waitForBreadcrumbPersonalInfo(){
        const breadCrumbPersonalInfo = this.personalInfoLinkBreadcrumb;
        await breadCrumbPersonalInfo.waitFor();
    }
    
    async clickPermTaxFormLink(){
        await this.permTaxFormLink.click();
        const permanentTaxHeader = this.page.locator('h2',{hasText:'Permanent Tax Resident Notification'});
        await permanentTaxHeader.waitFor();
        const currentUrl = this.page.url();
        if (currentUrl.includes('/esignature') || currentUrl.includes('/docusign')) {
            console.log('URL is as expected:', currentUrl);
        } else {
            throw new Error(`Unexpected URL: ${currentUrl}`);
        }
    }

    async addPreferredFirstName() {
        try {
            await this.preferredFirstName.click();
            await this.preferredFirstName.fill('Automation');
            await this.saveChangesButton.click();
            // Wait for the API response
            const response = await this.page.waitForResponse(response =>
                response.url().includes('/profiles') && response.status() === 200);

            if (response) {
                console.log('Success! The API returned the expected response.');
                // Continue with your next steps
            } else {
                console.log('Unexpected response received or timeout occurred.');
            }
        } catch (error) {
            console.error(`Error in addPreferredFirstName: ${error}`);
        }
    }

    async deletePreferredFirstName() {
        try {
            await this.preferredFirstName.dblclick();
            await this.preferredFirstName.fill('');
            await this.saveChangesButton.click();

            // Wait for the API response
            const response = await this.page.waitForResponse(response =>
                response.url().includes('/profiles') && response.status() === 200);

            if (response) {
                console.log('Success! The API returned the expected response.');
            } else {
                console.log('Unexpected response received or timeout occurred.');
            }
        } catch (error) {
            console.error(`Error in deletePreferredFirstName: ${error}`);
        }
    }

    async verifyCurrentAddressEmpty(){
        const currentAddressBlank = this.personalInfoCurrentAddress1;
        await expect(currentAddressBlank).toBeEmpty();
    }

    async verifyPreferredMethodOfContactSetToDefault(){
        const contactSetToDefault = this.personalInfoPreferredMethodOfContact;
        await expect(contactSetToDefault).toContainText('Any');
    }
    async verifyCredentialsNotSelected(){
        const selectedOptionsLocator = await this.personalInfoCertifications;
        const selectedOptionsCount = await selectedOptionsLocator.count();
        console.log(selectedOptionsCount);
        const credentialsNotSelected = selectedOptionsCount === 0;
        if (credentialsNotSelected) {
            console.log('No options are selected in the Certifications dropdown.');
            return true;
        } else {
            console.error('Options are selected in the Certifications dropdown.');
            return false;
        }
    }
    async verifyJobPreferences(){
        const preferredShiftSetToDefault = this.personalInfoShiftPreference;
        await expect(preferredShiftSetToDefault).toContainText('No Preference');
    }
    
    async fillCurrentAddress(
        addressLine1,
        city,
        state,
        zip
    ){
        // Fill in Address Line 1
        await this.page.fill(this.fillInfoCurrentAddress1,addressLine1);
        // Fill City
        await this.page.fill(this.fillInfoCurrentAddressCity,city);
        // Select State
        await this.actionUtils.clickAndSelectDropDownState(state);
        // Fill Zip Code
        await this.page.fill(this.fillInfoCurrentAddressPostalCode,zip);
    }
    async selectPreferredMethodOfContact(
        communicationType
    ){
        // Select communication
        await this.actionUtils.clickAndSelectDropDownPreferredContact(communicationType);
    }
    async selectCertifications(
        cert
    ){
        // Select Cert
        await this.actionUtils.clickAndSelectDropDownCertifications(cert);
    }
    async selectJobPreferences(
        preferredShift
    ){
        // Select Job Preferences
        await this.actionUtils.clickAndSelectDropDownPreferredShift(preferredShift);
    }
    async selectStateDropdown(state){
        await this.personalInfoCurrentAddressState.click();
        await this.page.getByText(state, { exact: true }).click();
    }

    async fillForm({firstName, mobilePhone, aboutMe, favoritePlaces, petsInfo, hobbies, favoriteBand, favoriteFood, favoriteBeverage, favoriteBook}){
       if (firstName) await this.preferredFirstName.fill(firstName);
       if (mobilePhone) await this.mobilePhoneInput.fill(mobilePhone);
       if (aboutMe) await this.aboutMeTextArea.fill(aboutMe);
       if (favoritePlaces) await this.myFavoritePlacesInput.fill(favoritePlaces);
       if (petsInfo) await this.myPetNames.fill(petsInfo);
       if (hobbies) await this.myhobbiesInput.fill(hobbies);
       if (favoriteBand) await this.myFavoriteBandInput.fill(favoriteBand);
       if (favoriteFood) await this.myFavoriteFoodInput.fill(favoriteFood);
       if (favoriteBeverage) await this.myFavoriteBeverageInput.fill(favoriteBeverage);
       if (favoriteBook) await this.myFavoriteBookInput.fill(favoriteBook);
        await this.saveChangesButton.click();
        // Wait for the API response
        const response = await this.page.waitForResponse(response =>
            response.url().includes('/profiles') && response.status() === 200);

        if (response) {
            console.log('Success! The API returned the expected response.');
            // Continue with your next steps
        } else {
            console.log('Unexpected response received or timeout occurred.');
        }
    } catch (error) {
        console.error(`Error in addPreferredFirstName: ${error}`);
    }

}
export {PersonalInfoPage};