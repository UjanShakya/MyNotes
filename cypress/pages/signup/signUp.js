export class CreateAccount{
    emailAddress = '[data-testid="register-email"]'
    password = '[data-testid="register-password"]'
    name = '[data-testid="register-name"]'
    confirmPassword = '[data-testid="register-confirm-password"]'
    registerButton = '[data-testid="register-submit"]'
    registerWithGoogle = '[data-testid="login-with-google"]'
    registerWithLinkedIn = '[data-testid="login-with-linkedin"]'
    logInHere = '[data-testid="login-view"] > span'

    enterEmailAddress(data){
        cy.get(this.emailAddress).type(data)
    }
    enterPassword(data){
        cy.get(this.password).type(data)
    }
    enterName(data){
        cy.get(this.name).type(data)
    }
    enterConfirmPassword(data){
        cy.get(this.confirmPassword).type(data)
    }
    clickRegisterButton(){
        cy.get(this.registerButton).click()
    }
    clickRegisterWithGoogle(){
        cy.get(this.registerWithGoogle).click()
    }
    clickRegisterWithLinkedIn(){
        cy.get(this.registerWithLinkedIn).click()
    }
    clickLogInHere(){
        cy.get(this.logInHere).click()
    }
}