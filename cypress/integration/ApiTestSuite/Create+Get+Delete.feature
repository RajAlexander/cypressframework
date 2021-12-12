Feature: End to end employee record life-cycle.

    API where the users can create/pull/delete an employee record to their user account.
    
    Scenario: A user wants to Create, pull and then delete an employee record.
        Then Make a POST call to create employee record and validate its response.
        Then Make a GET call to get employee record and validate its response.
        Then Make a DELETE call to delete employee record and validate its response.

    Scenario: A user wants to fetch a deleted employee record, then GET API should throw BAD REQUEST.
        Then Make a DELETE call to delete employee record and validate its response.
        Then Make a GET call to get employee record and validate its response.

