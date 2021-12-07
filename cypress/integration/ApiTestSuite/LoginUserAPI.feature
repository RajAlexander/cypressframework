Feature: User Login API

    API where the users can login to their accounts.

    Background: user/login API
        Given A user enters to the login page.

    Scenario: Valid users.

        When A user provides below user credentials.
            | Username   | Password     |
            | naresh.raj | 8JB2z4#Wu2l! |
        And /login request is intercepted.
        Then Save token and /login response should give 200 status code.
        
    Scenario: Invalid users.

        When A user provides below user credentials.
            | Username   | Password     |
            | naresh.raj | undefined    |
            | undefined  | 8JB2z4#Wu2l! |
            | naresh.raj | null         |
            | null       | 8JB2z4#Wu2l! |
            | null       | undefined    |
        And /login request is intercepted.
        Then /login response should give 401 Unauthorized status code.
