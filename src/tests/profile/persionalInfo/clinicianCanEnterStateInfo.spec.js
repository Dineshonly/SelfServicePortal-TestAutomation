import {expect, test} from '@playwright/test';
import {PersonalInfoPage} from "../../../pages/profile/personalinfoPage";
import ActionsUtils from "../../../utils/actionsUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../../testBase";
test('[57593] @regression CWA: Clinician can enter the State information into Current Address section', async ({page}) => {
    // Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
    const personalInfoPage = new PersonalInfoPage(page);
    const actionUtils = new ActionsUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select Personal Info Link
    await personalInfoPage.personalInfoLink.click();

    // Current Address - Address Line 1
    await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentAddressHeader);

    // Select state from dropdown
    await personalInfoPage.selectStateDropdown('Texas');

    // Validate Texas value
    await expect(page.locator('#currentAddressState')).toContainText('Texas');

    // Select state from dropdown
    await personalInfoPage.selectStateDropdown('Arkansas');

    // Validate Arkansas value
    await expect(page.locator('#currentAddressState')).toContainText('Arkansas');

});