// @ts-check
import {test, expect} from "@playwright/test";
import {TravelerPolicyPage} from "../../pages/helpful_information/travelerpolicyPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[228921] CWA: Helpful Info-Traveler Policies: I can view "Traveler Policies" opens in new tab. @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Create an instance of the Traveler Policy Page class, passing the 'page' object to the constructor
    const travelerPolicyPage = new TravelerPolicyPage(page);

    // Select a Mental Health Resources link
    const page1Promise = page.waitForEvent('popup');
    await travelerPolicyPage.travelerPolicyLink.click();
    const page1 = await page1Promise;
    await page.waitForTimeout(1000);
    await expect(page1.getByRole('heading', { name: 'Clinician Policy' })).toBeVisible();
    await page1.close(); 
})