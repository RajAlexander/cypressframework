class CoreFunctions {
  /* Singleton Pattern for single instance creation. */
  constructor() {
    if (CoreFunctions._instance) {
      return CoreFunctions._instance;
    }
  }

  /* Log data on test runner. */
  log(text) {
    return cy.log(text);
  }

  /* Navigate to url. */
  visit(url) {
    return cy.visit(url, { failOnStatusCode: false });
  }

  /* Intercept any Https call and assign an alias name. */
  request(method, url, body) {
    return cy.request(method, url, body);
  }

  /* Intercept any Https call and assign an alias name. */
  intercept(query, alias) {
    return cy.intercept(query).as(alias);
  }

  /* Stop current thread execution. */
  sleep(number) {
    return cy.wait(number);
  }

  /* Wait for expected alias/object in an Async call. */
  waitForObject(alias) {
    return cy.wait(alias);
  }

  /* Get current URL of the landing page. */
  getCurrentUrl(label) {
    return cy.url().should("contain", label);
  }

  /* Find webelement in the current landing page. */
  findElement(locator) {
    return cy.get(locator);
  }

  /* Find webelement in the current landing page. */
  get(alias) {
    return cy.get(alias);
  }

  /* Type text in the webelement locator in the current landing page. */
  clear() {
    return cy.clear();
  }

  /* Type text in the webelement locator in the current landing page. */
  type(locator, text) {
    this.findElement(locator).clear().type(text);
  }

  /* Mask sensitive text in the webelement locator in the current landing page. */
  typeSensitive(locator, text) {
    this.findElement(locator).clear().type(text, { sensitive: true });
  }

  /* Saves a file in the desired path/directory */
  writeFile(filePath, contents) {
    return cy.writeFile(filePath, contents);
  }

  /* Reads a file from the desired path/directory */
  readFile(filePath) {
    return cy.readFile(filePath);
  }
}

/* Create an instance and export. */
const core = new CoreFunctions();
export default core;
