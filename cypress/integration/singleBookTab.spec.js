/// <reference types="cypress" />

describe("Single Book Tabs", () => {
    beforeEach(() => {
        //from commands
        cy.getBooks()
        cy.visit('http://localhost:3000')

        cy.intercept(
            "GET",
            'https://api.itbook.store/1.0/books/*', 
            { fixture: 'singleBook.json' }).as('getOneBook')

        cy.get(".card:nth-child(1) > button").click()
        cy.wait('@getOneBook')
    })

    it("about button should change icon", () => {
        cy.get(".card:nth-child(1) > button")
            .contains('keyboard_backspace')

        cy.get(".card:nth-child(1) > button").click()

        cy.get(".card:nth-child(1) > button")
            .contains('About Book')
        
        cy.get(".card:nth-child(1) > button").click()

        cy.get(".card:nth-child(1) > button")
            .contains('keyboard_backspace')
    })

    it("content of card should be changed on click", () => {
        cy.get(".card:nth-child(1")
            .should("contain", "Author")

        cy.get(".card:nth-child(1) > button").click()

        cy.get(".card-image").should("be.visible")
        
        cy.get(".card:nth-child(1) > button").click()

        cy.get(".card:nth-child(1")
            .should("contain", "Author")
    })

})