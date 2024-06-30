const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      require('@cypress/grep/src/plugin')(config);
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
    "retries" : {
        "runMode":2,
        "openMode":2
    },
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    viewportWidth: 1280,
    viewportHeight: 720,
  },
  
});
