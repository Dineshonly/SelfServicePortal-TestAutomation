import {test} from '@playwright/test';
import {PersonalInfoPage} from "../../../pages/profile/personalinfoPage";
import {performLoginCiroClinician} from "../../../../testBase";
import {PermanentTaxResidentPage} from "../../../pages/requiredDocuments/permanentTaxResidentNotificationPage";

test('[196367] CWA: Complete a Permanent Tax Resident Notification smoke-uat-new-user', async ({page}) => {

    // Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
    const personalInfoPage = new PersonalInfoPage(page);
    const permanentTaxResidentPage = new PermanentTaxResidentPage(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select Personal Info Link
    await personalInfoPage.personalInfoLink.click();

    // Select Permanent Tax click here
    await personalInfoPage.permTaxFormLink.click();

    // Validate Heading
    const permanentTaxResidentHeader = page.locator('h2',{hasText:'Permanent Tax Resident Notification'});
    await permanentTaxResidentHeader.waitFor();

    // Cookies
    try {
        // This may have been clicked
        await permanentTaxResidentPage.disclosureAccepted();
    } catch (error) {
        console.log('Already clicked, proceeding to the next step')
    }

    // Click on the Continue button
    await permanentTaxResidentPage.clickOnContinueButton();

    // Fill in form
    await permanentTaxResidentPage.clickOnStartButtonFillIn();
});