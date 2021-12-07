import { Given } from "cypress-cucumber-preprocessor/steps";

Given("A user makes a POST request.", () => {
  let requestPayload = {
    url: "api/app/aaUiorxB5O4lm4Cye/record",
    method: "POST",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhMkFKbEJaQnJ4ZkxBbnFoMCIsInVuaXF1ZV9uYW1lIjoibmFyZXNoLnJhaiIsImdpdmVuX25hbWUiOiJOYXJlc2ggUmFqIiwiZW1haWwiOiJuYXJlc2gucmFqQHNlbmVjYWdsb2JhbC5jb20iLCJuYmYiOjE2Mzg4MzA1MjMsImV4cCI6MTYzODg0NDkyMywiaWF0IjoxNjM4ODMwNTIzLCJpc3MiOiJTd2ltbGFuZSIsImF1ZCI6IlN3aW1sYW5lIn0.0ZHKUSA2229CxAeKeuui1VMmj1TRk8mIjKScfsiQ8ifZbfarbRLhNZG3_cRiN1AVdFkqnufeWAlMkPGf6mOqgA",
    },
    body: {
      applicationId: "aaUiorxB5O4lm4Cye",
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
    },
  };
  cy.request(requestPayload).then((response) => {
    cy.writeFile(
      "./cypress/payload/record/response/createData.json",
      JSON.stringify(response)
    );
  });
});

Given("A user makes a GET request.", () => {
  let requestPayload = {
    url: "api/app/aaUiorxB5O4lm4Cye/record/aHto6ZHQTs7IoIssN",
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhMkFKbEJaQnJ4ZkxBbnFoMCIsInVuaXF1ZV9uYW1lIjoibmFyZXNoLnJhaiIsImdpdmVuX25hbWUiOiJOYXJlc2ggUmFqIiwiZW1haWwiOiJuYXJlc2gucmFqQHNlbmVjYWdsb2JhbC5jb20iLCJuYmYiOjE2Mzg4MzA1MjMsImV4cCI6MTYzODg0NDkyMywiaWF0IjoxNjM4ODMwNTIzLCJpc3MiOiJTd2ltbGFuZSIsImF1ZCI6IlN3aW1sYW5lIn0.0ZHKUSA2229CxAeKeuui1VMmj1TRk8mIjKScfsiQ8ifZbfarbRLhNZG3_cRiN1AVdFkqnufeWAlMkPGf6mOqgA",
    },
  };
  cy.request(requestPayload).then((response) => {
    cy.writeFile(
      "./cypress/payload/record/response/getData.json",
      JSON.stringify(response)
    );
  });
});

Given("A user makes a DELETE request.", () => {
  let requestPayload = {
    url: "api/app/aaUiorxB5O4lm4Cye/record/aSLaq8qt6ES0Jt7Gw",
    method: "DELETE",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJhMkFKbEJaQnJ4ZkxBbnFoMCIsInVuaXF1ZV9uYW1lIjoibmFyZXNoLnJhaiIsImdpdmVuX25hbWUiOiJOYXJlc2ggUmFqIiwiZW1haWwiOiJuYXJlc2gucmFqQHNlbmVjYWdsb2JhbC5jb20iLCJuYmYiOjE2Mzg4MzA1MjMsImV4cCI6MTYzODg0NDkyMywiaWF0IjoxNjM4ODMwNTIzLCJpc3MiOiJTd2ltbGFuZSIsImF1ZCI6IlN3aW1sYW5lIn0.0ZHKUSA2229CxAeKeuui1VMmj1TRk8mIjKScfsiQ8ifZbfarbRLhNZG3_cRiN1AVdFkqnufeWAlMkPGf6mOqgA",
    },
  };
  cy.request(requestPayload).then((response) => {
    cy.writeFile(
      "./cypress/payload/record/response/deleteData.json",
      JSON.stringify(response)
    );
  });
});
