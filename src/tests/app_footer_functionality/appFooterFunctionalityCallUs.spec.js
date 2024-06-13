// @ts-check
import {test} from '@playwright/test';
import {App_footer_functionalityPage} from "../../pages/app_footer_functionality/app_footer_functionalityPage";
import {HomePage} from "../../pages/profile/homePage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[229633] CWA: App Footer Functionality: I can view Call Us & I can click on Call Us @smoke-prod-default @smoke-uat-default @smoke-qa-default', async ({page}) => {

    // Create an instance of the User_InfoPage class, passing the 'page' object to the constructor
    const stayInTouchWithUsPage = new App_footer_functionalityPage(page);
    const homePage = new HomePage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Wait for Breadcrumb
    await homePage.waitForBreadcrumbHome();

    // Check on Call Us icon
    await stayInTouchWithUsPage.checkForCallUsIcon();

    // Click on Call Us Icon
    await stayInTouchWithUsPage.checkTelAssert();
});