import { Login, ForgotPassword } from "../../pages/login/login";
import { WelcomeToNotesApp } from "../../pages/notes";

const login = new Login();
const welcome = new WelcomeToNotesApp();
const forgot = new ForgotPassword();
describe("Login account in the Notes App", ()=>{
    beforeEach(()=>{
        cy.visit("https://practice.expandtesting.com/notes/app/");
        welcome.clickLogin();
    })
    it("Navigate to Login page", {tags : ['smoke','regression']}, ()=>{
        cy.get('h1').should('be.visible').and('contain','Login');
    })
    it('Login with valid data',{tags : ['smoke','regression']}, ()=> {
        cy.fixture('login.json').its('valid').then((data)=>{
            login.enterEmailAddress(data.email);
            login.enterPassword(data.password);
            login.clickLoginButton();
            cy.get('[data-testid="home"]').should('contain',data.expected);
        })
    })
    it('Login with invalid data', {tags : 'regression'}, ()=> {
        cy.fixture('login.json').its('invalid').then((data)=>{
            login.enterEmailAddress(data.email);
            login.enterPassword(data.password);
            login.clickLoginButton();
            cy.get('[data-testid="alert-message"]').should('have.text','Incorrect email address or password');
        })
    })
    it('Login with empty email address only', {tags : 'regression'}, ()=> {
        cy.fixture('login.json').its('valid').then((data)=>{
            login.enterPassword(data.password);
            login.clickLoginButton();
            cy.get(':nth-child(1) > .invalid-feedback').should('have.text','Email address is required');
        })
    })
    it('Login with empty password only', {tags : 'regression'}, ()=> {
        cy.fixture('login.json').its('valid').then((data)=>{
            login.enterEmailAddress(data.email);
            login.clickLoginButton();
            cy.get(':nth-child(2) > .invalid-feedback').should('have.text','Password is required');
        })
    })
    it('Login with empty username and password', {tags : 'regression'}, ()=> {
        cy.get('button[type="submit"]').click();
        cy.get(':nth-child(1) > .invalid-feedback').should('have.text','Email address is required');
        cy.get(':nth-child(2) > .invalid-feedback').should('have.text','Password is required');
    })
    it("Login with Incorrect Email Format", {tags : 'regression'}, ()=>{
        cy.fixture('login.json').its('invalid').then((data)=>{
            login.enterEmailAddress(data.email_format);
            login.enterPassword(data.password);
            login.clickLoginButton();
            cy.get(':nth-child(1) > .invalid-feedback').should('have.text','Email address is invalid');
        })
    })
    it("Login with weak password in the field", {tags : 'regression'}, ()=>{
        cy.fixture('login.json').its('valid').then((data)=>{
            login.enterEmailAddress(data.email);
            login.enterPassword("asd");
            login.clickLoginButton();
            cy.get(':nth-child(2) > .invalid-feedback').should('have.text','Password should be between 6 and 30 characters');
        })
    })
    it("Verify if user can redirected to register an account page if user dont have an account", {tags : ['smoke','regression']}, ()=>{
        login.clickRegister()
        cy.get('h1').should('contain','Register');
    })
})

describe("Forgot Password in the Notes App", ()=>{
    beforeEach(()=>{
        cy.visit("https://practice.expandtesting.com/notes/app/");
        welcome.clickLogin();
        login.clickForgotPassword()
    })
    it("Reset your password with valid data", {tags : ['smoke','regression']}, ()=>{
        cy.fixture('login.json').its('valid').then((data)=>{
            forgot.enterEmailAddress(data.email)
            forgot.clickForgotPasswordSubmit()
            cy.get('[data-testid="alert-message"]').contains(`An e-mail with a link to reset the password has been sent to ${data.email}`)
        })
    })
    it("Reset your password with invalid data", {tags : 'regression'}, ()=>{
        cy.fixture('login.json').its('invalid').then((data)=>{
            forgot.enterEmailAddress(data.email)
            forgot.clickForgotPasswordSubmit()
            cy.get('[data-testid="alert-message"]').should("contain","No account found with the given email address")
        })
    })
    it("Reset your password with Incorrect Email Format", {tags : 'regression'}, ()=>{
        cy.fixture('login.json').its('invalid').then((data)=>{
            forgot.enterEmailAddress(data.email_format)
            forgot.clickForgotPasswordSubmit()
            cy.get('.invalid-feedback').should('have.text','Email address is invalid');
        })
    })
    it("Verify if user can redirected to login page if user have an account",{tags : ['smoke','regression']}, ()=>{
        forgot.clickLogin()
        cy.get('h1').should('be.visible').and('contain','Login');
    })
})