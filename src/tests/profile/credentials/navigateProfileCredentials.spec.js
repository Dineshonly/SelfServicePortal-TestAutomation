// @ts-check
import {test, expect} from "@playwright/test";
import {CredentialsPage} from "../../../pages/profile/credentialsPage";
import {performLoginCiroClinician} from "../../../../testBase";
import AssertUtils from "../../../utils/assertUtils";


test("[194162] CWA Navigation-Profile-Credentials @smoke-qa-new-user",async ({page}) => {

	// Create an instance of the ReferencesPage class, passing the 'page' object to the constructor
	const credentialsPage = new CredentialsPage(page);
	const assertUtils = new AssertUtils(page);

	// Perform the login operation first
	await performLoginCiroClinician(page);

	// Select Credentials Link
	await credentialsPage.credentialsPageLink.click();

	// Validate the "Credentials" breadcrumb
	await assertUtils.validateCurrentCrumb("Credentials");

	// validate Credentials header
	await expect(credentialsPage.credentialsPageLinkHeader).toBeVisible();

	// validate active licenses header and Add License button
	await expect(credentialsPage.activeLicensesText).toBeVisible();
	await expect(credentialsPage.addLicensesButton).toBeVisible();
    
	// Certifications tab
	await credentialsPage.activeCertificationsTab.click();
	await expect(credentialsPage.certificationsText).toBeVisible();
	await expect(credentialsPage.addCertificationsButton).toBeVisible();
});