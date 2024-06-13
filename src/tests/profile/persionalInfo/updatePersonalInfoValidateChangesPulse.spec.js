// @ts-check
import {test,expect} from "@playwright/test";
import {PersonalInfoPage} from "../../../pages/profile/personalinfoPage";
import {ContactsPage} from "../../../pages/pulse/customers/contacts/contactsPage";
import {AppsPage} from "../../../pages/pulse/appsPage";
import {DashboardsPage} from "../../../pages/pulse/dashboards/dashboardsPage";
import appData from "../../../../fixtures/personalInfo/personalInfoTestData.json";
import ActionsUtils from "../../../utils/actionsUtils";
import {performLoginCiroClinician} from "../../../../testBase";
import {performLoginPulse} from "../../../../testBase";

// Wrap your tests under a single describe block
test.describe("Update Personal Info Validate Changes in Pulse", () => {

	test("Update the Personal Info page",async ({page}) => {

		// Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
		const personalInfoPage = new PersonalInfoPage(page);
		const actionUtils = new ActionsUtils(page);

		// Perform the login operation first
		await performLoginCiroClinician(page);

		// Select Personal Info Link
		await personalInfoPage.personalInfoLink.click();

		// Validate Current Address blank
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentAddressHeader);
		await personalInfoPage.verifyCurrentAddressEmpty();

		// Validate Communication Preferences set default "Any"
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentCommunicationPreferencesHeader);
		await personalInfoPage.verifyPreferredMethodOfContactSetToDefault();

		// Validate Credentials are not selected
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentCredentialsHeader);
		const isCredentialsNotSelected = await personalInfoPage.verifyCredentialsNotSelected();
		expect(isCredentialsNotSelected).toBe(true);

		// Validate Job Preferences set default "No Preference"
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentJobPreferencesHeader);
		await personalInfoPage.verifyJobPreferences();

		// Update Current Address
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentAddressHeader);
		const currentAddress = appData.currentAddressTestData[0];
		await personalInfoPage.fillCurrentAddress(
			currentAddress.streetAddress,
			currentAddress.city,
			currentAddress.selectState,
			currentAddress.zipCode
		);

		// Update Communication Preferences
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentCommunicationPreferencesHeader);
		const communicationPreferences = appData.currentCommunicationTestData[0];
		await personalInfoPage.selectPreferredMethodOfContact(communicationPreferences.Email);

		// Update Credentials
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentCredentialsHeader);
		const credentialsPreferences = appData.currentCredentialsTestData[0];
		await personalInfoPage.selectCertifications(credentialsPreferences.ARDMS);

		// Update Job Preferences
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentJobPreferencesHeader);
		const credentialsJobPreferences = appData.currentJobPreferenceTestData[0];
		await personalInfoPage.selectJobPreferences(credentialsJobPreferences.All);

		// Save Changes
		await personalInfoPage.saveChangesButton.click();
	});

	test("Validate Pulse data",async ({page}) => {

		// Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
		const pulseAppPage = new AppsPage(page);
		const pulseDashboardPage = new DashboardsPage(page);
		const pulseContactsPage = new ContactsPage(page);
		const actionUtils = new ActionsUtils(page);

		// Navigate Pulse and login
		await performLoginPulse(page);

		// Select Pulse App
		await pulseAppPage.clickOnPulseApp();

		// Search for Test Account
		await pulseDashboardPage.searchGlobalSearchBox("TestAutomation TestQA01");
		await expect(pulseContactsPage.contactInformationHeader).toBeVisible;

		// Validate Address
		await pulseContactsPage.contactInformationSection.click();
		await actionUtils.scrollToElement(pulseContactsPage.currentStreet1Selector);
		await pulseContactsPage.assertAddressComponent("123 Med Sol Drive",pulseContactsPage.currentStreet1Selector);
		await pulseContactsPage.assertAddressComponent("Omaha",pulseContactsPage.currentCity1Selector);
		await actionUtils.scrollToElement(pulseContactsPage.currentCity1Selector);
		await expect(pulseContactsPage.currentState1Selector).toContain("NE");
		await actionUtils.scrollToElement(pulseContactsPage.currentZipCode1Selector);
		await pulseContactsPage.assertAddressComponent("68116",pulseContactsPage.currentZipCode1Selector);
		await actionUtils.scrollToElement(pulseContactsPage.currentStreet1Selector);
		await pulseContactsPage.assertAddressComponent("ARDMS",pulseContactsPage.certificationValue);
		await expect(pulseContactsPage.preferredMethodOfContact).toContain("Email");
		await expect(pulseContactsPage.workPreferencesShift).toContain("All");

		// Clean data - Pulse
		await actionUtils.scrollToElement(pulseContactsPage.currentStreet1Selector);
		// Current: Street 1
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentStreet1Selector,"");
		await actionUtils.scrollToElement(pulseContactsPage.currentCity1Selector);
		// Current: City
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentCity1Selector,"");
		// Current State
		await actionUtils.scrollToElement(pulseContactsPage.currentState1Selector);
		await pulseContactsPage.currentState.click();
		await pulseContactsPage.deleteState.click();
		// Current Zip
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentZipCode1Selector,"");
		await actionUtils.scrollToElement(pulseContactsPage.contactInformationHeader);
		await pulseContactsPage.communicationPreferences.selectOption("-1");
		await pulseContactsPage.jobPreferences.selectOption("1");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(2000);
	});

	test("Remove Cert on Web App",async ({page}) => {

		// Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
		const personalInfoPage = new PersonalInfoPage(page);
		const actionUtils = new ActionsUtils(page);

		// Perform the login operation first
		await performLoginCiroClinician(page);

		// Remove Cert on Web App
		await personalInfoPage.personalInfoLink.click();
		await actionUtils.scrollToElement(personalInfoPage.personalInfoCurrentCredentialsHeader);
		await personalInfoPage.removeCert.click();
		await personalInfoPage.saveChangesButton.click();
	});
});