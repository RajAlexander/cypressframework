import core from "../Utils/CoreFunctions";
class LoginPage {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (LoginPage._instance) {
      return LoginPage._instance;
    }
    LoginPage._instance = this;

    this.userIdLocator = "#input-1";
    this.passwordLocator = "#input-2";
    this.loginButtonLocator = "button[type='submit']";
  }

  /* Input userId credentials. */
  loginViaUI(username, password) {
    core.visit("/login");
    this.usernameInput(username);
    this.passwordInput(password);
    this.clickLoginButton();
  }

  /* Input userId credentials. */
  usernameInput(userId) {
    return core.type(this.userIdLocator, userId);
  }

  /* Input passoword credentials. */
  passwordInput(password) {
    return core.type(this.passwordLocator, password);
  }

  /* Click Login Button. */
  clickLoginButton() {
    return core.findElement(this.loginButtonLocator).click();
  }

  /* Login page error validations. */
  validateFail(expectedText) {
    cy.get(".login-error").should("have.length", 1);
    cy.get(".login-error").then(($div) => {
      const actualText = $div.text();
      expect(actualText).to.include(expectedText);
    });
  }

  /* Login page success validations. */
  validatePass(expectedText) {
    cy.get(".box h1").should("have.length", 1);
    cy.get(".box h1").then(($div) => {
      const actualText = $div.text();
      expect(actualText).to.include(expectedText);
    });
  }

  /* Login using API session */
  loginViaAPISession(username, password) {
    cy.session(
      [username, password],
      () => {
        core
          .request({
            method: "POST",
            url: Cypress.env("apiserver") + "/api/user/login",
            body: {
              username: username,
              password: password,
            },
          })
          .then((res) => {
            expect(res.status).to.eq(200);
            window.localStorage.setItem("token", JSON.stringify(res.body));
          });
      },
      {
        validate() {
          core.visit("/");
          cy.get("div > img").should("be.visible");
        },
      }
    );
  }
}

/* Create an instance and export. */
const loginPage = new LoginPage();
export default loginPage;
