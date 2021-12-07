/**********************************************
This example commands.js shows you how to
create various custom commands and overwrite
existing commands.

For more comprehensive examples of custom
commands please read more here:
https://on.cypress.io/custom-commands
***********************************************/

/* This is a parent command */
Cypress.Commands.add("login", (email, password) => {
  console.log("login method");
});

Cypress.Commands.add("loginViaUI", (username, password) => {
  cy.visit("/")
  cy.get("input#username").type(username)
  cy.get("input#password").type(password)
  cy.get("button#submit").click()
})

Cypress.Commands.add("loginViaAPI", (uname, pwd) => {
  cy.request({
    method: "POST",
    url: Cypress.env("apiserver") + "/api/user/login",
    body: {
      username: uname,
      password: pwd
    }
  }).then(res => {
    expect(res.status).to.eq(200)
    window.localStorage.setItem("token", JSON.stringify(res.body))
  })
})

/* This will overwrite an existing visit command */
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/* Get Text Value Command */
Cypress.Commands.add("getText", {
  prevSubject: "element"
}, (prevSub) => {
  // return prevSub.text();
  cy.wrap(prevSub.text());
});

/* Get Table Cell Value */
Cypress.Commands.add("getCellValue", (row, col) => {
  cy.get(`table#table1>tbody>tr:nth-child(${row})>td:nth-child(${col})`).then(
    (el) => {
      cy.wrap(el.text());
    }
  );
});

/* Get the body of iFrame */
Cypress.Commands.add("iframe", {
  prevSubject: "element"
}, (iframe) => {
  return new Cypress.Promise((resolve) => {
    iframe.ready(() => {
      resolve(iframe.contents().find("body"));
    });
  });
});
