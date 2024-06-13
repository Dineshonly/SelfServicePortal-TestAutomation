// @ts-check
import {test, expect} from "@playwright/test";
import {AssignmentsPage} from "../../pages/assignments/assignmentsPage";
import AssertUtils from "../../utils/assertUtils";
import {performLoginCiroClinicianDefaultUser} from "../../../testBase";

test('[194171] CWA Navigation-Assignments @smoke-prod-default @smoke-uat-default @smoke-qa-default',async ({page}) => {

    // Create an instance of the Job Search Page class, passing the 'page' object to the constructor
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Create an instance of the Job Search Page class, passing the 'page' object to the constructor
    const assignmentsPage = new AssignmentsPage(page);

    // Select Assignments Link
    await assignmentsPage.assignmentsLink.click();
    await assignmentsPage.waitForBreadcrumbAssignments();
    await expect(assignmentsPage.assignmentsLinkHeader).toBeVisible();

    // Validate the "Assignments" element
    await assertUtils.validateCurrentCrumb("Assignments");
});