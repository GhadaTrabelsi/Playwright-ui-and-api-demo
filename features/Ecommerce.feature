# Author: Ghada Trabelsi
Feature: Ecommerce validation
@regression
  Scenario: Placing an order for a product
    Given a login to the ecommerce website with valid credentials "tghada0211@gmail.com" and "password"
    When add "ZARA COAT 3" to the shopping cart
    Then verify that "ZARA COAT 3" is added to the shopping cart
    When proceed to checkout and place the order with "India" as the country
    Then verify that the order is placed successfully in the order history

 
