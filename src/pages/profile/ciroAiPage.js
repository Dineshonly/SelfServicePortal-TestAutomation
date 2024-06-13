class CiroAiPage{
    constructor(page) {
        this.page = page;
        this.askAnythingButton = page.getByRole('button', { name: 'logo Ask Anything' });
        this.tipsForGettingStarted = page.getByTestId('ca-intro-btn-1');
        this.closeSidedrawerButton = page.getByTestId('ca-close-sidedrawer-button');
        this.gotItTipsButton = page.getByText('Got it');
        this.bulbIcon = page.getByTestId('ca-bulb-button');
        this.minimizeButton = page.getByTestId('ca-minimize-button');
        this.textAreaHowMayIHelpYouInput = page.getByTestId('ca-msg-input');
        this.sendButton = page.getByTestId('ca-send-button');
        this.userQuestion = page.getByTestId('ca-user-msg');
        this.ciroAiResponse = page.getByTestId('ca-bot-msg');
    }


    // Methods/functions

    async clickOnCiroAi(){
        await this.askAnythingButton.click();
    }
}

export {CiroAiPage}