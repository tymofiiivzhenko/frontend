/// <reference types="cypress" />

describe('Authentication E2E Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Повинен успішно виконати сценарій логіну', () => {
    cy.contains('Вхід').click();
    cy.url().should('include', '/login');

    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');

    cy.contains('button', 'Увійти').click();

    cy.url().should('equal', 'http://localhost:4200/');
    cy.contains('test@example.com').should('be.visible');
  });

  it('Повинен забороняти доступ до /add-item без логіну', () => {
    cy.visit('http://localhost:4200/add-item');
    cy.url().should('include', '/login');
  });

  it('Повинен успішно виконати реєстрацію', () => {
    cy.contains('Реєстрація').click();
    cy.url().should('include', '/register');

    cy.get('input[id="username"]').type('newuser');
    cy.get('input[id="email"]').type('newuser@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.get('input[id="confirmPassword"]').type('password123');

    cy.contains('button', 'Зареєструватися').click();

    cy.url().should('equal', 'http://localhost:4200/');
    cy.contains('newuser@example.com').should('be.visible');
  });

  it('Повинен успішно виконати логаут', () => {
    cy.contains('Вхід').click();
    cy.get('input[id="email"]').type('test@example.com');
    cy.get('input[id="password"]').type('password123');
    cy.contains('button', 'Увійти').click();

    cy.contains('test@example.com').should('be.visible');
    cy.contains('Вихід').click();

    cy.url().should('equal', 'http://localhost:4200/');
    cy.contains('test@example.com').should('not.exist');
  });
});
