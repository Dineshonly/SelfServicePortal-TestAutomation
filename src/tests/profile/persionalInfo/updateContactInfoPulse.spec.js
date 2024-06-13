// @ts-check
import {test,expect} from "@playwright/test";
import {performLoginPulse,performLoginCiroClinician} from "../../../../testBase";
import {AppsPage} from "../../../pages/pulse/appsPage";
import {DashboardsPage} from "../../../pages/pulse/dashboards/dashboardsPage";
import {ContactsPage} from "../../../pages/pulse/customers/contacts/contactsPage";
import ActionsUtils from "../../../utils/actionsUtils";
import {PersonalInfoPage} from "../../../pages/profile/personalinfoPage";

// Wrap your tests under a single describe block
test.describe("Update Contact Information in Pulse", () => {
    
	test("Validate that changes are visible in TWA",async ({page}) => {

		// Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
		const pulseAppPage = new AppsPage(page);
		const pulseDashboardPage = new DashboardsPage(page);
		const pulseContactsPage = new ContactsPage(page);
		const actionUtils = new ActionsUtils(page);
        
		// Perform the login operation first
		await performLoginPulse(page);
        
		// Select Pulse App
		await pulseAppPage.clickOnPulseApp();
        
		// Search for Test Account
		await pulseDashboardPage.searchGlobalSearchBox("TestAutomation01 TestQA01");
		await expect(pulseContactsPage.contactInformationHeader).toBeVisible;
        
		// Validate Profile fields First & Last, Preferred First Name, Address
		await pulseContactsPage.contactInformationSection.click();
		await actionUtils.scrollToElement(pulseContactsPage.firstNameText);
		await pulseContactsPage.assertAddressComponent("TestAutomation01",pulseContactsPage.firstNameText);
		await actionUtils.scrollToElement(pulseContactsPage.lastNameText);
		await pulseContactsPage.assertAddressComponent("TestQA01",pulseContactsPage.lastNameText);
        
		// Update First Name
		await pulseContactsPage.updateFirstNameInput("01AutomationTest");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
		await pulseContactsPage.assertAddressComponent("01AutomationTest",pulseContactsPage.firstNameText);

		// Update Last Name
		await pulseContactsPage.updateLastNameInput("01TestQA");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
		await pulseContactsPage.assertAddressComponent("01TestQA",pulseContactsPage.lastNameText);
        
		// Fill Preferred Name
		await pulseContactsPage.updatePreferredNameInput("Fill Preferred Name");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
		await pulseContactsPage.assertAddressComponent("Fill Preferred Name",pulseContactsPage.preferredNameText);
        
		// Fill Address
		await actionUtils.scrollToElement(pulseContactsPage.currentStreet1Selector);
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentStreet1Selector,"123 Med Sol Drive");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
		await pulseContactsPage.assertAddressComponent("123 Med Sol Drive",pulseContactsPage.currentStreet1Selector);
		await actionUtils.scrollToElement(pulseContactsPage.currentCity1Selector);
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentCity1Selector,"Lincoln");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
		await pulseContactsPage.assertAddressComponent("Lincoln",pulseContactsPage.currentCity1Selector);
		await pulseContactsPage.selectState("NE");
		await actionUtils.selectStateDropdown("Nebraska");
		await pulseContactsPage.updateZip("68116");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
	});
    
	test("Validate CWA data",async ({page}) => {
        
		// Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
		const personalInfoPage = new PersonalInfoPage(page);
		const actionUtils = new ActionsUtils(page);

		// Perform the login operation first
		await performLoginCiroClinician(page);

		// Select Personal Info Link
		await personalInfoPage.personalInfoLink.click();
        
		// Validate Preferred First Name
		await personalInfoPage.assertAddressComponent("Fill Preferred Name",personalInfoPage.fillPreferredFirstName);
        
		// Current Address - Address Line 1
		await actionUtils.scrollToElement(personalInfoPage.fillInfoCurrentAddress1);
		await personalInfoPage.assertAddressComponent("123 Med Sol Drive",personalInfoPage.fillInfoCurrentAddress1);
        
		// Current Address - City
		await personalInfoPage.assertAddressComponent("Lincoln",personalInfoPage.fillInfoCurrentAddressCity);
        
		// Current Address - Zip
		await personalInfoPage.assertAddressComponent("68116",personalInfoPage.fillInfoCurrentAddressPostalCode);
	});

	test("Clean Pulse data",async ({page}) => {

		// Create an instance of the PersonalInfoPage class, passing the 'page' object to the constructor
		const pulseAppPage = new AppsPage(page);
		const pulseDashboardPage = new DashboardsPage(page);
		const pulseContactsPage = new ContactsPage(page);
		const actionUtils = new ActionsUtils(page);

		// Perform the login operation first
		await performLoginPulse(page);

		// Select Pulse App
		await pulseAppPage.clickOnPulseApp();

		// Search for Test Account
		await pulseDashboardPage.searchGlobalSearchBox("TestAutomation01 TestQA01");
		await expect(pulseContactsPage.contactInformationHeader).toBeVisible;

		// Update First Name
		await pulseContactsPage.updateFirstNameInput("TestAutomation01");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
		await pulseContactsPage.assertAddressComponent("TestAutomation01",pulseContactsPage.firstNameText);

		// Update Last Name
		await pulseContactsPage.updateLastNameInput("TestQA01");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
		await pulseContactsPage.assertAddressComponent("TestQA01",pulseContactsPage.lastNameText);

		// Fill Preferred Name
		await pulseContactsPage.updatePreferredNameInput("");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);

		// Fill Address
		await actionUtils.scrollToElement(pulseContactsPage.currentStreet1Selector);
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentStreet1Selector,"");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);
        
		await actionUtils.scrollToElement(pulseContactsPage.currentCity1Selector);
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentCity1Selector,"");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);

		// Current State
		await actionUtils.scrollToElement(pulseContactsPage.currentState1Selector);
		await pulseContactsPage.currentState.click();
		await pulseContactsPage.deleteState.click();
		await pulseContactsPage.fillInAddressComponent(pulseContactsPage.currentZipCode1Selector,"");
		await page.keyboard.press("Control+s");
		await page.waitForTimeout(1000);

	});
});