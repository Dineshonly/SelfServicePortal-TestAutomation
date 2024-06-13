import {expect} from "playwright/test";
import ApiUtils from "./../../utils/apiUtils";
class ReferencesPage {

    constructor(page) {
        this.page = page;
        this.apiUtils = new ApiUtils(page);
        this.referencesStateDropdownFirst = page.locator('[id="references.0.state"]');
        this.referencesStateDropdownSecond = page.locator('[id="references.1.state"]');
        this.referencesStateDropdownThird = page.locator('[id="references.2.state"]');
        this.referencesStateDropdownFourth = page.locator('[id="references.3.state"]');
        this.referencesPageLink = page.getByRole('link',{name:'References'});
        this.referencesPageLinkHeader = page.locator('h2',{hasText:'Professional References'});
        this.submittedText = page.locator('xpath=//span[text()=\'Submitted\']');
        this.submitButton = page.getByRole('button',{name:'Submit'});
        this.changesSavedAsDraft = page.locator('xpath=//p[contains(text(),\'Your changes have been saved as a draft. Please Su\')]')
        this.reference1SubmittedText = page.locator('span').filter({ hasText: 'Submitted' }).first();
        this.reference2SubmittedText = page.locator('span').filter({ hasText: 'Submitted' }).nth(2);
        this.reference3SubmittedText = page.locator('span').filter({ hasText: 'Submitted' }).nth(3);
        this.reference4SubmittedText = page.locator('span').filter({ hasText: 'Submitted' }).nth(4);
        this.referencesSuccessTextHeader = page.locator('h4',{hasText:'Success'});
        this.referencesSuccessButton = page.getByRole('button',{name:'Close'});
        this.additionalReference = page.getByRole('button',{name:'Additional Reference'});
        this.reference3Header = page.locator('h3',{hasText:'Reference 3'});
        this.reference4Header = page.locator('h3',{hasText:'Reference 4'});
        this.removeReference3 = page.getByRole('button',{name:'Remove Contact'}).first();
        this.removeReference4 = page.getByRole('button',{name:'Remove Contact'}).nth(1);
    }
    
    // Locators for form elements
    // Ref 1
    get firstnameInputRef1(){ return 'input[name="references\\.0\\.firstName"]';}
    get lastnameInputRef1(){return 'input[name="references\\.0\\.lastName"]';}    
    get emailInputRef1(){return 'input[name="references\\.0\\.email"]';}
    get primaryPhoneNumberInputRef1() {return '[data-qa-id="references-0-primaryPhone"]';}
    get facilityInputRef1() {return 'input[name="references\\.0\\.facilityWorkedAt"]';}
    get cityInputRef1() {return 'input[name="references\\.0\\.city"]';}

    // Ref 2
    get firstnameInputRef2(){ return 'input[name="references\\.1\\.firstName"]';}
    get lastnameInputRef2(){return 'input[name="references\\.1\\.lastName"]';}
    get emailInputRef2(){return 'input[name="references\\.1\\.email"]';}
    get primaryPhoneNumberInputRef2() {return '[data-qa-id="references-1-primaryPhone"]';}
    get facilityInputRef2() {return 'input[name="references\\.1\\.facilityWorkedAt"]';}
    get cityInputRef2() {return 'input[name="references\\.1\\.city"]';}
    
    // Ref 3
    get firstnameInputRef3(){ return 'input[name="references\\.2\\.firstName"]';}
    get lastnameInputRef3(){return 'input[name="references\\.2\\.lastName"]';}    
    get emailInputRef3(){return 'input[name="references\\.2\\.email"]';}
    get primaryPhoneNumberInputRef3() {return '[data-qa-id="references-2-primaryPhone"]';}
    get facilityInputRef3() {return 'input[name="references\\.2\\.facilityWorkedAt"]';}
    get cityInputRef3() {return 'input[name="references\\.2\\.city"]';}

    // Ref 4
    get firstnameInputRef4(){ return 'input[name="references\\.3\\.firstName"]';}
    get lastnameInputRef4(){return 'input[name="references\\.3\\.lastName"]';}
    get emailInputRef4(){return 'input[name="references\\.3\\.email"]';}
    get primaryPhoneNumberInputRef4() {return '[data-qa-id="references-3-primaryPhone"]';}
    get facilityInputRef4() {return 'input[name="references\\.3\\.facilityWorkedAt"]';}
    get cityInputRef4() {return 'input[name="references\\.3\\.city"]';}  
    
    // Functions/Methods 
    async fillReferenceFirst(firstname,lastname,email,phoneNumber,facility,city) {
        try {
            await this.fillAndCheck(this.firstnameInputRef1,firstname);
            await this.fillAndCheck(this.lastnameInputRef1,lastname);
            await this.fillAndCheck(this.emailInputRef1,email);
            await this.fillAndCheck(this.primaryPhoneNumberInputRef1,phoneNumber);
            await this.fillAndCheck(this.facilityInputRef1,facility);
            await this.fillAndCheck(this.cityInputRef1,city);
        } catch (error) {
            console.error('Error filling the reference form:', error);
        }
    }
    async fillReferenceSecond(firstname,lastname,email,phoneNumber,facility,city ){
       try {
           await this.fillAndCheck(this.firstnameInputRef2,firstname);
           await this.fillAndCheck(this.lastnameInputRef2,lastname);
           await this.fillAndCheck(this.emailInputRef2,email);
           await this.fillAndCheck(this.primaryPhoneNumberInputRef2,phoneNumber);
           await this.fillAndCheck(this.facilityInputRef2,facility);
           await this.fillAndCheck(this.cityInputRef2,city);
       } catch (error) {
           console.error('Error filling the reference form:', error);
       }
    }
    async fillReferenceThird(firstname,lastname,email,phoneNumber,facility,city) {
        try {
            await this.fillAndCheck(this.firstnameInputRef3,firstname);
            await this.fillAndCheck(this.lastnameInputRef3,lastname);
            await this.fillAndCheck(this.emailInputRef3,email);
            await this.fillAndCheck(this.primaryPhoneNumberInputRef3,phoneNumber);
            await this.fillAndCheck(this.facilityInputRef3,facility);
            await this.fillAndCheck(this.cityInputRef3,city);
        } catch (error) {
            console.error('Error filling the reference form:', error);
        }
    }
    async fillReferenceFourth(firstname,lastname,email,phoneNumber,facility,city ){
       try {
           await this.fillAndCheck(this.firstnameInputRef4,firstname);
           await this.fillAndCheck(this.lastnameInputRef4,lastname);
           await this.fillAndCheck(this.emailInputRef4,email);
           await this.fillAndCheck(this.primaryPhoneNumberInputRef4,phoneNumber);
           await this.fillAndCheck(this.facilityInputRef4,facility);
           await this.fillAndCheck(this.cityInputRef4,city);
       } catch (error) {
           console.error('Error filling the reference form:', error);
       }
    }
    // Helper function to fill input and check API
    async fillAndCheck(inputRef, value) {
        await this.page.fill(inputRef, value);
        await this.apiUtils.checkSaveProgressAPI('**/*/saveprogress');
        await this.page.waitForSelector(inputRef, { state: 'attached' });
    }

    async clickAndSelectStateDropdown(dropdownRef, state) {
        try {
            // Click the specified dropdown element
            const dropdown = await dropdownRef;
            await dropdown.waitFor();
            await dropdown.click();

            // Locate and click the option
            const option = await this.page.getByText(state, { exact: true });
            await option.waitFor();
            await option.click();
        } catch (error) {
            console.error(`Error selecting state from dropdown: ${error}`);
        }
    }

    //Click Additional Reference button
    async clickAdditionalReference(referenceHeader,removeReference)
    {
        try{
            await expect(referenceHeader).toBeVisible();
            await removeReference.click();
            console.log('Reference is visible');
            await this.additionalReference.click();
        }
        catch{
            console.log('Reference is not visible');
            await this.additionalReference.click();
        }
    }

}
export {ReferencesPage};