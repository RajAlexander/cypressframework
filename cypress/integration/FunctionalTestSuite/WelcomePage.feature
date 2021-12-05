Feature: Validate Welcome Page.

    Validate the elements on Welcome Page and check all possible navigations from Welcome Page.

    Background: Login and Navigate to Welcome Page.
        Given User is logged into the Swimlane application.
        When Navigated to Welcome Page.

    Scenario: Check WelcomePage title contains Swimlane.
        Then WelcomePage title must contain "Swimlane".