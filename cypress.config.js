const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  // Need to add special resolution rules for subdomains
  // https://github.com/cypress-io/cypress/issues/1488#issuecomment-396435553
  hosts: {
    "*.localhost": "127.0.0.1",
  },
});
