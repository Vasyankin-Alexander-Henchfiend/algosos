/// <reference types="cypress" />

import { BASE_URL } from "../../src/constants/selectors";

describe("приложение запустилось", () => {
  it("приложение доступно по адресу localhost:3000", () => {
    cy.visit(BASE_URL);
  });
});
