// @ts-check
import {test, expect} from "@playwright/test";
import {TimesheetsPage} from "../../pages/pay_benefits/timesheetsPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194168] CWA Navigation-Pay & Benefits-Timesheets @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {

    // Create an instance of the Page class, passing the 'page' object to the constructor
    const timesheetsPage = new TimesheetsPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select Timesheets link
    await timesheetsPage.timesheetsLink.click();
    await expect(timesheetsPage.timesheetsLinkHeader).toBeVisible();

    // Validate the "Timesheets" element
    await assertUtils.validateCurrentCrumb("Timesheets");
})