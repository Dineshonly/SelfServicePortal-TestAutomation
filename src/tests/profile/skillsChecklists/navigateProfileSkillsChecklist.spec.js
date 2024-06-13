// @ts-check
import {test, expect} from '@playwright/test';
import {SkillsChecklistsPage} from "../../../pages/profile/skillschecklistsPage";
import {performLoginCiroClinicianDefaultUser} from "../../../../testBase";
import AssertUtils from "../../../utils/assertUtils";

test('[194164] CWA: Navigate Profile Skills Checklist @smoke-prod-default @smoke-uat-default @smoke-qa-default', async ({page}) => {

    // Create an instance of the Skill Checklists class, passing the 'page' object to the constructor
    const skillsChecklistsPage = new SkillsChecklistsPage(page);
    const assertUtils = new AssertUtils(page);

    // Perform the login operation first
    await performLoginCiroClinicianDefaultUser(page);

    // Select skills Checklists Link
    await skillsChecklistsPage.skillsChecklistsLink.waitFor();
    await skillsChecklistsPage.skillsChecklistsLink.click();

    // Assert Url
    await skillsChecklistsPage.SkillsChecklistsClickVerifyUrl();

    // Assert header displays
    await expect(skillsChecklistsPage.skillsChecklistsLinkHeader).toBeVisible();

    // Validate the breadcrumb
    await assertUtils.validateCurrentCrumb('Skills Checklist');

    // Assert Search bar displays
    await expect(skillsChecklistsPage.searchBar).toBeVisible();

    // Assert Acute Rehab Rn
    await expect(skillsChecklistsPage.acuteRehabRnCard).toBeVisible();
    await expect(skillsChecklistsPage.acuteRehabRnText).toBeVisible();
});