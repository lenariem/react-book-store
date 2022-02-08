/// <reference types="cypress" />

describe("Footer", () => {
    it("should render correct footer", () => {
        //from commands
        cy.getBooks()
        
        const year = new Date().getFullYear()
        cy.get(".container > p")
            .should("be.visible")
            .contains(year)

        cy.get('[title="Go to top').should("be.visible")
    })
})