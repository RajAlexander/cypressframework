import core from "../Utils/CoreFunctions";
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
  getTitle(pageTitle) {
    return core.findElement(this.pageTitleLocator).then(($el) => {
      expect($el.text().trim()).to.eq(pageTitle);
    });
  }

  /* Click Logout Button */
  clickLogoutButton() {
    core.findElement(this.userProfileLocator).click({ force: true });
    core.findElement(this.logoutLocator).click();
  }

  /* Click Home Button */
  clickHomeButton() {
    return core.get(this.navigationMenuLocator);
  }
}

/* Create an instance and export. */
const welcomePage = new WelcomePage();
export default welcomePage;
