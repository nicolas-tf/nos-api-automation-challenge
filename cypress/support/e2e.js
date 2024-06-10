// Import commands.js using ES2015 syntax:
import './commands'

// External libs
import 'allure-cypress/commands'
import 'cypress-plugin-api'
import 'allure-cypress'
import '@faker-js/faker'

afterEach('Take a screenshot', () => {
    const testState = Cypress.mocha.getRunner().test.state
    const testTitle = Cypress.mocha.getRunner().test.title
    const screenshotName = `${testTitle} -- ${testState}`
  
    cy.screenshot(screenshotName)
  })
  