// @ts-check
import {test} from '@playwright/test';
import {performLoginCiroClinicianDefaultUser} from "../../../../testBase";

test('User logs into Web App',async ({page}) => {

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);
    
})