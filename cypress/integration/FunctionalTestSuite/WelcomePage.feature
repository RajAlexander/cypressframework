Feature: Welcome Page Feature

    Validate the functionalities on Welcome Page.

    Background: Login and Navigate to Welcome Page.
        Given A user is logged into the Swimlane application.
        When A user is on the Welcome Page.

    Scenario: Verify WelcomePage title contains Swimlane.
        Then WelcomePage title must contain "Swimlane".

    Scenario: Add a new employee record.
        When A user clicks a new record and provides below employee details in the form page.
            | FirstName | LastName     | City | ZipCode |
            | naresh    | 8JB2z4#Wu2l! | Hyd  | 123445  |
        Then An employee tracking ID is generated when the user clicks Save button on the form Page.
