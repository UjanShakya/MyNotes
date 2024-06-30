import { CreateAccount } from "../../pages/signup/signUp";
import { WelcomeToNotesApp } from "../../pages/notes";
import { faker } from '@faker-js/faker';

const create = new CreateAccount();
const welcome = new WelcomeToNotesApp();
const randomEmail = faker.internet.email();
const randomPassword = faker.internet.password();
const randomName = faker.person.fullName();
const confirmPassword = randomPassword;
describe("Register account in the Notes App", ()=>{
    beforeEach(()=>{
        cy.visit("https://practice.expandtesting.com/notes/app/");
        welcome.clickCreateAnAccount();
    })

    it("Navigate to Register the account page", {tags : ['smoke','regression']}, ()=>{
        cy.get('h1').should('contain','Register');
        cy.get('[data-testid="login-form"] > p').should('contain',' Using a valid email address is highly recommended. This will enable you to reset your password if you forget it.');
    })
    it("Register an account with the valid data in the fields", {tags : ['smoke','regression']}, ()=>{
        create.enterEmailAddress(randomEmail);
        create.enterPassword(randomPassword);
        create.enterName(randomName);
        create.enterConfirmPassword(confirmPassword);
        create.clickRegisterButton();
        cy.get('.alert').should("be.visible").contains("User account created successfully");
    })
    it("Register an account with the empty data in the fields", {tags : 'regression'}, ()=>{
        create.clickRegisterButton();
        cy.get(':nth-child(1) > :nth-child(1) > .invalid-feedback').should('contain','Email address is required')
        cy.get(':nth-child(2) > .mb-2 > .invalid-feedback').should('contain','Password is required')
        cy.get(':nth-child(1) > :nth-child(2) > .invalid-feedback').should('contain','User name is required')
        cy.get('.mb-3 > .invalid-feedback').should('contain','Confirm Password is required')

    })
    it("Register an account with existing email address", {tags : 'regression'}, ()=>{
        cy.fixture('signUp.json').its('add_invalid').then((data)=>{
            create.enterEmailAddress(data.existing_email);
            create.enterPassword(randomPassword);
            create.enterName(randomName);
            create.enterConfirmPassword(confirmPassword);
            create.clickRegisterButton();
            cy.get('[data-testid="alert-message"]').should("be.visible").contains("An account already exists with the same email address");
        })
    })
    it("Register an account with Password and Confirmation Mismatch", {tags : 'regression'}, ()=>{
        cy.fixture('signUp.json').its('add_invalid').then((data)=>{
            create.enterEmailAddress(randomEmail);
            create.enterPassword(data.password);
            create.enterName(randomName);
            create.enterConfirmPassword(data.confirmPassword);
            create.clickRegisterButton();
            cy.get('.mb-3 > .invalid-feedback').should('contain',"Passwords don't match!")
        })
    })
    it("Register an account with Invalid Email Format", {tags : 'regression'}, ()=>{
        cy.fixture('signUp.json').its('add_invalid').then((data)=>{
            create.enterEmailAddress(data.email);
            create.enterPassword(randomPassword);
            create.enterName(randomName);
            create.enterConfirmPassword(confirmPassword);
            create.clickRegisterButton();
            cy.get(':nth-child(1) > :nth-child(1) > .invalid-feedback').should('contain',"Email address is invalid")
        })
    })
    it("Register an account with weak password in the fields", {tags : 'regression'},()=>{
        cy.fixture('signUp.json').its('add_invalid').then((data)=>{
            create.enterEmailAddress(randomEmail);
            create.enterPassword(data.weak_password);
            create.enterName(randomName);
            create.enterConfirmPassword(data.weak_password);
            create.clickRegisterButton();
            cy.get(':nth-child(2) > .mb-2 > .invalid-feedback').should('contain',"Password should be between 6 and 30 characters")
        })
    })
    it("Register an account with weak username", {tags : 'regression'}, ()=>{
        cy.fixture('signUp.json').its('add_invalid').then((data)=>{
            create.enterEmailAddress(randomEmail);
            create.enterPassword(randomPassword);
            create.enterName(data.weak_username);
            create.enterConfirmPassword(confirmPassword);
            create.clickRegisterButton();
            cy.get(':nth-child(1) > :nth-child(2) > .invalid-feedback').should('contain',"User name should be between 4 and 30 characters")
        })
    })
    it("Verify if user can redirected to login page if user have an account", {tags : ['smoke','regression']}, ()=>{
        create.clickLogInHere()
        cy.get('h1').should('be.visible').and('contain','Login');
    })
})