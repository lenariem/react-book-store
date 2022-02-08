/// <reference types="cypress" />

describe("Searching function test with mock", () => {
    beforeEach(() => {
        //from commands
        cy.getBooks()
    })

    it("correct search from user side", () => {
       cy.get("input")
           .type("react")
           .should("have.value", "react")
       
       cy.get('button').contains(/search/i).click()

       cy.contains(/found books: 10/i).should('be.visible')

       cy.get(".card")
           .should("be.visible")
           .and("have.length", 10)

       cy.get('.card')
           .should($card => {
               expect($card).to.contain("React", { matchCase: false })
           })
    })

    it("case insensitive search", () => {
        cy.get("input")
            .type("JAVAscRiPt")
            .should("have.value", "javascript")
    
        cy.get('button').contains(/search/i).click()

        cy.contains(/found books: 10/i).should('be.visible')

        cy.get(".card")
            .should("be.visible")
            .and("have.length", 10)

        cy.get('.card')
            .should($card => {
            expect($card).to.contain("JavaScript", { matchCase: false })
        })
    })

    it("NOT correct search from user side", () => {
        cy.get("input")
            .type("AmvkbjdlglojsjjgvjyQQQfcfslfls")
            .should("have.value", "amvkbjdlglojsjjgvjyqqqfcfslfls")
        
        cy.get('button').contains(/search/i).click()
 
        cy.contains(/found books: 0/i).should('be.visible')
        
        cy.contains(/no goods in shop now/i).should('be.visible')
        
        cy.get(".card").should("not.exist")
     })
 
})