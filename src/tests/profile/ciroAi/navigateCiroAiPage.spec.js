import {test} from '@playwright/test';
import {CiroAiPage} from "../../../pages/profile/ciroAiPage"
import {performLoginCiroClinicianDefaultUser} from "../../../../testBase";

test('Navigate to Ciro Ai', async ({page}) => {

    // Create an instance of the 'page' object to the constructor
    const ciroAiPage = new CiroAiPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Click on Ask Anything
    await ciroAiPage.clickOnCiroAi();

    //await page.pause();

});