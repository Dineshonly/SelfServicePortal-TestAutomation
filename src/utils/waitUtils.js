class WaitUtils {
    constructor(page) {
        this.page = page;
    }

    /**
     * waitUtils.js
     *
     * Utility functions to improve waiting mechanisms in Playwright tests.
     */

    /**
     * Waits for an element to be visible on the page.
     *
     * @param {String} selector - The CSS selector of the element.
     * @param {Number} [timeout=3000] - Time in milliseconds to wait before timing out.
     */
    async waitForElementVisible(selector, timeout = 3000) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
    }

    /**
     * Waits for an API response.
     *
     * @param {String} urlPattern - A part of the URL to match.
     * @param {Number} [timeout=3000] - Time in milliseconds to wait before timing out.
     */
    async waitForApiResponse(urlPattern, timeout = 3000) {
        await this.page.waitForResponse(response => response.url().includes(urlPattern), { timeout });
    }

    /**
     * Waits for an element to be clickable.
     *
     * @param {String} selector - The CSS selector of the element.
     * @param {Number} [timeout=3000] - Time in milliseconds to wait before timing out.
     */
    async waitForElementClickable(selector, timeout = 3000) {
        await this.page.waitForSelector(selector, { state: 'visible', timeout });
        await this.page.waitForSelector(selector, { state: 'enabled', timeout });
    }

}

export {WaitUtils};