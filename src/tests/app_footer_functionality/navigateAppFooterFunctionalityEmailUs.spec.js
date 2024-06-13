// @ts-check
import {test, expect} from "@playwright/test";
import {App_footer_functionalityPage} from "../../pages/app_footer_functionality/app_footer_functionalityPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194181] CWA Navigation-App Footer Functionality-Email Us @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {

    // Create an instance of the User_InfoPage class, passing the 'page' object to the constructor
    const stayInTouchWithUsPage = new App_footer_functionalityPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Validate the Email Us link href
    const emailUsLinkHref = await stayInTouchWithUsPage.getEmailUsLinkHref();
    expect(emailUsLinkHref).toBe('mailto:info@medicalsolutions.com');
})