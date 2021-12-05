class CoreFunctions {
    /* Singleton Patter for single instance creation. */
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
    open(url) {
        return cy.visit(url);
    }

    /* Intercept any Https call and assign an alias name. */
    intercept(query,alias) {
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
    
    /* Type text in the webelement locator in the current landing page. */
    type(locator,text) {
        return this.findElement(locator).type(text);
    }
}
/* Create an instance and export. */
const coreFunctions = new CoreFunctions();
export default coreFunctions