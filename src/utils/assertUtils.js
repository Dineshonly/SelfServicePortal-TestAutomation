// assertUtils.js

const {strictEqual} = require("assert");

class AssertUtils {
    
    constructor(page) {
        this.page = page;
    }
    async validateCurrentCrumb(expectedText) {
        // Find the current-crumb element and extract the text content
        const currentCrumb = await this.page.$("span.current-crumb");

        // Check if the element was found before accessing its innerText
        if (currentCrumb === null) {
            console.error('Element with class "current-crumb" not found on the page.');
            // You can choose to throw an error or return, depending on how you want to handle this scenario.
            return;
        }

        const actualText = await currentCrumb.innerText();

        // Use an assertion to compare the text content with the expected text
        strictEqual(actualText.trim(), expectedText, `Validation Failed: Expected "${expectedText}" but got "${actualText}"`);
        console.log(`Validation Passed: Expected "${expectedText}" - Actual "${actualText}"`);
    }


    async validateButtonText(buttonElement, expectedText) {
        const actualText = await buttonElement.innerText();
        strictEqual(
            actualText.trim(),
            expectedText,
            `Validation Failed: Expected "${expectedText}" but got "${actualText}"`
        );
        console.log(`Validation Passed: Expected "${expectedText}" - Actual "${actualText}"`);
    }   
    
    
}

export default AssertUtils;