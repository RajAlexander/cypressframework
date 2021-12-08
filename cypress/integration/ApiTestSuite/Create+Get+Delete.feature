Feature: End to end employee record life-cycle.

    API where the users can create/pull/delete an employee record to their user account.

    Scenario: When user wants to Create, pull and then delete an employee record.
        Then Make a POST call to create employee record and validate its response.
        Then Make a GET call to get employee record and validate its response.
        Then Make a DELETE call to delete employee record and validate its response.

    Scenario: When user wants to pull a deleted employee record.
        Then Make a DELETE call to delete employee record and validate its response.
        Then Make a GET call to get employee record and validate its response.

