// @ts-check
import {test, expect} from "@playwright/test";
import {PersonalInfoPage} from "../../../pages/profile/personalinfoPage";
import ActionsUtils from "../../../utils/actionsUtils";
import AssertUtils from "../../../utils/assertUtils";
import {performLoginCiroClinician} from "../../../../testBase";

test("[194159] CWA Navigation-Profile-Personal Info @smoke-prod-new-user @smoke-qa-new-user",async ({page}) => {
        
	// Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
	const personalInfoPage = new PersonalInfoPage(page);
	const actionUtils = new ActionsUtils(page);
	const assertUtils = new AssertUtils(page);

	// Perform the login operation first
	await performLoginCiroClinician(page);

	// Select Personal Info Link
	await personalInfoPage.personalInfoLink.click();
	await expect(personalInfoPage.personalInfoLinkHeader).toBeVisible();

	// Validate the "Personal Info" element
	await assertUtils.validateCurrentCrumb("Personal Info");
        
	// Verify First & Last Name
	await expect(personalInfoPage.profileName).toBeVisible();

	// Add Preferred Name and save
	await personalInfoPage.addPreferredFirstName();
    
	// Verify Perm Tax Link
	await personalInfoPage.clickPermTaxFormLink();
	await expect(personalInfoPage.permTaxFormLinkHeader).toBeVisible();
	await page.goBack();
	const personalInfoLink = page.getByRole('link',{name:'Personal Info'});
	await personalInfoLink.waitFor();
	await page.reload();

	// delete Preferred Name
	await personalInfoPage.deletePreferredFirstName();
    
	// Check Header Sections
	await expect(personalInfoPage.personalInfoAboutMeHeader).toBeVisible();
	await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentAddressHeader);
	await expect(personalInfoPage.personalInfoCurrentAddressHeader).toBeVisible();
	await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentCommunicationPreferencesHeader);
	await expect(personalInfoPage.personalInfoCurrentCommunicationPreferencesHeader).toBeVisible();
	await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentJobPreferencesHeader);
	await expect(personalInfoPage.personalInfoCurrentJobPreferencesHeader).toBeVisible();
	await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentTwoStepVerificationHeader);
	await expect(personalInfoPage.personalInfoCurrentTwoStepVerificationHeader).toBeVisible();    
});