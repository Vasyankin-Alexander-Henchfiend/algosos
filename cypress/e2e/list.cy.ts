/// <reference types="cypress" />

import { SHORT_DELAY_IN_MS } from "../../src/constants/delays";
import {
  ADD_BY_INDEX_BUTTON_LIST_PAGE,
  ADD_HEAD_BUTTON_LIST_PAGE,
  ADD_TAIL_BUTTON_LIST_PAGE,
  CIRCLE_BORDER_CHANGING,
  CIRCLE_BORDER_DEFAULT,
  CIRCLE_BORDER_MODIFIED,
  CIRCLE_HEAD,
  CIRCLE_TAIL,
  DELETE_BY_INDEX_BUTTON_LIST_PAGE,
  DELETE_HEAD_BUTTON_LIST_PAGE,
  DELETE_TAIL_BUTTON_LIST_PAGE,
  INDEX_INPUT_LIST_PAGE,
  LIST_PAGE,
  NUMBER_INPUT_LIST_PAGE,
  SMALL_CIRCLE,
} from "../../src/constants/selectors";

describe("Тестирование компонента Связный список", () => {
  beforeEach(() => {
    cy.visit(LIST_PAGE);
    cy.get("[class*=list-page_circle-wrapper__]")
      .should("have.length", 4)
      .as("array");
    cy.get("@array").eq(0).as("firstElement");
    cy.get("@array").eq(3).as("lastElement");
  });

  it("если в инпуте ввода значения пусто, то кнопки добавления недоступны", () => {
    cy.get(ADD_HEAD_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(ADD_TAIL_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(NUMBER_INPUT_LIST_PAGE).type("123");
    cy.get(ADD_HEAD_BUTTON_LIST_PAGE).should("not.be.disabled");
    cy.get(ADD_TAIL_BUTTON_LIST_PAGE).should("not.be.disabled");
  });

  it("если в инпуте ввода индекса пусто, то кнопки добавления по индексу недоступны", () => {
    cy.get(ADD_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(DELETE_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(INDEX_INPUT_LIST_PAGE).type("1");
    cy.get(ADD_BY_INDEX_BUTTON_LIST_PAGE).should("not.be.disabled");
    cy.get(DELETE_BY_INDEX_BUTTON_LIST_PAGE).should("not.be.disabled");
    cy.get(INDEX_INPUT_LIST_PAGE).clear().type("12");
    cy.get(ADD_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(DELETE_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(INDEX_INPUT_LIST_PAGE).clear().type("-2");
    cy.get(ADD_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(DELETE_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");
  });

  it("отрисовка дефолтного списка происходит корректно", () => {
    cy.get("@array").each(($el, index, list) => {
      if (index == 0) {
        cy.wrap($el).contains("head");
      } else {
        cy.wrap($el).should("not.have.contain", "head");
      }
      if (index == list.length - 1) {
        cy.wrap($el).contains("tail");
        cy.wrap($el).find("svg").should("not.exist");
      } else {
        cy.wrap($el).should("not.have.contain", "tail");
        cy.wrap($el).find("svg").should("be.visible");
      }
    });
  });

  it("добавление элемента в head происходит корректно", () => {
    cy.get(NUMBER_INPUT_LIST_PAGE).type("123");
    cy.get(ADD_HEAD_BUTTON_LIST_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(ADD_TAIL_BUTTON_LIST_PAGE).should("be.disabled");

    cy.get("@firstElement")
      .find(CIRCLE_HEAD)
      .find(SMALL_CIRCLE)
      .as("smallCircle");

    cy.get("@smallCircle").contains("123");
    cy.get("@smallCircle").children(CIRCLE_BORDER_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@firstElement").contains("head");
    cy.get("@firstElement").contains("123");
    cy.get("@firstElement").find(SMALL_CIRCLE).children(CIRCLE_BORDER_MODIFIED);
    cy.get("@firstElement").find("svg").should("be.visible");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@firstElement").find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
    cy.get(NUMBER_INPUT_LIST_PAGE).should("be.empty");
    cy.get(ADD_HEAD_BUTTON_LIST_PAGE).should("be.disabled");
  });

  it("добавление элемента в tail происходит корректно", () => {
    cy.get(NUMBER_INPUT_LIST_PAGE).type("123");
    cy.get(ADD_TAIL_BUTTON_LIST_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(ADD_HEAD_BUTTON_LIST_PAGE).should("be.disabled");

    cy.get("@lastElement")
      .find(CIRCLE_HEAD)
      .find(SMALL_CIRCLE)
      .as("smallCircle");

    cy.get("@smallCircle").contains("123");
    cy.get("@smallCircle").children(CIRCLE_BORDER_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=list-page_circle-wrapper__]").eq(4).as("newElement");
    cy.get("@newElement").contains("tail");
    cy.get("@newElement").contains("123");
    cy.get("@newElement").find(SMALL_CIRCLE).children(CIRCLE_BORDER_MODIFIED);
    cy.get("@newElement").find("svg").should("not.exist");
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@newElement").find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
    cy.get(NUMBER_INPUT_LIST_PAGE).should("be.empty");
    cy.get(ADD_HEAD_BUTTON_LIST_PAGE).should("be.disabled");
  });

  it("добавление элемента по индексу происходит корректно", () => {
    cy.get(NUMBER_INPUT_LIST_PAGE).type("123");
    cy.get(INDEX_INPUT_LIST_PAGE).type("3");
    cy.get(ADD_BY_INDEX_BUTTON_LIST_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(DELETE_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");

    for (let i = 0; i <= 3; i++) {
      if (i === 1) {
        cy.get("@array").eq(0).contains("head");
      }
      for (let j = 0; j < i; j++) {
        cy.get("@array")
          .eq(j)
          .find("[class*=circle_circle__]")
          .should("have.css", "border", "4px solid rgb(210, 82, 225)");
      }
      cy.get("@array")
        .eq(i)
        .find(CIRCLE_HEAD)
        .find(SMALL_CIRCLE)
        .as("smallCircle");
      cy.get("@smallCircle").contains("123");
      cy.get("@smallCircle").children(CIRCLE_BORDER_CHANGING);
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get(INDEX_INPUT_LIST_PAGE).should("be.empty");
    cy.get(NUMBER_INPUT_LIST_PAGE).should("be.empty");

    cy.get("[class*=list-page_circle-wrapper__]")
      .should("have.length", 5)
      .as("newArray");
    cy.get("@newArray").each(($el, index) => {
      if (index === 3) {
        cy.wrap($el).should("contain.text", "123");
        cy.wrap($el).find(SMALL_CIRCLE).children(CIRCLE_BORDER_MODIFIED);
      } else {
        cy.wrap($el).find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
      }
    });

    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("@newArray").each(($el, index, list) => {
      cy.wrap($el).find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
      if (index === 0) {
        cy.wrap($el).contains("head");
      } else {
        cy.wrap($el).should("not.have.contain", "head");
      }
      if (index === list.length - 1) {
        cy.wrap($el).contains("tail");
        cy.wrap($el).find("svg").should("not.exist");
      } else {
        cy.wrap($el).should("not.have.contain", "tail");
        cy.wrap($el).find("svg").should("be.visible");
      }
    });
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE).should("not.be.disabled");
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE).should("not.be.disabled");
  });

  it("удаление элемента из head происходит корректно", () => {
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE).should("be.disabled");

    cy.get("@firstElement")
      .find(CIRCLE_TAIL)
      .find(SMALL_CIRCLE)
      .as("smallCircle");

    cy.get("@smallCircle").contains("0");
    cy.get("@smallCircle").children(CIRCLE_BORDER_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=list-page_circle-wrapper__]")
      .should("have.length", 3)
      .eq(0)
      .as("firstElement");
    cy.get("@firstElement").contains("head");
    cy.get("@firstElement").contains("34");
    cy.get("@firstElement").contains("0");
    cy.get("@firstElement").find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE).should("not.be.disabled");
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE).should("not.be.disabled");
  });

  it("удаление элемента из tail происходит корректно", () => {
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE).should("be.disabled");

    cy.get("@lastElement")
      .find(CIRCLE_TAIL)
      .find(SMALL_CIRCLE)
      .as("smallCircle");

    cy.get("@smallCircle").contains("1");
    cy.get("@smallCircle").children(CIRCLE_BORDER_CHANGING);
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get("[class*=list-page_circle-wrapper__]").eq(2).as("newElement");
    cy.get("@newElement").contains("tail");
    cy.get("@newElement").contains("8");
    cy.get("@newElement").find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
    cy.get("@newElement").find("svg").should("not.exist");
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE).should("not.be.disabled");
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE).should("not.be.disabled");
  });

  it("удаление элемента по индексу происходит корректно", () => {
    cy.get(INDEX_INPUT_LIST_PAGE).type("3");
    cy.get(DELETE_BY_INDEX_BUTTON_LIST_PAGE)
      .should("not.be.disabled")
      .click()
      .should("be.disabled");
    cy.get(ADD_BY_INDEX_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE).should("be.disabled");
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE).should("be.disabled");

    for (let i = 0; i <= 3; i++) {
      cy.get("@array")
        .eq(i)
        .find(SMALL_CIRCLE)
        .children(CIRCLE_BORDER_CHANGING);
      cy.wait(SHORT_DELAY_IN_MS);
    }

    cy.get("@array").each(($el, index) => {
      if (index === 3) {
        cy.wrap($el).should("contain.text", "");
        cy.wrap($el).find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
        cy.wrap($el).find(CIRCLE_TAIL).find(SMALL_CIRCLE).as("smallCircle");
        cy.get("@smallCircle").contains("1");
        cy.get("@smallCircle").children(CIRCLE_BORDER_CHANGING);
      } else {
        cy.wrap($el).find(SMALL_CIRCLE).children(CIRCLE_BORDER_CHANGING);
      }
    });
    cy.wait(SHORT_DELAY_IN_MS);
    cy.get("[class*=list-page_circle-wrapper__]")
      .should("have.length", 3)
      .as("newArray");
    cy.get("@newArray").each(($el, index, list) => {
      cy.wrap($el).find(SMALL_CIRCLE).children(CIRCLE_BORDER_DEFAULT);
      if (index === 0) {
        cy.wrap($el).contains("head");
      } else {
        cy.wrap($el).should("not.have.contain", "head");
      }
      if (index === list.length - 1) {
        cy.wrap($el).contains("tail");
        cy.wrap($el).find("svg").should("not.exist");
      } else {
        cy.wrap($el).should("not.have.contain", "tail");
        cy.wrap($el).find("svg").should("be.visible");
      }
    });
    cy.get(DELETE_HEAD_BUTTON_LIST_PAGE).should("not.be.disabled");
    cy.get(DELETE_TAIL_BUTTON_LIST_PAGE).should("not.be.disabled");
  });
});
