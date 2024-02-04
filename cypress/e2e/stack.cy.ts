/// <reference types="cypress" />

import {
  ADD_BUTTON_STACK_PAGE,
  CLEAR_ALL_BUTTON_STACK_PAGE,
  DELETE_BUTTON_STACK_PAGE,
  INPUT_STACK_PAGE,
  STACK_PAGE,
  CIRCLE_BORDER_CHANGING,
  CIRCLE_BORDER_DEFAULT,
  SMALL_CIRCLE,
} from "../../src/constants/selectors";
import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование компонента Стек", () => {
  beforeEach(() => {
    cy.visit(STACK_PAGE);
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get(ADD_BUTTON_STACK_PAGE).should("be.disabled");
    cy.get(INPUT_STACK_PAGE).type("3");
    cy.get(ADD_BUTTON_STACK_PAGE).should("not.be.disabled");
  });

  it("добавление элемента в стек происходит корректно", () => {
    //добавляем первй эелемент
    cy.get(INPUT_STACK_PAGE).type("3");
    cy.get(ADD_BUTTON_STACK_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(INPUT_STACK_PAGE).should("be.empty");
    cy.get(SMALL_CIRCLE).first().as("firstElement");
    cy.get("@firstElement").contains("3");
    cy.get("@firstElement").contains("top");
    cy.get("@firstElement").contains("0");
    cy.get("@firstElement").children(CIRCLE_BORDER_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@firstElement").children(CIRCLE_BORDER_DEFAULT);

    //добавляем второй эелемент
    cy.get(INPUT_STACK_PAGE).type("34");
    cy.get(ADD_BUTTON_STACK_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(INPUT_STACK_PAGE).should("be.empty");
    cy.get(SMALL_CIRCLE).as("array");
    cy.get("@array")
      .should("have.length", 2)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains("3");
          cy.wrap($el).contains(index);
        }
        if (index === 1) {
          cy.wrap($el).contains("34");
          cy.wrap($el).contains(index);
          cy.wrap($el).contains("top");
          cy.wrap($el).children(CIRCLE_BORDER_CHANGING);
          cy.wait(SHORT_DELAY_IN_MS);
          cy.wrap($el).children(CIRCLE_BORDER_DEFAULT);
        }
      });
  });

  it("удаление элемента из стека происходит корректно", () => {
    cy.get(INPUT_STACK_PAGE).type("3");
    cy.get(ADD_BUTTON_STACK_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(INPUT_STACK_PAGE).should("be.empty");

    cy.get(INPUT_STACK_PAGE).type("34");
    cy.get(ADD_BUTTON_STACK_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(INPUT_STACK_PAGE).should("be.empty");

    cy.get(DELETE_BUTTON_STACK_PAGE).click().should("be.disabled");
    cy.get(SMALL_CIRCLE).as("array");
    cy.get("@array")
      .should("have.length", 2)
      .each(($el, index) => {
        if (index === 0) {
          cy.wrap($el).contains("3");
          cy.wrap($el).contains(index);
        }
        if (index === 1) {
          cy.wrap($el).contains("34");
          cy.wrap($el).contains(index);
          cy.wrap($el).contains("top");
          cy.wrap($el).children(CIRCLE_BORDER_CHANGING);
        }
      });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(DELETE_BUTTON_STACK_PAGE).should("not.be.disabled");
    cy.get("@array").should("have.length", 1).first().as("firstElement");
    cy.get("@firstElement").contains("3");
    cy.get("@firstElement").contains("top");
    cy.get("@firstElement").contains("0");
  });

  it("кнопка «Очистить», отрабатывает корректно", () => {
    cy.get(INPUT_STACK_PAGE).type("3");
    cy.get(ADD_BUTTON_STACK_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(INPUT_STACK_PAGE).should("be.empty");

    cy.get(INPUT_STACK_PAGE).type("34");
    cy.get(ADD_BUTTON_STACK_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(INPUT_STACK_PAGE).should("be.empty");

    cy.get(CLEAR_ALL_BUTTON_STACK_PAGE).should("not.be.disabled").click();
    cy.get(SMALL_CIRCLE).should("have.length", 0);
  });
});
