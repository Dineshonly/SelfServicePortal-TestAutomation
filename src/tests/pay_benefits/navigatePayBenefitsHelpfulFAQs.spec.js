// @ts-check
import {test, expect} from "@playwright/test";
import {Pay_BenefitsPage} from "../../pages/pay_benefits/pay_benefitsPage";
import {FAQsPage} from "../../pages/helpful_information/faqsPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";
test('[223015] CWA Navigation-Pay & Benefits Page -- Helpful FAQs @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
    const payBenefitsPage = new Pay_BenefitsPage(page);
    const faqsPage = new FAQsPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select a Pay & Benefits link
    await payBenefitsPage.payBenefitsLink.click();
    
    // Validate header
    await expect(payBenefitsPage.payBenefitsLinkHeader).toBeVisible();

    // Validate the "Pay & Benefits" element
    await assertUtils.validateCurrentCrumb("Pay & Benefits");
   
    // Check FAQ
    await payBenefitsPage.helpfulFaqsLink.click();
    await expect(faqsPage.faqsLinkHeader).toBeVisible();
})