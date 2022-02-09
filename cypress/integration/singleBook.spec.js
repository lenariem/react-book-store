/// <reference types="cypress" />

describe("Single Book", () => {
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

    it("should render title correct", () => {
        cy.get(".card-content> p:nth-child(1)")
            .should("have.text", "The Official Raspberry Pi Handbook 2022")
            .and("have.css", "font-weight", "400")
    })

    it("should render author correct", () => {
        cy.get("p")
            .contains("Wes Archer, David Crookes, PJ Evans, Gareth Halfacree, Rosie Hattersley, Phil King, Nicola King, KG Orphanides")
            .should("be.visible")
    })

    it("should render language correct", () => {
        cy.get("p")
            .contains("English")
            .should("be.visible")
    })

    it("should render a number of pages correct", () => {
        cy.get("p")
            .contains("204")
            .should("be.visible")
    })

    it("should render a year correct", () => {
        cy.get("p")
            .contains("2021")
            .should("be.visible")
    })

    it("should render a description correct", () => {
        cy.get("p")
            .contains("Get even more from Raspberry Pi with the brand-new")
            .should("be.visible")
    })

    it("should render buy button", () => {
        cy.get(".card-action > button")
            .should("be.visible")
    })
})


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

