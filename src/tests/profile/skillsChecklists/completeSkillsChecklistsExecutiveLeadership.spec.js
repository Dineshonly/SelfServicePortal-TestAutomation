// @ts-check
import {test,expect} from "@playwright/test";
import {SkillsChecklistsPage} from "../../../pages/profile/skillschecklistsPage";
import {performLoginCiroClinician} from "../../../../testBase";
import {HomePage} from "../../../pages/profile/homePage";

test('[157743] CWA: Complete a Skills Checklist card - Executive Leadership @smoke-prod-new-user @smoke-uat-new-user @smoke-qa-new-user',async ({page}) => {
    
    // Create an instance of the Skill Checklists class, passing the 'page' object to the constructor
    const homePage = new HomePage(page);
    const skillsChecklistsPage = new SkillsChecklistsPage(page);

    // Perform the login operation first
    await performLoginCiroClinician(page);

    // Select skills Checklists Link
    await skillsChecklistsPage.skillsChecklistsLink.waitFor();
    await skillsChecklistsPage.skillsChecklistsLink.click();
    
    // Assert Url
    await skillsChecklistsPage.SkillsChecklistsClickVerifyUrl();

    // Search for Executive Leadership
    await skillsChecklistsPage.searchBar.waitFor();
    await skillsChecklistsPage.searchBar.fill('Executive Leadership');

    // Select Executive Leadership task card
    await Promise.all([
    await skillsChecklistsPage.SkillsChecklistsExecutiveLeadershipUrl(),
    await page.waitForSelector(skillsChecklistsPage.executiveLeadershipHeader),
    ])

    // Random select radio buttons
    await page.waitForTimeout(2000);
    await skillsChecklistsPage.selectRandomRadioButton(page);

    // Save Skill Checklist
    await skillsChecklistsPage.submitDoneButton.click();
    await page.waitForTimeout(5000);

    // Search for Executive Leadership
    await skillsChecklistsPage.searchBar.fill('Executive Leadership');

    // Validate Skill Checklist Task Card does not display
    await homePage.homePageLink.click();
    await page.reload();
    await expect(homePage.skillsChecklist).toBeHidden();
})