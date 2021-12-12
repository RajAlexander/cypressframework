import core from "../Utils/CoreFunctions";
const locator = require("../PagesJSON/employeePage.json");

class EmployeePage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (EmployeePage._instance) return EmployeePage._instance;
    EmployeePage._instance = this;
  }

  /* Get page Title */
  getPageTitle() {
    return core.findElement(locator.pageTitleLocator);
  }

  /* Click Save Button */
  clickSaveButton(employee) {
    this.employee = employee;
    core.findElement(locator.newEmployeeSubmissionButtonLocator).click();
    core.findElement(locator.firstNameInputLocator).type(employee.FirstName);
    core.findElement(locator.lastNameInputLocator).type(employee.LastName);
    core.findElement(locator.cityInputLocator).type(employee.City);
    core.findElement(locator.zipCodeInputLocator).type(employee.ZipCode);
    core.findElement(locator.saveButtonLocator).click();
    core.findElement(locator.timeSpentSaveButtonLocator).focus().click();
    core.findElement(locator.employeeIdLocator).then(($element) => {
      this.employee.Id = $element.text().trim();
      core.log("Employee Tracking Id: " + this.employee.Id.toString());
      core.writeFile("./cypress/fixtures/employeeData.json", this.employee);
    });
  }

  /* Click Delete Button */
  clickDeleteButton() {
    return core.get(locator.deleteButtonLocator);
  }

  /* Verify the employee record created */
  verifyEmployeeRecordCreated() {
    return core.get(locator.navigationMenuLocator);
  }
}

/* Create an instance and export. */
const employeePage = new EmployeePage();
export default employeePage;
