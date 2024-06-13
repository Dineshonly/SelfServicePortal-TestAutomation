// @ts-check
import {test} from '@playwright/test';
import {App_footer_functionalityPage} from "../../pages/app_footer_functionality/app_footer_functionalityPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";
import {HomePage} from "../../pages/profile/homePage";

test('[111047] CWA: App Footer Functionality: I can view Tik Tok icon & I can open Medical Tik Tok Page in new tab. @smoke-prod-default @smoke-uat-default @smoke-qa-default', async ({page}) => {

    // Create an instance of the User_InfoPage class, passing the 'page' object to the constructor
    const stayInTouchWithUsPage = new App_footer_functionalityPage(page);
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Wait for Breadcrumb
    await homePage.waitForBreadcrumbHome();

    // Click on TikTok icon
    await stayInTouchWithUsPage.clickTikTokAndValidateUrl();
});