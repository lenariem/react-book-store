/// <reference types="cypress" />

describe("Home page", () => {
    beforeEach(() => {
        cy.intercept(
            "GET",
            'https://api.itbook.store/1.0/new', 
            { fixture: 'books.json' }).as('getBooks')

        cy.visit('http://localhost:3000')
        cy.wait('@getBooks')
    })

    it("cart renders correct", () => {
        cy.get(".cart").should("be.visible")
        cy.get(".cart").click()
        cy.get(".cartContainer")
            .should("be.visible")
            .and("contain", "Your cart is empty")
        
        cy.get(".cart").click()
        cy.get(".cartContainer").should("not.exist")
    })

    it("should render 20 books on home page", () => {
        cy.get(".card")
            .should("be.visible")
            .and("have.length", 20)
    })

    it("each book img should have alt attribute", () => {
        cy.get('.card-image > img').each($el => {
            cy.wrap($el).should('have.attr', 'alt')
        })
    })

    it("should render a book covers", () => {
        cy.get('.card-image > img').each($el => {
            cy.wrap($el).should("be.visible")
        })
    })

    it("each card should have about button", () => {
        cy.get('.moreBtn').each($el => {
            cy.wrap($el).should('have.text', 'About Book')
        })
    })

    it("each book should have buy button", () => {
        cy.get(".card-action > button")
            .should("be.visible")
            .and("have.length", 20)
    })
})

