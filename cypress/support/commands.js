// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { Login } from "../pages/login/login.js";
const login = new Login();
Cypress.Commands.add('login', (email, password) => {
    const baseURL = 'https://practice.expandtesting.com/notes/app/'
    cy.session([email, password], ()=> {
      cy.visit(baseURL);
      cy.get('.btn-primary').click()
      login.enterEmailAddress(email);
      login.enterPassword(password);
      login.clickLoginButton()
      cy.wait(2000)
    }).then(()=>{
        cy.visit(baseURL);
        cy.wait(2000)
    })

})