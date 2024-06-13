// @ts-check
const {test} = require("@playwright/test");
const createTestUser = require("../../utils/createTestUserUtils");


test.beforeAll(async () => {
    const environment = process.env.NODE_ENV;
    if (environment === 'qa') {
        console.log('Before tests - Running in QA Environment');
    }
})
test('Create QA Test User Pulse @qa-create-test-user', async ({page}) => {
    try {
        await test.step('Create Pulse Account', async () => {
            await createTestUser.createPulseAccount(page);
            console.log('Create Pulse Account Created');
        });
        await test.step('Create Ciro Account', async () => {
            await createTestUser.createCiroAccount(page);
            console.log('Create Ciro Account Created');
        });
    } catch(error) {
        console.error(error);
    }
});

test('Create QA Test User Ciro @qa-create-test-user', async ({page}) => {
    try {
        await test.step('Activate Account', async () => {
            await page.waitForTimeout(1000);
            await createTestUser.activationLink();
            console.log('Account Activated');
        });
    } catch(error) {
        console.error(error);
    }
});