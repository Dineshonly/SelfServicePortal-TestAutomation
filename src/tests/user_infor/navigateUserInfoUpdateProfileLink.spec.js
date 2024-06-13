// @ts-check
import {test} from '@playwright/test';
import {User_InfoPage} from "../../pages/user_Info/user_infoPage";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194132] CWA Navigation-User Info-Navigate to the Update Profile Link @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {
    
    // Create an instance of the 'page' object to the constructor
    const userInfoPage = new User_InfoPage(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);
    
    // Verify Option: update Profile & Logout Navigate to Personal Info Page
    await userInfoPage.clickKababMenuUrlValidation();
})