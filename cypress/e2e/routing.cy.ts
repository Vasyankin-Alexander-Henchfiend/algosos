/// <reference types="cypress" />

import {
  FIBONACCI_PAGE,
  FIBONACCI_PAGE_ID,
  LIST_PAGE,
  LIST_PAGE_ID,
  MAIN_PAGE,
  QUEUE_PAGE,
  QUEUE_PAGE_ID,
  SORTING_PAGE,
  SORTING_PAGE_ID,
  STACK_PAGE,
  STACK_PAGE_ID,
  STRING_PAGE,
  STRING_PAGE_ID,
} from "../../src/constants/selectors";

describe("Тестирование переходов по страницам", () => {
  beforeEach(() => {
    cy.visit(MAIN_PAGE);
  });
  it("корректность перехода на страницу Строка", () => {
    cy.get(STRING_PAGE_ID).click();
    cy.url().should("include", STRING_PAGE);
  });

  it("корректность перехода на страницу Последовательность Фибоначчи", () => {
    cy.get(FIBONACCI_PAGE_ID).click();
    cy.url().should("include", FIBONACCI_PAGE);
  });

  it("корректность перехода на страницу Сортировка массива", () => {
    cy.get(SORTING_PAGE_ID).click();
    cy.url().should("include", SORTING_PAGE);
  });

  it("корректность перехода на страницу Стек", () => {
    cy.get(STACK_PAGE_ID).click();
    cy.url().should("include", STACK_PAGE);
  });

  it("корректность перехода на страницу Очередь", () => {
    cy.get(QUEUE_PAGE_ID).click();
    cy.url().should("include", QUEUE_PAGE);
  });

  it("корректность перехода на страницу Связный список", () => {
    cy.get(LIST_PAGE_ID).click();
    cy.url().should("include", LIST_PAGE);
  });
});
