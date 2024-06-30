import { Dashboard, addNewNote } from "../../pages/my_notes.js/dashboard";


const dash = new Dashboard();
const add = new addNewNote();

describe("Dashboard in the Notes App", ()=>{
    beforeEach(()=>{
        cy.fixture('login.json').its('valid').then((data)=>{
            cy.login(data.email,data.password);
        })
    })
    it("Navigate to Dashboard page", {tags : ['smoke','regression']}, ()=>{
        cy.get('[data-testid="home"]').should('be.visible').and('contain','MyNotes');
    })
    context("Add Note in the Notes App", ()=>{
        it("Add new note in the dashboard with the valid data", {tags : ['smoke','regression']}, ()=>{
            dash.clickAddNote();
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                add.selectCategoryDropdown(data.category);
                add.clickCompletedCheckbox();
                add.enterTitle(data.title);
                add.enterDescription(data.description);
                add.clickCreate();
                //assertions
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                cy.get('[data-testid="note-card-title"]').should('contain',data.title);
            })
        })
        it("Add new note in the dashboard with the invalid title", {tags : 'regression'}, ()=>{
            dash.clickAddNote();
            cy.fixture('my_notes/dashboard.json').its('addNote_invalid').then((data)=>{
                add.clickCompletedCheckbox();
                add.enterTitle(data.title);
                add.enterDescription("testing");
                add.clickCreate();
                cy.get(':nth-child(3) > .invalid-feedback').should('contain','Title should be between 4 and 100 characters');
            
            })
        })
        it("Add new note in the dashboard with the invalid description", {tags : 'regression'}, ()=>{
            dash.clickAddNote();
            cy.fixture('my_notes/dashboard.json').its('addNote_invalid').then((data)=>{
                add.clickCompletedCheckbox();
                add.enterTitle("asdsd");
                add.enterDescription(data.description);
                add.clickCreate();
                cy.get(':nth-child(4) > .invalid-feedback').should('contain','Description should be between 4 and 1000 characters');
            
            })
        })
        it("Add new note in the dashboard with empty data in the fields", {tags : 'regression'}, ()=>{
            dash.clickAddNote();
            add.clickCreate();
            cy.get(':nth-child(3) > .invalid-feedback').should('contain','Title is required');
            cy.get(':nth-child(4) > .invalid-feedback').should('contain','Description is required');
        })
        it("Cancel button in add new note", {tags : 'regression'}, ()=>{
            dash.clickAddNote();
            add.clickCancel()
            cy.get('[data-testid="progress-info"]').should('be.visible')
        })
        it("View Notes in the Notes app", {tags : ['smoke','regression']}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickViewButton();
                cy.get('[data-testid="note-card-title"]').should('be.visible').and('contain',data.title)
            })
        })
        it("To verify if notes is not completed it displays title in yellow color", {tags : ['smoke','regression']}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickToggle();
                cy.get('[data-testid="note-card-title"]').should('be.visible').should('have.css', 'background-color', 'rgb(255, 145, 0)');
            })
        })
        it("To verify if notes is completed it displays title in grey color", {tags : ['smoke','regression']}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickToggle();
                cy.get('[data-testid="note-card-title"]').should('be.visible').should('have.css', 'background-color', 'rgba(40, 46, 41, 0.6)');
            })
        })
    })
    context("Edit Note in the Notes App", ()=>{
        it("Edit note in the dashboard with the invalid title", {tags : 'regression'}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickEditButton()
            })
            cy.fixture('my_notes/dashboard.json').its('editNote_invalid').then((data)=>{
                add.clickCompletedCheckbox();
                add.enterTitle(data.title);
                add.enterDescription("testing");
                add.clickCreate();
                cy.get(':nth-child(3) > .invalid-feedback').should('contain','Title should be between 4 and 100 characters');
            
            })
        })
        it("Edit note in the dashboard with the invalid description", {tags : 'regression'}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickEditButton()
            })
            cy.fixture('my_notes/dashboard.json').its('editNote_invalid').then((data)=>{
                add.clickCompletedCheckbox();
                add.enterTitle("asdsd");
                add.enterDescription(data.description);
                add.clickCreate();
                cy.get(':nth-child(4) > .invalid-feedback').should('contain','Description should be between 4 and 1000 characters');
            
            })
        })
        it("Edit note in the dashboard with empty data in the fields", {tags : 'regression'}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickEditButton()
            })
            cy.get(add.title).clear()
            cy.get(add.description).clear()
            add.clickCreate();
            cy.get(':nth-child(3) > .invalid-feedback').should('contain','Title is required');
            cy.get(':nth-child(4) > .invalid-feedback').should('contain','Description is required');
        })
        it("Cancel button in edit note", {tags : 'regression'}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickEditButton()
            })
            add.clickCancel()
            cy.get('[data-testid="progress-info"]').should('be.visible')
        })
        it("Edit new note in the dashboard with the valid data", {tags : ['smoke','regression']}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('addNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickEditButton()
            })
            cy.fixture('my_notes/dashboard.json').its('editNote_valid').then((data)=>{
                add.selectCategoryDropdown(data.category);
                add.clickCompletedCheckbox();
                add.enterTitle(data.title);
                add.enterDescription(data.description);
                add.clickCreate();
                //assertions
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                cy.get('[data-testid="note-card-title"]').should('contain',data.title);
            })
        })
    })
    context("Delete Note in the Notes App", ()=>{
        it("Cancel button in Delete note in the dashboard", {tags : 'regression'}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('editNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickDeleteButton()
                dash.clickDeleteCancel()
                cy.get('[data-testid="progress-info"]').should('be.visible') 
            })
        })
        it("Delete Confirm button in Delete note in the dashboard", {tags : ['smoke','regression']}, ()=>{
            cy.fixture('my_notes/dashboard.json').its('editNote_valid').then((data)=>{
                dash.enterSearchField(data.title);
                dash.clickSearchButton();
                dash.clickDeleteButton()
                dash.clickDeleteConfirm()
                cy.get('[data-testid="no-notes-message"]').should('be.visible').and('contain',"Couldn't find any notes in all categories")
            })
        })
    })
})

