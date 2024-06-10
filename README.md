# GO REST API Automation Testing 

## Description
This test plan outlines the test scenarios for creating a new user in the GoRest public API (https://gorest.co.in/public/v2/users) using Cypress.

## Necessary Tools
- Cypress
- Node.js
- An access token from the GoRest API

## Initial Setup

1. **Install Cypress:**:
   ```sh
   npm install cypress -D
   ```

2. **Configure secrets**:

   Create the `cypress.env.json` file or duplicate/rename the `cypress.env.example.json` file in the project root and replace the `ACCESS_TOKEN` parameter value with your GoRest API access token.

3. **Run Tests:**:

   - Cypress Interface:

      To open the Cypress interface, execute the following command in the terminal:
      
      ```sh
      npx cypress open
      ```

   - Commands line:

      You can run the scripts defined in the package.json file using the npm run command. Here are some examples:
      
      `npm run all` - Runs all tests in the project
      
      `npm run health` - Runs the smoke tests to check if the application is running
      
      `npm run get-user` - Runs the get /users request tests

      if you added `:report` in the end of command, for example:
      
      `npm run all:report`
      
      It will run all tests and build the allure report to show you the tests results

      You can see all commands maped at `package.json` file

---

## Final Notes

### Test Plan:

   You can see our mapped tests on  [Test Plan](./test-plan.md) 

### CI/Pipeline:

   We have two pipelines set up:

   `ci.yaml`: This pipeline runs the tests sequentially, starting with the health check followed by all mapped tests.
   
   `ci-parallel.yaml`: This pipeline runs the health check first and then executes the tests in parallel based on the endpoint.
   These pipelines ensure comprehensive and efficient testing of the application.

### Improvements:

- Automate non-automated requests: /todos, /comments, /posts.
- Add a static page on GitHub using gh-pages to present the updated allure report results.
- Update the project to create dynamic test scenarios using generic test methods and having a list of objects with input parameters and expected results
