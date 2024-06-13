import {test, expect} from "playwright/test";
import {CiroCreateAccountPage} from "../../pages/ciroCreateAccount/ciroCreateAccountPage";
import {loadLoginPageCiroClinician} from "../../../testBase";
import userData from '../../../userData.json';

test('Create New User in Ciro',async ({page}) => {
    
    // Create instances of the ciroCreateAccountPage class
    const ciroCreateAccountPage = new CiroCreateAccountPage(page);
    
    // Load Ciro Website
    await loadLoginPageCiroClinician(page);
    
    // Click on Create Account Link
    await ciroCreateAccountPage.createAccountLink.click();
    
    // Validate Create Account header
    await expect(ciroCreateAccountPage.createAccountLinkHeader).toBeVisible();
    
    // Enter data
    await ciroCreateAccountPage.ciroCreateAccount(userData.email,userData.password,userData.firstName,userData.lastName);
    await page.waitForTimeout(2000);
    await expect(ciroCreateAccountPage.verificationEmailSent).toBeVisible;
    await page.waitForTimeout(2000);
})