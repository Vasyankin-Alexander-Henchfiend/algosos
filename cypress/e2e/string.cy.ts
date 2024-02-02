/// <reference types="cypress" />

import {
  BUTTON_STRING_PAGE,
  INPUT_STRING_PAGE,
  STRING_PAGE,
} from "../../src/constants/selectors";
import { DELAY_IN_MS } from "../../src/constants/delays";

describe("Тестирование компонента Строка", () => {
  beforeEach(() => {
    cy.visit(STRING_PAGE);
  });
  it("если в инпуте пусто, то кнопка добавления недоступна", () => {
    cy.get(BUTTON_STRING_PAGE).should("be.disabled");
    cy.get(INPUT_STRING_PAGE).type("лялялялля");
    cy.get(BUTTON_STRING_PAGE).should("not.be.disabled");
  });

  it("строка разворачивается корректно", () => {
    cy.get(INPUT_STRING_PAGE).type("1234");
    cy.get(BUTTON_STRING_PAGE).click().should("be.disabled");
    cy.get(INPUT_STRING_PAGE).should("be.empty");
    cy.get("[class*=circle_content]").as("array");

    cy.get("@array").should("have.length", 4);
    let start = 0;
    let end = 3;
    while (start <= end) {
      cy.get("@array").eq(start).children("[class*=circle_changing]");
      cy.get("@array").eq(end).children("[class*=circle_changing]");
      cy.wait(DELAY_IN_MS);
      cy.get("@array").eq(start).children("[class*=circle_modified]");
      cy.get("@array").eq(end).children("[class*=circle_modified]");
      start++;
      end--;
    }
  });
});
