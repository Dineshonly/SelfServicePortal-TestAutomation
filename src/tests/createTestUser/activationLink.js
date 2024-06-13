import {test} from "playwright/test";
import {clickRegistrationActivationLink} from "../../utils/emailServiceUtils";
import userData from "../../../userData.json";
test('Activate Account', async ({}) => {
    await clickRegistrationActivationLink(userData.email);
});