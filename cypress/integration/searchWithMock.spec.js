/// <reference types="cypress" />

describe("Searching function test with mock", () => {
     it("every found book should contain search term and be 10 books on a page", () => {
         //from commands
        cy.getBooks()

        //from commands
        cy.getSearch('react')

        cy.contains(/found books: 10/i).should('be.visible')

        cy.get(".card")
            .should("be.visible")
            .and("have.length", 10)

        cy.get('.card')
            .should($card => {
                expect($card).to.contain("React", { matchCase: false })
            })
     })
})


