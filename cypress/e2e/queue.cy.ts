/// <reference types="cypress" />

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  QUEUE_PAGE,
  INPUT_QUEUE_PAGE,
  ADD_BUTTON_QUEUE_PAGE,
  DELETE_BUTTON_QUEUE_PAGE,
  CLEAR_ALL_BUTTON_QUEUE_PAGE,
  SMALL_CIRCLE,
  CIRCLE_BORDER_CHANGING,
  CIRCLE_BORDER_DEFAULT,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
} from "../../src/constants/selectors";

describe("Тестирование компонента Очередь", () => {
  beforeEach(() => {
    cy.visit(QUEUE_PAGE);
  });

  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get(ADD_BUTTON_QUEUE_PAGE).should("be.disabled");
    cy.get(INPUT_QUEUE_PAGE).type("ляля");
    cy.get(ADD_BUTTON_QUEUE_PAGE).should("not.be.disabled");
  });

  it("добавления элемента в очередь, происходит корректно", () => {
    for (let i = 0; i <= 2; i++) {
      cy.get(INPUT_QUEUE_PAGE).type("ляля");
      cy.get(INPUT_QUEUE_PAGE).should("be.empty");
      cy.get(ADD_BUTTON_QUEUE_PAGE)
        .should("not.be.disabled")
        .click()
        .should("be.disabled");
      cy.get(SMALL_CIRCLE).should("have.length", 7).as("array");
      if (i === 0) {
        cy.get("@array").eq(i).as("firstElement");
        cy.get("@firstElement").children(CIRCLE_BORDER_CHANGING);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@firstElement").contains("head");
        cy.get("@firstElement").contains("tail");
        cy.get("@firstElement").contains("ляля");
        cy.get("@firstElement").contains(i);
        cy.get("@firstElement").children(CIRCLE_BORDER_DEFAULT);
      } else {
        cy.get("@array").eq(i).as("newElement");
        cy.get("@newElement").children(CIRCLE_BORDER_CHANGING);
        cy.wait(SHORT_DELAY_IN_MS);
        cy.get("@newElement").contains("tail");
        cy.get("@newElement").contains("ляля");
        cy.get("@newElement").contains(i);
        cy.get("@newElement").children(CIRCLE_BORDER_DEFAULT);
      }
    }
  });

  it("удаление элемента из стека происходит корректно", () => {
    for (let i = 0; i <= 2; i++) {
      cy.get(INPUT_QUEUE_PAGE).type("ляля");
      cy.get(INPUT_QUEUE_PAGE).should("be.empty");
      cy.get(ADD_BUTTON_QUEUE_PAGE)
        .should("not.be.disabled")
        .click()
        .should("be.disabled");
      cy.get(SMALL_CIRCLE).should("have.length", 7).as("array");
    }
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(DELETE_BUTTON_QUEUE_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(SMALL_CIRCLE).should("have.length", 7).as("array");
    cy.get("@array").eq(0).as("firstElement");
    cy.get("@array").eq(1).as("secondElement");
    cy.get("@firstElement").children(CIRCLE_BORDER_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(DELETE_BUTTON_QUEUE_PAGE).should("not.be.disabled");
    cy.get("@secondElement").children(CIRCLE_BORDER_DEFAULT);
    cy.get("@secondElement").contains("head");
  });

  it("кнопка «Очистить», отрабатывает корректно", () => {
    for (let i = 0; i <= 2; i++) {
      cy.get(INPUT_QUEUE_PAGE).type("ляля");
      cy.get(INPUT_QUEUE_PAGE).should("be.empty");
      cy.get(ADD_BUTTON_QUEUE_PAGE)
        .should("not.be.disabled")
        .click()
        .should("be.disabled");
      cy.get(SMALL_CIRCLE).should("have.length", 7).as("array");
    }
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get(CLEAR_ALL_BUTTON_QUEUE_PAGE).should("not.be.disabled").click();
    cy.get(SMALL_CIRCLE).should("have.length", 7).as("array");
    cy.get("@array").each(($el) => {
      cy.wrap($el).should("contain.text", "");
      cy.wrap($el).get(CIRCLE_HEAD).should("contain.text", "");
      cy.wrap($el).get(CIRCLE_TAIL).should("contain.text", "");
    });
  });
});
