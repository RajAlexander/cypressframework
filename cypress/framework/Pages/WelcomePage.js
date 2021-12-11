import core from "../Utils/CoreFunctions";

const pageTitleLocator = "head > title";
const userProfileLocator = ".ngx-dropdown-toggle";
const logoutLocator = "li > .profile-title > .logout-button";
const navigationMenuLocator = "ngx-nav-menu > div > a#home";
const todoLocator = ".vertical-list > li";

class WelcomePage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (WelcomePage._instance) return WelcomePage._instance;
    WelcomePage._instance = this;
  }

  /* Get page Title */
  getTitle(pageTitle) {
    return core.findElement(pageTitleLocator).then(($element) => {
      expect($element.text().trim()).to.eq(pageTitle);
    });
  }

  /* Click Logout Button */
  clickLogoutButton() {
    core.findElement(userProfileLocator).click({ force: true });
    core.findElement(logoutLocator).click();
  }

  /* Click Home Button */
  clickHomeButton() {
    return core.get(navigationMenuLocator);
  }
}

/* Create an instance and export. */
const welcomePage = new WelcomePage();
export default welcomePage;
