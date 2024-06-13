// @ts-check
import {test, expect} from "@playwright/test";
import {FAQsPage} from "../../pages/helpful_information/faqsPage";
import {HomePage} from "../../pages/profile/homePage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[113798] CWA Navigation-Helpful Information-FAQs: I can view the "FAQS" button under "Helpful Information" @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the FAQsPage Page class, passing the 'page' object to the constructor
    const faqsPage = new FAQsPage(page);
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Wait for Breadcrumb
    await homePage.waitForBreadcrumbHome();
    
    //Validate Mental Health Link.
    await faqsPage.faqsLink.waitFor();
    await expect(faqsPage.faqsLink).toBeVisible();
})