/// <reference types="cypress" />

describe("Footer", () => {
    it("should render correct footer", () => {
        cy.visit('http://localhost:3000')
        const year = new Date().getFullYear()
        cy.get(".container > p")
            .should("be.visible")
            .contains(year)

        cy.get('[title="Go to top').should("be.visible")
    })
})