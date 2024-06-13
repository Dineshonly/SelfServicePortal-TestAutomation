// @ts-check
import {test, expect} from "@playwright/test";
import {LoyaltyPage} from "../../pages/perks/loyaltyPage.js";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";
import AssertUtils from "../../utils/assertUtils";

test('[228931] CWA Navigation to Loyalty Page @smoke-qa-default',async ({page}) => {

    // Create an instance of the Rewards Page class, passing the 'page' object to the constructor
    const loyaltyPage = new LoyaltyPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select a Loyalty Page link
    await loyaltyPage.loyaltyPageLink.click();
    await expect(loyaltyPage.loyaltyPageLinkHeader).toBeVisible();

    // Validate the "Loyalty" breadcrumb
    await assertUtils.validateCurrentCrumb("Loyalty");
})