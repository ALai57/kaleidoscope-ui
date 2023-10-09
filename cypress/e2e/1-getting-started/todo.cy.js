/// <reference types="cypress" />

// Adapted from Cypress welcome
//
// To learn more about how Cypress works and
// what makes it such an awesome testing tool,
// please read our getting started guide:
// https://on.cypress.io/introduction-to-cypress

describe("Kaleidoscope home", () => {
  before(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://andrewslai.localhost:5000");
  });

  context("Basic navigation", () => {
    it("Retrieve 3D model", () => {
      // We use the `cy.get()` command to get all elements that match the selector.
      // Then, we use `should` to assert that there are two matched items,
      // which are the two default items.

      cy.get("#initial-loading-screen").should("be.visible");
      cy.get("#three-dimensional-demo").should("have.length", 1);

      // We can go even further and check that the default todos each contain
      // the correct text. We use the `first` and `last` functions
      // to get just the first and last matched elements individually,
      // and then perform an assertion with `should`.
      //cy.get(".todo-list li").first().should("have.text", "Pay electric bill");
      //cy.get(".todo-list li").last().should("have.text", "Walk the dog");
    });
  });
});

describe("Navigate to Archive", () => {
  beforeEach(() => {
    // Cypress starts out with a blank slate for each test
    // so we must tell it to visit our website with the `cy.visit()` command.
    // Since we want to visit the same URL at the start of all our tests,
    // we include it in our beforeEach function so that it runs before each test
    cy.visit("http://andrewslai.localhost:5000");
  });

  context("Basic navigation", () => {
    it("Check navigation bar icons", () => {
      cy.get("img.navbutton").should("have.length", 3);
    });

    it("Check navigation to through Archive to article", () => {
      cy.get('a[href="#/archive"]').should("have.length", 1).click();

      cy.get(".article-card")
        .should("have.length", 4)
        .first()
        .find("a")
        .should("have.length", 1)
        .click();

      cy.get(".article-title").should("have.length", 1);
    });
  });
});
