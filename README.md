## Quick start
1. Clone the repository
2. Install the dependencies:
```bash
npm install
```
3. Create a `.env` file in the root of the project and add the following:
```properties
BASE_URL=<https:// ... your base url here >
OKTA_URL=<https:// ... some url for okta>
TOY_API_URL=<https:// ... some url for toy api>
OKTA_CLIENT_ID=<secret>
OKTA_CLIENT_SECRET=<secret>
RUN_HEADLESS=false
```
4. Run the checkout e2e test:
```bash
npm run checkout-test
```