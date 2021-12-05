import coreFunctions from "./CoreFunctions";
class LoginPage {

    /* Singleton Pattern for single instance creation. */
    constructor() {
        if (LoginPage._instance) {
            return LoginPage._instance;
        }
        LoginPage._instance = this;
        this.userIdLocator = "#input-1";
        this.passwordLocator = "#input-2";
        this.loginButtonLocator = "button[type='submit']"
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
}
/* Create an instance and export. */
const loginPage = new LoginPage();
export default loginPage