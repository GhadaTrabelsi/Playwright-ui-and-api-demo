# Author: Ghada Trabelsi
Feature: Ecommerce validation
@validation

  Scenario: Placing an order for a product
    Given a login to the ecommerce website with valid credentials "tghada0211@gmail.com" and "password"
    Then verify Error message is displayed  
