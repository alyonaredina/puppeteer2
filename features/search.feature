Feature: Booking tickets
    Scenario: Should successful booking of two tickets
        Given user is on "/client/index.php" page
        When user selects two tickets
        Then user sees the booked two tickets "Ряд/Место: 8/5, 8/6"

    
    Scenario: Should successful booking of five tickets
        Given user is on "/client/index.php" page
        When user selects five tickets
        Then user sees the booked five tickets "Ряд/Место: 1/6, 1/7, 1/8, 1/9, 1/10"    

    
    Scenario: Should booking is not possible without a choice of seats 
        Given user is on "/client/index.php" page
        When user not selects tickets
        Then user sees that the booking button is not active ""   
        