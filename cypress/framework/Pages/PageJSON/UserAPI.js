class UserAPI {
  constructor() {
    if (UserAPI._instance) {
      return UserAPI._instance;
    }
    UserAPI._instance = this;

    this.postMethod = Cypress.env("postMethod");
    this.getMethod = Cypress.env("getMethod");
    this.deleteMethod = Cypress.env("deleteMethod");
    this.loginURL = Cypress.env("apiserver") + Cypress.env("loginURI");
    this.body = {
      username: Cypress.env("username"),
      password: Cypress.env("password"),
    };
  }

  userLoginRequest = () => {
    return cy.request(this.postMethod, this.loginURL, this.body);
  };
}

const userAPI = new UserAPI();
export default userAPI;
