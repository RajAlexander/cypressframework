import { Given } from "cypress-cucumber-preprocessor/steps";
import coreFunctions from "../../Utils/CoreFunctions";

class RecordAPI {
  constructor() {
    if (RecordAPI._instance) {
      return RecordAPI._instance;
    }

    RecordAPI._instance = this;

    this.postMethod = Cypress.env("postMethod");
    this.getMethod = Cypress.env("getMethod");
    this.deleteMethod = Cypress.env("deleteMethod");
    this.pathToLoginApiResponseFolder = Cypress.env(
      "pathToLoginApiResponseFolder"
    );
    this.pathToCreateRecordApiResponseFolder = Cypress.env(
      "pathToCreateRecordApiResponseFolder"
    );
    this.pathToGetRecordApiResponseFolder = Cypress.env(
      "pathToGetRecordApiResponseFolder"
    );
    this.createRecordURL =
      Cypress.env("apiserver") + Cypress.env("createRecordURI");
    this.body = {
      applicationId: Cypress.env("appId"),
      values: {
        adwok: "Hyderabad",
        alzxa: "nareshraj423@yahoo.com",
        aif8s: "",
        a75lt: "Naresh",
        a8rki: "G",
        avf8l: "",
        au0sv:
          "Flat No. 403, 4th Floor, SV Emerald Apartment.\nInnova Hospital Lane",
        abjcf: "",
        ah1nd: "",
        abavp: 500017,
      },
    };
  }

  /* Create Record API implementation */
  createRecordRequest = (response) => {
    this.userLoginResponse = response;
    coreFunctions.writeFile(
      this.pathToLoginApiResponseFolder,
      JSON.stringify(response)
    );

    /* POST Request PayLoad */
    const options = {
      method: this.postMethod,
      url: this.createRecordURL,
      headers: {
        Authorization: "Bearer " + this.userLoginResponse.body.token,
      },
      body: this.body,
      failOnStatusCode: false,
    };

    /* POST Request call */
    cy.request(options).then((response) => {
      if (response.status == 200) coreFunctions.log("Success");
      else coreFunctions.log("Bad Request");
      coreFunctions.writeFile(
        this.pathToCreateRecordApiResponseFolder,
        JSON.stringify(response)
      );
    });
  };

  /* Get Record API implementation */
  getRecordRequest = (response) => {
    this.userLoginResponse = response;
    //this.createRecordRequest(this.userLoginResponse)
    coreFunctions
      .readFile(this.pathToCreateRecordApiResponseFolder)
      .then((response) => {
        coreFunctions.writeFile(
          this.pathToCreateRecordApiResponseFolder,
          JSON.stringify(response)
        );

        /* GET Request PayLoad */
        const options = {
          method: this.getMethod,
          url: this.createRecordURL + "/" + response.body.id,
          headers: {
            Authorization: "Bearer " + this.userLoginResponse.body.token,
          },
          failOnStatusCode: false,
        };

        /* GET Request Call */
        cy.request(options).then((response) => {
          if (response.status == 200) coreFunctions.log("Success");
          else coreFunctions.log("Bad Request");
          coreFunctions.writeFile(
            this.pathToCreateRecordApiResponseFolder,
            JSON.stringify(response)
          );
        });
      });
  };

  /* Delete Record API implementation */
  deleteRecordRequest = (response) => {
    this.userLoginResponse = response;
    //this.createRecordRequest(this.userLoginResponse)
    coreFunctions
      .readFile(this.pathToCreateRecordApiResponseFolder)
      .then((response) => {
        coreFunctions.writeFile(
          this.pathToCreateRecordApiResponseFolder,
          JSON.stringify(response)
        );

        /* DELETE Request PayLoad */
        const options = {
          method: this.deleteMethod,
          url: this.createRecordURL + "/" + response.body.id,
          headers: {
            Authorization: "Bearer " + this.userLoginResponse.body.token,
          },
          failOnStatusCode: false,
        };

        /* DELETE Request Call */
        cy.request(options).then((response) => {
          expect(response.status).is.equal(204);
          if (response.status == 204) coreFunctions.log("Success");
          else coreFunctions.log("Bad Request");
        });
      });
  };
}

const recordAPI = new RecordAPI();
export default recordAPI;
