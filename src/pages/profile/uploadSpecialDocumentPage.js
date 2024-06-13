class UploadSpecialDocumentPage{
    
    constructor(page) {
        this.page = page;
        this.enterDescription = page.locator('#description');
        this.uploadButton = page.getByRole('button', { name: 'Upload' });
        this.succesHeader = page.locator('h4',{hasText:'Success'});
        this.submittedSuccessfully = page.locator('xpath=//p[contains(text(),\'Submitted Successfully\')]')
        this.closeButton = page.getByRole('button', { name: 'Close' });
    }

    async waitForSuccessModal(){
        const successModal = this.succesHeader;
        await successModal.waitFor();
    }
}
export {UploadSpecialDocumentPage}