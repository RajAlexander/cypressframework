import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import loginPage from "../../../framework/Pages/LoginPage";
import welcomePage from "../../../framework/Pages/WelcomePage";
import coreFunctions from "../../../framework/Utils/CoreFunctions";

Given("User is logged into the Swimlane application.", () => {
  loginPage.loginViaUI(Cypress.env("username"), Cypress.env("password"));
});

When("Navigated to Welcome Page.", () => {
  coreFunctions.visit("/");
});

Then("WelcomePage title must contain {string}.", (pageTitle) => {
  welcomePage.getTitle().then(($el) => {
    expect($el.text().trim()).to.eq(pageTitle);
  });
});
