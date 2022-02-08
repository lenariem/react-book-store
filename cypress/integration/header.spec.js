/// <reference types="cypress" />

describe("Header", () => {
    it("should render correct header", () => {
        //from commands
        cy.getBooks()
    
        cy.get('[alt="logo"]').should("be.visible")
        cy.get(".logoText").should("have.text", "IT BOOKS")
        cy.get("[title='Repo on GitHub']")
            .should('have.attr', 'href')
            .and('include', 'https://github.com/lenariem/react-it-book-store')
    })
})