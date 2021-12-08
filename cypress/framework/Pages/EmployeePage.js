import core from "../Utils/CoreFunctions";
class EmployeePage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (EmployeePage._instance) {
      return EmployeePage._instance;
    }
    EmployeePage._instance = this;

    this.newEmployeeSubmissionButtonLocator = ".app-buttons";
    this.firstNameInputLocator =
      ":nth-child(1) > :nth-child(1) > .form-group > :nth-child(2) > [ng-switch='field.fieldType'] > [ng-switch-when='text'] > [ng-if='!isReadOnly()'] > div > .form-input";
    this.lastNameInputLocator =
      ":nth-child(1) > :nth-child(2) > .form-group > :nth-child(2) > [ng-switch='field.fieldType'] > [ng-switch-when='text'] > [ng-if='!isReadOnly()'] > div > .form-input";
    this.cityInputLocator =
      ":nth-child(1) > .col-md-12 > .panel > .panel-body > :nth-child(2) > :nth-child(2) > .form-group > :nth-child(2) > [ng-switch='field.fieldType'] > [ng-switch-when='text'] > [ng-if='!isReadOnly()'] > div > .form-input";
    this.zipCodeInputLocator = "[ng-switch-when='numeric'] > div > .form-input";
    this.saveButtonLocator = ".nav > :nth-child(1) > .btn";
    this.timeSpentSaveButtonLocator =
      "body > div:last-child > div > div > div:last-child > button.btn";
    this.employeeIdLocator =
      "div.page-toolbar div  div h4 > span:last-child > span";
  }

  /* Get page Title */
  getPageTitle() {
    return core.findElement(this.pageTitleLocator);
  }

  /* Click Delete Button */
  clickSaveButton(employee) {
    this.employee = employee;
    core.findElement(this.newEmployeeSubmissionButtonLocator).click();
    core.findElement(this.firstNameInputLocator).type(this.employee.FirstName);
    core.findElement(this.lastNameInputLocator).type(this.employee.LastName);
    core.findElement(this.cityInputLocator).type(this.employee.City);
    core.findElement(this.zipCodeInputLocator).type(this.employee.ZipCode);
    core.findElement(this.saveButtonLocator).click();
    core.findElement(this.timeSpentSaveButtonLocator).focus().click();
    core.findElement(this.employeeIdLocator).then(($el) => {
      this.employee.Id = $el.text().trim();
      core.log("Employee Tracking Id: " + this.employee.Id.toString());
      core.writeFile("./corepress/fixtures/employeeData.json", this.employee);
    });
  }

  /* Click Delete Button */
  clickDeleteButton() {
    return core.get(this.navigationMenuLocator);
  }

  /* Click Delete Button */
  verifyEmployeeRecordCreated() {
    return core.get(this.navigationMenuLocator);
  }
}

/* Create an instance and export. */
const employeePage = new EmployeePage();
export default employeePage;
