// @ts-check
import {test} from '@playwright/test';
import {User_InfoPage} from "../../pages/user_Info/user_infoPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[242425] CWA Navigation-User Info-Navigate to the Profile Strength Link @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the 'page' object to the constructor
    const userInfoPage = new User_InfoPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);
    
    // Verify Option: Navigate to the Profile Strength
    await userInfoPage.clickProfileStrength();
})