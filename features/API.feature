Feature: API Testing for Ecommerce Application
  # Author: Ghada Trabelsi

  Background:
    Given I have API access to the ecommerce application

  Scenario: Login and get token
    When I login with valid credentials
    Then I should receive a valid authentication token

  Scenario: Create a new order
    Given I am authenticated with a valid token
    When I create an order with product details
    Then the order should be created successfully
    And I should receive an order ID

  Scenario: Get order details
    Given I have a valid order ID
    When I request the order details
    Then I should receive the order information

  Scenario: Delete an order
    Given I have a valid order ID
    When I delete the order
    Then the order should be deleted successfully