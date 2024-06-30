export class Login{
    emailAddress = '[data-testid="login-email"]'
    password = '[data-testid="login-password"]'
    loginButton = '[data-testid="login-submit"]'
    register = '[data-testid="register-view"]'
    forgotPassword = '#forgotPasswordLink'
    enterEmailAddress(data){
        cy.get(this.emailAddress).type(data)
    }
    enterPassword(data){
        cy.get(this.password).type(data)
    }
    clickLoginButton(){
        cy.get(this.loginButton).click()
    }
    clickRegister(){
        cy.get(this.register).click()
    }
    clickForgotPassword(){
        cy.get(this.forgotPassword).click()
    }
}

export class ForgotPassword{
    emailAddress = '[data-testid="forgot-password-email"]'
    forgotPasswordSubmit = '[data-testid="forgot-password-submit"]'
    login = '[data-testid="login-view"]'
    enterEmailAddress(data){
        cy.get(this.emailAddress).type(data)
    }
    clickForgotPasswordSubmit(){
        cy.get(this.forgotPasswordSubmit).click()
    }
    clickLogin(){
        cy.get(this.login).click()
    }
}