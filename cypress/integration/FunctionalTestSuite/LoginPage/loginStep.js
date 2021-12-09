import {
  Given,
  When,
  Then,
  And,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";
import core from "../../../framework/Utils/CoreFunctions";
import loginPage from "../../../framework/Pages/LoginPage";
import welcomePage from "../../../framework/Pages/WelcomePage";

Before(() => {
  core.log("Login Tests - Started");
});

After(() => {
  core.log("Login Tests - Finished");
});

Given("A user enters to the login page.", () => {
  core.visit("/login");
});

When("A user provides below user credentials.", (dataTable) => {
  let users = [];
  dataTable.rawTable.slice(1).forEach((user, index) => {
    const [Username, Password] = user;
    users.push({
      Username,
      Password,
    });
  });
  core.writeFile("./cypress/fixtures/userData.json", JSON.stringify(users));
});

Then("{string} should be displayed on the login page.", (expectedString) => {
  core.readFile("./cypress/fixtures/userData.json").then(function (users) {
    users.forEach((user) => {
      loginPage.usernameInput(user.Username);
      loginPage.passwordInput(user.Password);
      loginPage.clickLoginButton();
      loginPage.validateFail(expectedString);
    });
  });
});

Then("{string} should be displayed on the welcome page.", (expectedString) => {
  cy.readFile("./cypress/fixtures/userData.json").then(function (users) {
    users.forEach((user) => {
      loginPage.usernameInput(user.Username);
      loginPage.passwordInput(user.Password);
      loginPage.clickLoginButton();
      loginPage.validatePass(expectedString);
    });
  });
});

And("/login request is intercepted.", () => {
  const routeMatcher = {
    method: "POST",
    path: "/api/user/login",
  };
  core.intercept(routeMatcher, "login");
});

Then(
  "/login request should give {int} Unauthorized status code.",
  (_statusCode) => {
    core.waitForObject("@login").then((resolve) => {
      expect(resolve.response.statusCode).to.eq(_statusCode);
    });
  }
);

Then("/login request should give {int} status code.", (_statusCode) => {
  core.waitForObject("@login").then((resolve) => {
    expect(resolve.response.statusCode).to.eq(_statusCode);
  });
});

And("Logout button can be clicked on the Welcome Page.", () => {
  core.getCurrentUrl("/welcome");
  welcomePage.clickLogoutButton();
});
