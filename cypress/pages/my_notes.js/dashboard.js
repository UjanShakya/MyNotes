export class Dashboard{
    searchField = '[data-testid="search-input"]'
    searchButton = '[data-testid="search-btn"]'
    addNote = '[data-testid="add-new-note"]'
    viewButton = '[data-testid="note-view"]'
    editButton = '[data-testid="note-edit"]'
    deleteButton = '[data-testid="note-delete"]'
    deleteConfirm = '[data-testid="note-delete-confirm"]'
    deleteCancel = '[data-testid="note-delete-cancel-2"]'
    toggle = '[data-testid="toggle-note-switch"]'
    categoryAll = '[data-testid="category-all"]'
    categoryHome = '[data-testid="category-home"]'
    categoryWork = '[data-testid="category-work"]'
    categoryPersonal = '[data-testid="category-personal"]'

    enterSearchField(data){
        cy.get(this.searchField).clear().type(data)
    }
    clickSearchButton(){
        cy.get(this.searchButton).click()
    }
    clickAddNote(){
        cy.get(this.addNote).click()
    }
    clickViewButton(){
        cy.get(this.viewButton).click()
    }
    clickEditButton(data){
        cy.get(this.editButton).click(data)
    }
    clickDeleteButton(data){
        cy.get(this.deleteButton).click(data)
    }
    clickDeleteConfirm(data){
        cy.get(this.deleteConfirm).click(data)
    }
    clickDeleteCancel(data){
        cy.get(this.deleteCancel).click(data)
    }
    clickToggle(data){
        cy.get(this.toggle).click(data)
    }
    clickCategoryAll(data){
        cy.get(this.categoryAll).click(data)
    }
    clickCategoryHome(data){
        cy.get(this.categoryHome).click(data)
    }
    clickCategoryWork(data){
        cy.get(this.categoryWork).click(data)
    }
    clickCategoryPersonal(data){
        cy.get(this.categoryPersonal).click(data)
    }
}

export class addNewNote{
    categoryDropdown = '[data-testid="note-category"]'
    completedCheckbox = '[data-testid="note-completed"]'
    title = '[data-testid="note-title"]'
    description = '[data-testid="note-description"]'
    create = '[data-testid="note-submit"]'
    cancel = '[data-testid="note-cancel"]'

    selectCategoryDropdown(data){
        cy.get(this.categoryDropdown).select(data);
    }
    clickCompletedCheckbox(){
        cy.get(this.completedCheckbox).click()
    }
    enterTitle(data){
        cy.get(this.title).clear().type(data)
    }
    enterDescription(data){
        cy.get(this.description).clear().type(data)
    }
    clickCreate(){
        cy.get(this.create).click()
    }
    clickCancel(){
        cy.get(this.cancel).click()
    }

}