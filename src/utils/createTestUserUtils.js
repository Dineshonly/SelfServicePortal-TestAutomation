import {AppsPage} from "../pages/pulse/appsPage";
import {ContactsPage} from "../pages/pulse/customers/contacts/contactsPage";
import {loadLoginPageCiroClinician, performLoginPulse} from "../../testBase";
import getNextCounter from "./counterUtils";
import {CiroCreateAccountPage} from "../pages/ciroCreateAccount/ciroCreateAccountPage";
import {expect} from "playwright/test";
import {clickRegistrationActivationLink} from "./emailServiceUtils";
import userData from "../../userData.json";


async function createPulseAccount(page) {
    // Step 1: Initialize page objects
    // Create instances of the AppsPage and ContactsPage classes,
    // passing the 'page' object to their constructors
    const pulseAppPage = new AppsPage(page);
    const pulseContactsPage = new ContactsPage(page);

    // Step 2: Log in to the Pulse application
    await performLoginPulse(page);

    // Step 3: Generate unique identifiers
    // Get a unique counter value for creating unique user data
    const uniqueCounter = getNextCounter();

    // Step 4: Navigate to Pulse app
    await pulseAppPage.clickOnPulseApp();

    // Step 5: Create a new contact
    await pulseContactsPage.selectNewContactTravel();

    // Create shareable method for unique user registration
    pulseContactsPage.registerUniqueUser(pulseContactsPage,uniqueCounter);

    // Choose CC
    await page.waitForTimeout(5000);
    await pulseContactsPage.selectRecentCareerConsultants();

    // Step 6: Save the contact
    await page.keyboard.press('Control+s');

    // Wait for the save action to complete
    await page.waitForTimeout(5000);
    await pulseContactsPage.sendingPortalInviteButton.click();
    await page.waitForTimeout(8000);

    // Wait for modal
    try {
        const isButtonVisible = await pulseContactsPage.isErrorOkButtonVisible();
        console.log('Is the OK button visible:', isButtonVisible);
    } catch (error) {
        console.log('Modal &  button not showing');
    }
}

async function createCiroAccount(page) {
    // Create instances of the ciroCreateAccountPage class
    const ciroCreateAccountPage = new CiroCreateAccountPage(page);

    // Load Ciro Website
    await loadLoginPageCiroClinician(page);

    // Click on Create Account Link
    await ciroCreateAccountPage.createAccountLink.click();

    // Validate Create Account header
    await expect(ciroCreateAccountPage.createAccountLinkHeader).toBeVisible();

    // Enter data
    await ciroCreateAccountPage.ciroCreateAccount(userData.email,userData.password,userData.firstName,userData.lastName);
    await page.waitForTimeout(2000);
    await expect(ciroCreateAccountPage.verificationEmailSent).toBeVisible;
    await page.waitForTimeout(2000);
}

async function activationLink(){
    await clickRegistrationActivationLink(userData.email);
}

export async function setupTestUser(){
    const accountDetails = await createPulseAccount();
    await createCiroAccount();
    await activationLink();
    return accountDetails;
}

export {
    createPulseAccount,
    createCiroAccount,
    activationLink
}