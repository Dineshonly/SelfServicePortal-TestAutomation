class ApiUtils {
	constructor(page) {
		this.page = page;
	}
    
	// methods 
	// Method to check save progress API call
	async checkSaveProgressAPI(url) {
		// Use a promise to capture the response, since this will happen asynchronously
		// eslint-disable-next-line no-async-promise-executor
		return new Promise(async (resolve, reject) => {
			// Intercept the API call
			await this.page.route(url, async (route) => {
				try {
					// Fetch the actual request to get the response
					const response = await route.fetch(); // continue to let the request go through
					// Check the status code
					if (response.status() === 200) {
						resolve(); // If the status is 200, resolve the promise
					} else {
						reject(`Unexpected status code: ${response.status()}`);
					}
				} catch (error) {
					reject(`Failed to check API status: ${error}`);
				}
			});

			// Trigger the API call by pressing the 'Tab' key
			await this.page.keyboard.press("Tab");
		});
	}

	async check200kStatusAPI(url) {
		// Wait for the API response
		const response = await this.page.waitForResponse(response =>
			response.url().includes(url) && response.status() === 200);

		// Check if the response is what you expected
		if (response) {
			console.log("Success! The API returned the expected response.");
			// Continue with your next steps
		} else {
			console.log("Something went wrong, the expected API response was not received.");
		}
	}
}

export default ApiUtils;