// @ts-check
import {test, expect} from "@playwright/test";
import {TravelerPolicyPage} from "../../pages/helpful_information/travelerpolicyPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";
import {HomePage} from "../../pages/profile/homePage";

test('[131637] CWA Navigation-Helpful Information-Traveler Policy: I can view "Traveler Policies" link under "Helpful Information" @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Create an instance of the Page class, passing the 'page' object to the constructor
    const travelerPolicyPage = new TravelerPolicyPage(page);
    const homePage = new HomePage(page);

    // Wait for Breadcrumb
    await homePage.waitForBreadcrumbHome();

    //Validate Traveler Policy Link.
    await travelerPolicyPage.travelerPolicyLink.waitFor();
    await expect(travelerPolicyPage.travelerPolicyLink).toBeVisible();
})