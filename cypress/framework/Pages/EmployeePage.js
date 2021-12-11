import core from "../Utils/CoreFunctions";

const newEmployeeSubmissionButtonLocator = ".app-buttons";
const firstNameInputLocator =
  ":nth-child(1) > :nth-child(1) > .form-group > :nth-child(2) > [ng-switch='field.fieldType'] > [ng-switch-when='text'] > [ng-if='!isReadOnly()'] > div > .form-input";
const lastNameInputLocator =
  ":nth-child(1) > :nth-child(2) > .form-group > :nth-child(2) > [ng-switch='field.fieldType'] > [ng-switch-when='text'] > [ng-if='!isReadOnly()'] > div > .form-input";
const cityInputLocator =
  ":nth-child(1) > .col-md-12 > .panel > .panel-body > :nth-child(2) > :nth-child(2) > .form-group > :nth-child(2) > [ng-switch='field.fieldType'] > [ng-switch-when='text'] > [ng-if='!isReadOnly()'] > div > .form-input";
const zipCodeInputLocator = "[ng-switch-when='numeric'] > div > .form-input";
const saveButtonLocator = ".nav > :nth-child(1) > .btn";
const timeSpentSaveButtonLocator =
  "body > div:last-child > div > div > div:last-child > button.btn";
const employeeIdLocator =
  "div.page-toolbar div  div h4 > span:last-child > span";

class EmployeePage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (EmployeePage._instance) return EmployeePage._instance;
    EmployeePage._instance = this;
  }

  /* Get page Title */
  getPageTitle() {
    return core.findElement(this.pageTitleLocator);
  }

  /* Click Save Button */
  clickSaveButton(employee) {
    this.employee = employee;
    core.findElement(newEmployeeSubmissionButtonLocator).click();
    core.findElement(firstNameInputLocator).type(employee.FirstName);
    core.findElement(lastNameInputLocator).type(employee.LastName);
    core.findElement(cityInputLocator).type(employee.City);
    core.findElement(zipCodeInputLocator).type(employee.ZipCode);
    core.findElement(saveButtonLocator).click();
    core.findElement(timeSpentSaveButtonLocator).focus().click();
    core.findElement(employeeIdLocator).then(($element) => {
      this.employee.Id = $element.text().trim();
      core.log("Employee Tracking Id: " + this.employee.Id.toString());
      core.writeFile("./cypress/fixtures/employeeData.json", this.employee);
    });
  }

  /* Click Delete Button */
  clickDeleteButton() {
    return core.get(deleteButtonLocator);
  }

  /* Verify the employee record created */
  verifyEmployeeRecordCreated() {
    return core.get(navigationMenuLocator);
  }
}

/* Create an instance and export. */
const employeePage = new EmployeePage();
export default employeePage;
