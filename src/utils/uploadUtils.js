class UploadUtils {
    constructor(page) {
        this.page = page;
    }

    async uploadFile(filePath, inputSelector) {
        // Wait for the file input element to appear on the page.
        const inputElement = await this.page.waitForSelector(inputSelector);

        // Use Playwright's setInputFiles method to set the value of the file input element.
        await inputElement.setInputFiles(filePath);
    }
}

export default UploadUtils;