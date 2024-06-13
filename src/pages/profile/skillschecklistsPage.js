import {expect} from "@playwright/test";

class SkillsChecklistsPage {

    constructor(page) {
        this.page = page;
        this.skillsChecklistsLink = page.getByRole('link',{name:'Skills Checklist'});
        this.skillsChecklistsLinkHeader = page.locator('h2',{hasText:'Skills Checklists'});
        this.searchBar = page.locator('xpath=//input[@placeholder=\'Search\']');
        this.acuteRehabRnCard = page.getByTestId('task-card-acute-rehab-rn');
        this.acuteRehabRnText = page.locator('xpath=//span[text()=\'Acute Rehab RN\']');
        this.executiveLeadershipTaskCard = page.getByTestId('task-card-executive-leadership');
        this.submitDoneButton = page.getByRole('button',{name:'Submit, I\'m Done'});
        this.executiveLeadershipHeader = 'xpath=//h1[contains(text(),\'Executive Leadership\')]';

    }
    
    // Functions/Methods
    async SkillsChecklistsClickVerifyUrl() {
        await this.skillsChecklistsLink.click();
        const skillsChecklists = this.page.locator('h2',{hasText:'Skills Checklists'});
        await skillsChecklists.waitFor();
        const expectedEndOfURL = '/skills';
        const currentURL = await this.page.url();
        console.log("Current URL:", currentURL);
        expect(currentURL.endsWith(expectedEndOfURL)).toBe(true);
    }

    async SkillsChecklistsExecutiveLeadershipUrl() {
        await this.executiveLeadershipTaskCard.click();
        await this.page.waitForTimeout(1000);
        const expectedEndOfURL = '/skills';
        const currentURL = await this.page.url();
        console.log("Current URL:", currentURL);
        expect(currentURL.endsWith(expectedEndOfURL)).toBe(true);
    }

    async selectRandomRadioButton(page) {
        // Array of locators for each number
        const locators = [
            'label',
            'span:nth-child(2) > label',
            'span:nth-child(3) > label',
            'span:nth-child(4) > label'
        ];

        // Find all the groups of radio buttons
        const radioButtonGroups = await page.$$('.checklist_input_div_inline');

        // Iterate over each group
        for (const group of radioButtonGroups) {
            // Generate a random index based on the locator array
            const randomIndex = Math.floor(Math.random() * locators.length);

            // Find and click the radio button with the randomly selected locator within the group
            const radioButton = await group.$(locators[randomIndex]);
            if (radioButton) {
                await radioButton.click();
            }
        }
    }

    /**
     * Extracts the date from the status element on the page.
     * @returns {Promise<string|null>} The extracted date or null if not found.
     * @throws {Error} If the status element with the specific pattern is not found.
     */
    async extractStatusDate(testId) {
        const currentDate = new Date();
        currentDate.setHours(0, 0, 0, 0); // Resetting time part for accurate comparison

        const potentialElements = this.page.getByTestId(testId);
        const elementCount = await potentialElements.count();

        if (elementCount === 0) {
            throw new Error('Status element not found');
        }

        for (let i = 0; i < elementCount; i++) {
            const element = potentialElements.nth(i);
            const text = await element.textContent();
            const dateRegex = /Completed:\s*(\d{2}\/\d{2}\/\d{4})/;
            const dateMatch = text.match(dateRegex);

            if (dateMatch) {
                const extractedDate = new Date(dateMatch[1]);
                extractedDate.setHours(0, 0, 0, 0); // Resetting time part

                if (extractedDate.getTime() === currentDate.getTime()) {
                    return "The extracted date is today.";
                } else if (extractedDate.getTime() < currentDate.getTime()) {
                    return "The extracted date is in the past.";
                } else {
                    return "The extracted date is in the future.";
                }
            }
        }

        throw new Error('Status element with the correct date format not found');
    }

}

export {SkillsChecklistsPage};