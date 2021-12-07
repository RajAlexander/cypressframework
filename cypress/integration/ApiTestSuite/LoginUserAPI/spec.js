import {
  Given,
  When,
  Then,
  And,
  Before,
  After,
} from "cypress-cucumber-preprocessor/steps";
import coreFunctions from "../../../framework/Utils/CoreFunctions";
import loginPage from "../../../framework/Pages/LoginPage";
import welcomePage from "../../../framework/Pages/WelcomePage";

Before(() => {
  coreFunctions.log("Login API Tests - Started");
});

After(() => {
  coreFunctions.log("Login API Tests - Finished");
});

Given("A user enters to the login page.", () => {
  coreFunctions.visit("/");
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
  cy.writeFile("./cypress/fixtures/userData.json", JSON.stringify(users));
});

Then("{string} should be displayed on the login page.", (expectedString) => {
  cy.readFile("./cypress/fixtures/userData.json").then(function (users) {
    users.forEach((user) => {
      loginPage.loginViaUI(user.Username, user.Password);
      loginPage.validateFail(expectedString);
    });
  });
});

Then("{string} should be displayed on the welcome page.", (expectedString) => {
  cy.readFile("./cypress/fixtures/userData.json").then(function (users) {
    users.forEach((user) => {
      loginPage.loginViaUI(user.Username, user.Password);
      loginPage.validatePass(expectedString);
    });
  });
});

And("/login request is intercepted.", () => {
  cy.readFile("./cypress/fixtures/userData.json").then(function (users) {
    users.forEach((user) => {
      loginPage.username(user.Username);
      loginPage.password(user.Password);
      const routeMatcher = {
        method: "POST",
        path: "/api/user/login",
      };
      coreFunctions.intercept(routeMatcher, "login");
      loginPage.clickLoginButton();
    });
  });
});

Then(
  "/login response should give {int} Unauthorized status code.",
  (_statusCode) => {
    coreFunctions.waitForObject("@login").then((resolve) => {
      expect(resolve.response.statusCode).to.eq(_statusCode);
    });
  }
);

Then(
  "Save token and /login response should give {int} status code.",
  (_statusCode) => {
    coreFunctions.waitForObject("@login").then((resolve) => {
      expect(resolve.response.statusCode).to.eq(_statusCode);
      window.localStorage.setItem(
        "responseBody",
        JSON.stringify(resolve.response.body)
      );
      cy.writeFile(
        "./cypress/payload/login/response/responseBody.json",
        JSON.stringify(resolve.response.body)
      );
    });
  }
);

And("Logout button should be clicked on the Welcome Page.", () => {
  coreFunctions.getCurrentUrl("/welcome");
  welcomePage.clickLogoutButton();
});
