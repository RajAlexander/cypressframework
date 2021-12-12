import { And, Given, Then } from "cypress-cucumber-preprocessor/steps";
import core from "../../../framework/Utils/CoreFunctions";
import userAPI from "../../../framework/Pages/UserAPI";
import recordAPI from "../../../framework/Pages/RecordAPI";

Then("Make a POST call to create employee record and validate its response.", () => {
  userAPI.userLoginRequest().then((userLoginResponse) => {
    recordAPI.createRecordRequest(userLoginResponse);
  });
});

Then("Make a GET call to get employee record and validate its response.", () => {
  userAPI.userLoginRequest().then((userLoginResponse) => {
    recordAPI.getRecordRequest(userLoginResponse);
  });
});

Then("Make a DELETE call to delete employee record and validate its response.", () => {
  userAPI.userLoginRequest().then((userLoginResponse) => {
    recordAPI.deleteRecordRequest(userLoginResponse);
  });
});
