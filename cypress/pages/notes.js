export class WelcomeToNotesApp{
    login = '.btn-primary'
    createAnAccount = '[data-testid="open-register-view"]'

    clickLogin(){
        cy.get(this.login).should('be.visible').click()
    }
    clickCreateAnAccount(){
        cy.get(this.createAnAccount).should('be.visible').click()
    }
}