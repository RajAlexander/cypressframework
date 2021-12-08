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
  coreFunctions.log("Login API Intercept Test - Started");
});

After(() => {
  coreFunctions.log("Login API Intercept Test - Finished");
});

Given("A user enters to the login page.", () => {
  coreFunctions.visit("/login");
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
  coreFunctions.log(
    "User credentials are saved in fixture folder as userData.json"
  );
  coreFunctions.writeFile(
    "./cypress/fixtures/userData.json",
    JSON.stringify(users)
  );
});

And("/login request is intercepted.", () => {
  const routeMatcher = {
    method: "POST",
    path: "/api/user/login",
  };
  coreFunctions
    .readFile("./cypress/fixtures/userData.json")
    .then(function (users) {
      users.forEach((user) => {
        loginPage.usernameInput(user.Username);
        loginPage.passwordInput(user.Password);
        coreFunctions.intercept(routeMatcher, "login");
        loginPage.clickLoginButton();
      });
    });
});

Then(
  "Save token and /login response should give {int} status code.",
  (_statusCode) => {
    coreFunctions.waitForObject("@login").then((resolve) => {
      expect(resolve.response.statusCode).to.eq(_statusCode);
      coreFunctions.log(
        "User login is intercepted and response saved in payload folder"
      );
      coreFunctions.writeFile(
        "./cypress/payload/login/response/responseBody.json",
        JSON.stringify(resolve.response.body)
      );
    });
  }
);

Then(
  "/login response should give {int} Unauthorized status code.",
  (_statusCode) => {
    coreFunctions.waitForObject("@login").then((resolve) => {
      expect(resolve.response.statusCode).to.eq(_statusCode);
    });
  }
);
