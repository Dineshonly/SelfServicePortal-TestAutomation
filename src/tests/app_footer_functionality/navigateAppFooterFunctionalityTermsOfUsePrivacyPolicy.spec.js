// @ts-check
import {test} from "@playwright/test";
import {App_footer_functionalityPage} from "../../pages/app_footer_functionality/app_footer_functionalityPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194183] CWA Navigation-Terms of Use and Privacy Policy @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {

    // Create an instance of the User_InfoPage class, passing the 'page' object to the constructor
    const stayInTouchWithUsPage = new App_footer_functionalityPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Click Terms of Use
    await stayInTouchWithUsPage.clickTermsOfUse();

    // Click Privacy Policy
    await stayInTouchWithUsPage.clickPrivacyPolicy();
})