// @ts-check
import {test,expect} from "@playwright/test";
import {ReferencesPage} from "../../../pages/profile/referencesPage";
import referenceData from "../../../../fixtures/referencesData/referencesTestData.json";
import ApiUtils from "../../../utils/apiUtils";
import {performLoginCiroClinician} from "../../../../testBase";
import {HomePage} from "../../../pages/profile/homePage";
import {setTestPassed,isTestPassed } from "../../../utils/referencepagehelper"

test.describe.configure({mode:'serial'});
test('[194161,76904] CWA Navigation-Profile-References Page @smoke-uat-new-user @smoke-prod-new-user @smoke-qa-new-user',async ({page}) => {

    // Create an instance passing the 'page' object to the constructor
    const referencesPage = new ReferencesPage(page);
    const apiUtils = new ApiUtils(page);
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select References Link
    await referencesPage.referencesPageLink.click();
    
    // Enter Reference 1
    const referenceOne = referenceData[0];
    await referencesPage.fillReferenceFirst(
        referenceOne.firstName,
        referenceOne.lastName,
        referenceOne.email,
        referenceOne.primaryPhoneNumber,
        referenceOne.facilityWorkedAt,
        referenceOne.city);
    await referencesPage.clickAndSelectStateDropdown(referencesPage.referencesStateDropdownFirst,referenceOne.state);
    await apiUtils.checkSaveProgressAPI('**/*/saveprogress');

    // Enter Reference 2
    const referenceTwo = referenceData[1];
    await referencesPage.fillReferenceSecond(
        referenceTwo.firstName,
        referenceTwo.lastName,
        referenceTwo.email,
        referenceTwo.primaryPhoneNumber,
        referenceTwo.facilityWorkedAt,
        referenceTwo.city);
    await referencesPage.clickAndSelectStateDropdown(referencesPage.referencesStateDropdownSecond,referenceTwo.state);
    await apiUtils.checkSaveProgressAPI('**/*/saveprogress');
    
    // Submit References and Validate Success modal
    await referencesPage.submitButton.click();
    const modal = page.locator('h4',{hasText:'Success'});
    await modal.waitFor();
    await expect(referencesPage.referencesSuccessTextHeader).toBeVisible();
    await referencesPage.referencesSuccessButton.click();
    await page.reload();

    // Validate Submitted text
    await expect(referencesPage.reference1SubmittedText).toBeVisible();
    await expect(referencesPage.reference2SubmittedText).toBeVisible();

    // Validate References Task Card does not display
    await homePage.homePageLink.click();
    await page.reload();
    await expect(homePage.professionalReferences).toBeHidden();
    setTestPassed();
})

test('[76918] CWA: Professional References Additional References 3 and 4 @smoke-uat-new-user @smoke-prod-new-user @smoke-qa-new-user',async ({page}) => {
    if (isTestPassed()) {
    // Create an instance passing the 'page' object to the constructor
    const referencesPage = new ReferencesPage(page);
    const apiUtils = new ApiUtils(page);
    const homePage = new HomePage(page);
    
    // Perform the login operation first
    await performLoginCiroClinician(page);
    
    // Select References Link
    await referencesPage.referencesPageLink.click();
    
    //Click Additional References Button
    await referencesPage.clickAdditionalReference(referencesPage.reference3Header,referencesPage.removeReference3);
    
    // Enter Reference 3
    const referenceThree = referenceData[2];
    await referencesPage.fillReferenceThird(
            referenceThree.firstName,
            referenceThree.lastName,
            referenceThree.email,
            referenceThree.primaryPhoneNumber,
            referenceThree.facilityWorkedAt,
            referenceThree.city);
    await referencesPage.clickAndSelectStateDropdown(referencesPage.referencesStateDropdownThird,referenceThree.state);
    await apiUtils.checkSaveProgressAPI('**/*/saveprogress');
    
    //Click Additional References Button
    await referencesPage.clickAdditionalReference(referencesPage.reference4Header,referencesPage.removeReference4);
    
    // Enter Reference 4
    const referenceFour = referenceData[3];
    await referencesPage.fillReferenceFourth(
            referenceFour.firstName,
            referenceFour.lastName,
            referenceFour.email,
            referenceFour.primaryPhoneNumber,
            referenceFour.facilityWorkedAt,
            referenceFour.city);
    await referencesPage.clickAndSelectStateDropdown(referencesPage.referencesStateDropdownFourth,referenceFour.state);
    await apiUtils.checkSaveProgressAPI('**/*/saveprogress');
        
    // Submit References and Validate Success modal
    await referencesPage.submitButton.click();
    const modal = page.locator('h4',{hasText:'Success'});
    await modal.waitFor();
    await expect(referencesPage.referencesSuccessTextHeader).toBeVisible();
    await referencesPage.referencesSuccessButton.click();
    await page.reload();
    
    // Validate Submitted text
    await expect(referencesPage.reference3SubmittedText).toBeVisible();
    await expect(referencesPage.reference4SubmittedText).toBeVisible();
    
    // Validate References Task Card does not display
    await homePage.homePageLink.click();
    await page.reload();
    await expect(homePage.professionalReferences).toBeHidden();
  
    } else {
        console.log('Skipping: [76918] CWA: Professional References Additional References 3 and 4 because [194161,76904] CWA Navigation-Profile-References Page did not pass.');
    }    });  