const { defineConfig } = require("cypress");
const { allureCypress } = require("allure-cypress/reporter")

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://gorest.co.in/public/',
    watchForFileChanges: false,
    
    setupNodeEvents(on, config) {
      allureCypress(on)
      return config;
    },
  },

  env: {
    version: 'v2/',
    hideCredentials: false
  }

})
