// @ts-check
import {test} from "@playwright/test";
import {Pay_BenefitsPage} from "../../pages/pay_benefits/pay_benefitsPage";
import {LoginPage} from "../../pages/login/loginPage";
import {BasePage} from "../../pages/login/basePage";
import {getConfig} from "../../../config";

test('[157746] Using the Pay & Benefits page, click on the benefits links to validate the connection to UKG @smoke-prod-default',async ({page}) => {

    // Create an instance of the Employment Documents class, passing the 'page' object to the constructor
    const payBenefitsPage = new Pay_BenefitsPage(page);
    const loginPage = new LoginPage(page);
    const basePage = new BasePage(page);

    // Retrieve configuration data for the base URL and login credentials
    const {baseUrl, usernameUKG, passwordUKG} = getConfig('ciroClinician');

    // Navigate to the base URL
    await page.goto(baseUrl);

    // Wait for the page to load
    await basePage.waitForPageLoad();
    
    // Use Prod User and Pass only
    await loginPage.enterCredentials(usernameUKG,passwordUKG)
    await loginPage.clickSubmit();

    // Select Pay Benefits Link
    await payBenefitsPage.payBenefitsLink.click();

    // Click in Elect or View
    await payBenefitsPage.clickElement(payBenefitsPage.benefitsViewLink);

    // UKG Traveler Benefits
    await payBenefitsPage.openTravelerBenefits();
})