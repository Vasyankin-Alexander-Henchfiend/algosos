/// <reference types="cypress" />

import { DELAY_IN_MS } from "../../src/constants/delays";
import {
  BUTTON_FIBONACCI_PAGE,
  FIBONACCI_PAGE,
  INPUT_FIBONACCI_PAGE,
  SMALL_CIRCLE,
} from "../../src/constants/selectors";

describe("Тестирование компонента Последовательность Фибоначчи", () => {
  beforeEach(() => {
    cy.visit(FIBONACCI_PAGE);
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get(BUTTON_FIBONACCI_PAGE).should("be.disabled");
    cy.get(INPUT_FIBONACCI_PAGE).type("3");
    cy.get(BUTTON_FIBONACCI_PAGE).should("not.be.disabled");
  });

  it("числа генерируются корректно", () => {
    cy.get(INPUT_FIBONACCI_PAGE).type("3");
    cy.get(BUTTON_FIBONACCI_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(INPUT_FIBONACCI_PAGE).should("be.empty");
    cy.get(SMALL_CIRCLE).as("array");
    for (let i = 1; i <= 4; i++) {
      cy.get("@array").should("have.length", i);
      cy.wait(DELAY_IN_MS);
    }
    cy.get(BUTTON_FIBONACCI_PAGE).should("be.disabled");
  });
});
