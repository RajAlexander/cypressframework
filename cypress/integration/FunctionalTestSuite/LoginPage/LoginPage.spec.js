import { Given, When, Then, And, Before, After } from "cypress-cucumber-preprocessor/steps"
import coreFunctions from "../../../framework/Pages/CoreFunctions"
import loginPage from "../../../framework/Pages/LoginPage"
import welcomePage from "../../../framework/Pages/WelcomePage"

Before(() => {
    coreFunctions.log("Login Tests - Started");
});

After(() => {
    coreFunctions.log("Login Tests - Finished");
});

Given("The Login Page is opened.", () => {
    coreFunctions.open("/");
})

When("Invalid Username and Password is entered.", () => {
    loginPage.username("123");
    loginPage.password("123");
})

And("/login request is intercepted.", () => {
    const routeMatcher = {
        method: "POST",
        path: "/api/user/login"
    }
    coreFunctions.intercept(routeMatcher,"login");
})

And("Login button is clicked.", () => {
    loginPage.clickLoginButton();
})

Then("/login request should give {int} Unauthorized status code.", (_statusCode) => {
    coreFunctions.waitForObject("@login").then(resolve => {
        expect(resolve.response.statusCode).to.eq(_statusCode);
    })
})

When("Valid Username and Password is entered.", () => {
    loginPage.username(Cypress.env("username"))
    loginPage.password(Cypress.env("password"))
})

Then("/login request should give {int} status code.", (_statusCode) => {
    coreFunctions.waitForObject("@login").then(resolve => {
        expect(resolve.response.statusCode).to.eq(_statusCode)
    })
})

And("Logout button should be clicked on the Welcome Page.", () => {
    coreFunctions.getCurrentUrl("/welcome");
    welcomePage.clickLogoutButton();
})