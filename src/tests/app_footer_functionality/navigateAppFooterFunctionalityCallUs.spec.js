// @ts-check
import {test, expect} from "@playwright/test";
import {App_footer_functionalityPage} from "../../pages/app_footer_functionality/app_footer_functionalityPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194182] CWA Navigation-App Footer Functionality-Call Us @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {

    // Create an instance of the User_InfoPage class, passing the 'page' object to the constructor
    const stayInTouchWithUsPage = new App_footer_functionalityPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);
    
    // Validate the Call Us link href
    const callUsLinkHref = await stayInTouchWithUsPage.getCallUsLinkHref();
    expect(callUsLinkHref).toBe('tel:1.866.633.3548');
})