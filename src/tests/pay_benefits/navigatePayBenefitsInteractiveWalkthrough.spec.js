// @ts-check
import {test, expect} from "@playwright/test";
import {Pay_BenefitsPage} from "../../pages/pay_benefits/pay_benefitsPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";
test('[223016] CWA Navigation-Pay & Benefits Page -- Interactive Walkthrough @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
    const payBenefitsPage = new Pay_BenefitsPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select a Pay & Benefits link
    await payBenefitsPage.payBenefitsLink.waitFor();
    await payBenefitsPage.payBenefitsLink.click();
    
    // Validate header
    await payBenefitsPage.payBenefitsLinkHeader.waitFor();
    await expect(payBenefitsPage.payBenefitsLinkHeader).toBeVisible();

    // Validate the "Pay & Benefits" element
    await assertUtils.validateCurrentCrumb("Pay & Benefits");
          
    // Interactive walkthrough links
    const page1Promise = page.waitForEvent('popup');
    await payBenefitsPage.interactiveWalkthroughLink.click();
    const page1 = await page1Promise;
    await page.waitForTimeout(1000);
    await expect(page1.getByText('Traveler\'s Guide to UKG')).toBeVisible();
    await page.waitForTimeout(1000);
    await page1.close();    
})