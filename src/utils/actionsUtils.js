// actionsUtils.js

class ActionsUtils {
	constructor(page) {
		this.page = page;
	}

	async scrollToElement(elementLocator) {
		if (typeof elementLocator === "string") {
			// If the element locator is a string, assume it's a CSS selector
			const element = await this.page.locator(elementLocator);
			await element.scrollIntoViewIfNeeded();
		} else if (elementLocator instanceof Object && elementLocator.locator) {
			// If the element locator is an object with a "locator" property, assume it's a Playwright Locator
			await elementLocator.scrollIntoViewIfNeeded();
		} else {
			throw new Error("Invalid element locator format");
		}
	}

	// Method to click an element and then select an option based on its text
	async clickAndSelect(elementLocator, optionValue) {
		// Locate the element to be clicked
		const element = await this.page.locator(elementLocator);
		await element.click(); // Click the element

		// Locate the option by combining tag and text
		const option = await this.page.locator(`//div[contains(text(),'${optionValue}')]`);
		await option.click();
	}

	async selectCertificationTypeFromDropdown(optionValue) {
		await this.page.getByTestId('certification-type').click();

		// Locate the option by combining tag and text
		const option = await this.page.getByRole('option', { name: `${optionValue}`, exact: true });
		await option.click();
	}

	async selectOptionFromDropdownTestId(optionValue) {
		await this.page.getByTestId('state-license').click();

		// Locate the option by combining tag and text
		const option = await this.page.getByRole(`option`, { name: `${optionValue}` });
		await option.click();
	}

	async clickAndSelectDropDownState(optionValue) {
		// Click the element
		await this.page.getByText("State", { exact: true }).click();

		// Locate the option by combining tag and text
		const option = await this.page.getByText(`${optionValue}`, { exact: true });
		await option.click();
	}

	async clickAndSelectDropDownPreferredContact(optionValue) {
		// Click the element
		await this.page.getByText("Preferred Method of Contact").click();

		// Locate the option by combining tag and text
		const option = await this.page.getByText(`${optionValue}`, { exact: true });
		await option.click();
	}

	async clickAndSelectDropDownCertifications(optionValue) {
		// Click the element
		await this.page.locator("#certifications").getByText("Certifications").click();

		// Locate the option by combining tag and text
		const option = await this.page.getByText(`${optionValue}`, { exact: true });
		await option.click();
	}
	async clickAndSelectDropDownPreferredShift(optionValue) {
		// Click the element
		await this.page.getByText("Preferred Shift").click();

		// Locate the option by combining tag and text
		const option = await this.page.getByText(`${optionValue}`, { exact: true });
		await option.click();
	}

	async clickAndSelectCertification(elementObject, certValue) {
		// Click the element (elementLocator is already a locator object)
		await elementObject.click();

		// Locate the option by combining tag and text
		const option = await this.page.getByText(`${certValue}`, { exact: true });
		await option.click();
	}


	// Method to click an element and then select an option based on its text
	async clickAndSelectStateFacility(elementLocator, stateValue) {
		// Locate the element to be clicked
		const element = await this.page.locator(elementLocator);
		await element.click(); // Click the element

		// Locate the option by combining tag and text
		const option = await this.page.getByLabel("Modal").getByText(`${stateValue}`);
		await option.click();
	}

	// Method to click an element and then select an option based on its text
	async clickAndSelectChartingSkills(elementLocator, skillValue) {
		// Locate the element to be clicked
		const element = await this.page.locator(elementLocator);
		await element.click(); // Click the element

		// Locate the option by combining tag and text
		const option = await this.page.getByText(`${skillValue}`, { exact: true });
		await option.click();
	}
    
	// Method to click an element and then select an option based on its text
	async clickAndSelectStateLicense(elementLocator, stateValue) {
		// Locate the element to be clicked
		const element = await this.page.locator(elementLocator);
		await element.click(); // Click the element

		// Locate the option by combining tag and text
		const option = await this.page.getByLabel("Education").getByText(`${stateValue}`, { exact: true });
		await option.click();
	}
	async clickAndSelectByLabel(elementLocator, optionValue) {
		// Locate the element to be clicked
		const element = await this.page.locator(elementLocator);
		await element.click(); // Click the element

		// Locate the option by combining tag and text
		const option = await this.page.getByLabel("Preferences", { exact: true }).getByText(`${optionValue}`);
		await option.click();
	}    
	async selectStateDropdown(stateValue){
		await  this.page.getByText(`${stateValue}`).click();
	}
	async clickAndSelectJobTitle(jobTitleDropdown, jobTitleValue) {
		// Click the element (elementLocator is already a locator object)
		const element = await this.page.locator(jobTitleDropdown);
		await element.click();

		// Locate the option by combining tag and text
		const option = await this.page.getByText(`${jobTitleValue}`, { exact: true });
		await option.click();
	}

	static async reloadPageMultipleTimes(page, times) {
		for (let i = 0; i < times; i++) {
			await page.reload();
			// Optional: Add a wait time between reloads if needed
			await page.waitForTimeout(1000); // wait for 1 second, for example
		}
	}

	static async extractStatusDate(page, testId) {
		const currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0); // Resetting time part for accurate comparison

		const potentialElements = page.getByTestId(testId);
		const elementCount = await potentialElements.count();

		if (elementCount === 0) {
			throw new Error("Status element not found");
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

		throw new Error("Status element with the correct date format not found");
	}

	async clickWithRetry(selector, retries = 3){
		for (let i = 0; i < retries; i++) {
			try {
				await this.page.click(selector);
				return; // Click successful, exit the loop
			} catch (error) {
				console.log(`Click failed. Retrying... Attempt ${i + 1}/${retries}`);
			}
		}
		throw new Error(`Unable to click element ${selector} after ${retries} attempts.`);
	}


}

export default ActionsUtils;