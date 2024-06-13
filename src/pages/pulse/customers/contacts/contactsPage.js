// ContactsPage.js
import fs from 'fs'; // Import the 'fs' module to work with files
import {expect} from "@playwright/test";
import {getEmailDetails} from '../../../../utils/emailServiceUtils';
import generateRandomPassword from "../../../../utils/generateRandomPasswordUtils";
import {WaitUtils} from "../../../../utils/waitUtils";

// ContactsPage class represents the contact page of the application
class ContactsPage{
    constructor(page) {
        this.page = page;
        this.waitFor = new WaitUtils(page);
        this.contactInformationHeader = page.locator('h2',{hasText:'CONTACT INFORMATION'});
        this.workPreferencesHeader = page.locator('h2',{hasText:'WORK PREFERENCES'});
        this.contactLink = page.getByText('Contacts');
        this.newContactLink = page.getByLabel('New Contact');
        this.newTraveler = page.getByLabel('New Traveler');
        this.contactInformationSection = page.locator('[aria-label="CONTACT INFORMATION"]');
        this.currentState = page.locator('//ul[@title=\'Current State\']');
        this.deleteState = page.getByLabel('Delete NE');
        this.saveButton = page.getByLabel('Save (CTRL+S)');
        this.communicationPreferences = page.getByLabel('Shift', { exact: true });
        this.jobPreferences = page.getByLabel('Preferred Method of Contact');
        this.email = page.getByLabel('Email', { exact: true });
        this.emailTextField = page.locator('[data-id="emailaddress1-error-message"]');
        this.leadSourceLookup = page.getByLabel('Lead Source, Lookup', { exact: true });
        this.arrowExpand = page.getByLabel('More Header Editable Fields');
        this.searchRecordsForCC = page.getByLabel('Search records for CC, Lookup field');
        this.recentRecords = page.getByRole('button', { name: 'Recent records' });
        this.userNameCC = page.getByLabel('Alan Aramayo');
        this.searchLookup = page.locator('xpath=//button[@data-id=\'header_ms_cc.fieldControl-LookupResultsDropdown_ms_cc_search\']');
        this.advancedLookup = page.getByLabel('CC Lookup results').getByLabel('Advanced lookup');
        this.selectCareerConsultantsTeamDefault = page.getByText('Career Consultants Team (default)');
        this.fullAccessUsers = page.getByRole('option', { name: 'Full Access Users' });
        this.searchBox = page.getByRole('searchbox', { name: 'Choose user for CC' });
        this.selectCareerConsultantRow = page.getByRole('gridcell', { name: 'select or deselect the row' }).locator('i');
        this.doneButton = page.getByRole('button', { name: 'Done' });
        this.sendingPortalInviteButton = page.getByLabel('Send Portal Invite');
        this.errorOkButton = page.getByRole('button', { name: 'Ok' });
        
        
    }
    // Selector for the address line 1 input field
    get currentStreet1Selector() {
        return "//input[@data-id='address2_line1.fieldControl-text-box-text']";
    }
    get currentCity1Selector(){
        return "//input[@data-id='ms_curraddresscity.fieldControl-text-box-text']";
    }
    get currentZipCode1Selector() {
        return "//input[@data-id='ms_curraddresszip.fieldControl-text-box-text']";
    }
    get certificationValue(){
        return "[data-id=\"ms_certifications.fieldControl-text-box-text\"]";
    }
    get currentState1Selector(){
        return "[title=\"NE\"]";
    }
    get currentStateSelector() {
        return "//input[@data-id='ms_curraddressstate.fieldControl-LookupResultsDropdown_ms_curraddressstate_textInputBox_with_filter_new']";
    }
    get preferredMethodOfContact(){
        return "[title=\"Email\"]";
    }    
    get emailAddress(){
        return "xpath=//input[@data-id='emailaddress1.fieldControl-mail-container']";
    }
    get workPreferencesShift(){
        return "[title=\"All\"]";
    }
    get firstNameText() {
        return "//input[@data-id='firstname.fieldControl-text-box-text']";
    }
    get lastNameText() {
        return "//input[@data-id='lastname.fieldControl-text-box-text']";
    }    
    get preferredNameText(){
        return "//input[@data-id='ms_preferredname.fieldControl-text-box-text']";
    }
    get selectLeadSource() {
        return "//input[@data-id='ms_leadsource.fieldControl-LookupResultsDropdown_ms_leadsource_textInputBox_with_filter_new']";
    }    
    get lockupResultDropdown(){
        return "//input[@data-id='header_ms_cc.fieldControl-LookupResultsDropdown_ms_cc_textInputBox_with_filter_new']";
    }
    
    // Fills in the address line 1 input field with the given address
    async fillInAddressComponent(selector,expectedValue) {
        await this.page.fill(selector, expectedValue);
    }
    
    // Asserts that the value of the address line 1 input field equals the expected address
    async assertAddressComponent(expectedValue,selector) {
        const actualAddress = await this.page.inputValue(selector);
        await this.page.waitForTimeout(2000);
        expect(actualAddress).toEqual(expectedValue);
    }    
    async updateFirstNameInput(firstName){
        // Fill in first name
        await this.page.fill(this.firstNameText,firstName);
    }
    async updateLastNameInput(lastName){
        // Fill in first name
        await this.page.fill(this.lastNameText,lastName);
    }
    async updatePreferredNameInput(preferredName){
        // Fill in first name
        await this.page.fill(this.preferredNameText,preferredName);
    }    
    async updateZip(zipcode){
        // Fill in first name
        await this.page.fill(this.currentZipCode1Selector,zipcode);
    }
    async selectState(state){
        await this.page.click(this.currentStateSelector);
        await this.page.fill(this.currentStateSelector,state);
    }    
    async selectNewContactTravel() {
        await this.contactLink.click();
        await this.newContactLink.click();
        await this.newTraveler.click();
    }
  
    async selectLeadSourceLookup(lead){
        await this.page.click(this.selectLeadSource);
        await this.page.waitForTimeout(2000);
        await this.page.fill(this.selectLeadSource,lead);
        await this.page.getByText(lead).click();
    }

    async fillFirstName(firstName) {
        await this.page.fill(this.firstNameText, firstName);
    }

    async fillLastName(lastName) {
        await this.page.fill(this.lastNameText, lastName);
    }

    async fillEmailAddress(email) {
        await this.page.getByLabel('Email', { exact: true }).click();
        await this.page.getByLabel('Email', { exact: true }).fill(email);
    }    
    async selectLookupResultsDropdown(){
        await this.searchRecordsForCC.click();
    }

    async isErrorOkButtonVisible() {
        return await this.errorOkButton.isVisible();
    }
    async clickOnErrorOkButton() {
        await this.errorOkButton.click();
    }

    /**
     * Register a unique user.
     *
     * @param {Object} pulseContactsPage - Instance of the ContactsPage class.
     * @param {Number} uniqueCounter - Unique counter for generating unique data.
     * @param {String} leadSource - Source through which the user got to know about the platform.
     * @param {String} emailDomain - Domain to use for the email address.
     * @returns {String} - Returns the email of the registered user.
     */
    async registerUniqueUser(pulseContactsPage, uniqueCounter, leadSource = 'Bing Search', emailDomain = 'email10.email') {
        try {
            // Generate unique names and email
            const firstName = `TestAutomationQA${uniqueCounter}`;
            const lastName = `QA${uniqueCounter}`;
            const email = `${firstName}@${emailDomain}`;
            const randomPassword = generateRandomPassword();

            // Fill in the First and Last names
            await pulseContactsPage.fillFirstName(firstName);
            await pulseContactsPage.fillLastName(lastName);
            await this.page.waitForTimeout(2000);  // Pause to allow UI to update

            // Fill in the email address
            await pulseContactsPage.fillEmailAddress(email);
            await this.page.waitForTimeout(5000);  // Pause for async operations

            // Select the lead source
            await pulseContactsPage.selectLeadSourceLookup(leadSource);
            await this.page.waitForTimeout(2000);  // Pause for async operations

            // If everything goes well, return the email
            console.log('Registered User Email:', email);

            // Get email details
            const emailDetails = await getEmailDetails(email);
                        
            // Log the email details
            console.log('Email Details:', emailDetails);
            
            // After registering the unique user
            await pulseContactsPage.storeUserDataInJSON(firstName, lastName, email, randomPassword);

            return email;            

        } catch (error) {
            console.error('Error in registerUniqueUser:', error);
            throw error;  // Re-throw the error to be handled by the calling function
        }
    } 
    
    async selectRecentCareerConsultants(){
        await this.arrowExpand.click();
        await this.selectLookupResultsDropdown();
        await this.page.waitForTimeout(5000);
        await this.recentRecords.click();
        await this.page.waitForTimeout(3000);
        await this.userNameCC.click();
        await this.page.waitForTimeout(3000);
        await this.arrowExpand.click();
    }

// This function stores user data in JSON format.
// It uses synchronous file operations and environment-based configurations.
    async storeUserDataInJSON(firstName, lastName, email, password) {
        // User data is collected into an object.
        const userData = { firstName, lastName, email, password };

        // Define the list of valid environments.
        const validEnvironments = ['qa', 'uat', 'prod'];
        // Determine the current environment, default to 'qa' if not found.
        const environment = validEnvironments.includes(process.env.NODE_ENV) ? process.env.NODE_ENV : 'qa';
        // Paths for the configuration and user data files.
        const configPath = `./config.${environment}.json`;
        const userDataPath = `./userData.json`;

        try {
            // Convert user data to a JSON string.
            const userDataString = JSON.stringify(userData);
            // Write the JSON string to a file (userData.json).
            fs.writeFileSync(userDataPath, userDataString);

            // Read the environment-specific configuration file.
            const configData = fs.readFileSync(configPath, 'utf-8');
            const config = JSON.parse(configData);

            // Update configuration with user's email and password.
            config.username = userData.email;
            config.password = userData.password;

            // Convert updated configuration to a JSON string with pretty formatting.
            const updatedConfigData = JSON.stringify(config, null, 2);
            // Write the updated JSON to the configuration file.
            fs.writeFileSync(configPath, updatedConfigData);

            console.log('User data stored and configuration updated successfully.');
        } catch (error) {
            console.error('Error storing user data:', error);
            throw error; // Rethrow the error to handle it in the calling code if necessary.
        }
    }
    
}
export {ContactsPage};