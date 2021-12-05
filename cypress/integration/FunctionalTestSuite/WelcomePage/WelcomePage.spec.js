import { Given, When, Then, And } from "cypress-cucumber-preprocessor/steps"
import coreFunctions from "../../../framework/Pages/CoreFunctions"
import welcomePage from "../../../framework/Pages/WelcomePage"

Given("User is logged into the Swimlane application.", () => {
    cy.loginViaAPISession(Cypress.env("username"), Cypress.env("password"))
})

When("Navigated to Welcome Page.", () => {
    coreFunctions.open("/");
})

Then("WelcomePage title must contain {string}.", (pageTitle) => {
    welcomePage.getTitle().then($el => {
        expect($el.text().trim()).to.eq(pageTitle);
    })
})