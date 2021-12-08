import coreFunctions from "../Utils/CoreFunctions";
class WelcomePage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (WelcomePage._instance) {
      return WelcomePage._instance;
    }
    WelcomePage._instance = this;

    this.pageTitleLocator = "head > title";
    this.userProfileLocator = ".ngx-dropdown-toggle";
    this.logoutLocator = "li > .profile-title > .logout-button";
    this.navigationMenuLocator = "ngx-nav-menu > div > a#home";
    this.todoLocator = ".vertical-list > li";
  }

  /* Get page Title */
  getTitle() {
    return coreFunctions.findElement(this.pageTitleLocator);
  }

  /* Click Logout Button */
  clickLogoutButton() {
    coreFunctions.findElement(this.userProfileLocator).click({ force: true });
    coreFunctions.findElement(this.logoutLocator).click();
  }

  /* Click Home Button */
  clickHomeButton() {
    return coreFunctions.get(this.navigationMenuLocator);
  }
}

/* Create an instance and export. */
const welcomePage = new WelcomePage();
export default welcomePage;
