import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import employeePage from "../../../framework/Pages/EmployeePage";
import loginPage from "../../../framework/Pages/LoginPage";
import welcomePage from "../../../framework/Pages/WelcomePage";
import core from "../../../framework/Utils/CoreFunctions";

Given("A user is logged into the Swimlane application.", () => {
  loginPage.loginViaUI(Cypress.env("username"), Cypress.env("password"));
});

When("A user is on the Welcome Page.", () => {
  core.getCurrentUrl("/welcome");
});

Then("WelcomePage title must contain {string}.", (pageTitle) => {
  welcomePage.getTitle(pageTitle);
});

When(
  "A user clicks a new record and provides below employee details in the form page.",
  (dataTable) => {
    let employees = [];
    dataTable.rawTable.slice(1).forEach((employee, index) => {
      const [FirstName, LastName, City, ZipCode] = employee;
      employees.push({
        FirstName,
        LastName,
        City,
        ZipCode,
      });
    });
    core.writeFile(
      "./cypress/fixtures/employeesData.json",
      JSON.stringify(employees)
    );
  }
);

Then(
  "An employee tracking ID is generated when the user clicks Save button on the form Page.",
  () => {
    core
      .readFile("./cypress/fixtures/employeesData.json")
      .then(function (employees) {
        employees.forEach((employee) => {
          employeePage.clickSaveButton(employee);
        });
      });
  }
);
