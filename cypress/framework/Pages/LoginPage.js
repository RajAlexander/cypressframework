import coreFunctions from "../Utils/CoreFunctions";

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
    cy.visit("/login");
    this.username(username);
    this.password(password);
    this.clickLoginButton();
  }

  /* Input userId credentials. */
  loginViaAPISession(username, password) {
    cy.session(
      [username, password],
      () => {
        cy.request({
          method: "POST",
          url: Cypress.env("apiserver") + "/api/user/login",
          body: {
            username: username,
            password: password,
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          window.localStorage.setItem("token", JSON.stringify(res.body));
        });
      },
      {
        validate() {
          cy.visit("/");
          cy.get("div > img").should("be.visible");
        },
      }
    );
  }

  /* Input userId credentials. */
  username(userId) {
    return coreFunctions.type(this.userIdLocator, userId);
  }

  /* Input passoword credentials. */
  password(password) {
    return coreFunctions.type(this.passwordLocator, password);
  }

  /* Click Login Button. */
  clickLoginButton() {
    return coreFunctions.findElement(this.loginButtonLocator).click();
  }

  validateFail(expectedText) {
    cy.get(".login-error").should("have.length", 1);
    cy.get(".login-error").then(($div) => {
      const actualText = $div.text();
      expect(actualText).to.include(expectedText);
    });
  }

  validatePass(expectedText) {
    cy.get(".box h1").should("have.length", 1);
    cy.get(".box h1").then(($div) => {
      const actualText = $div.text();
      expect(actualText).to.include(expectedText);
    });
  }
}

/* Create an instance and export. */
const loginPage = new LoginPage();
export default loginPage;
