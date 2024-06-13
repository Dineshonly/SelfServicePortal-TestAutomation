import {test} from "@playwright/test";
import {AppsPage} from "../../pages/pulse/appsPage";
import {ContactsPage} from "../../pages/pulse/customers/contacts/contactsPage";
import getNextCounter from "../../utils/counterUtils";
import {performLoginPulse} from "../../../testBase";

test('Create New User in Pulse', async ({ page }) => {

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
    await page.waitForTimeout(5000);
});

