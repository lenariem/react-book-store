/// <reference types="cypress" />

describe('Purchase of books by the user', () => {
    beforeEach(() => {
        //from commands
        cy.getBooks()
        //check shop cart is empty
        cy.get('.cart-quantity').should('not.exist')
    })
    it('Add book to cart from home page', () => {
        cy.get('.card-action').find('button').first().click()
        //popup added book should appear
        cy.get('#toast-container').should('be.visible')
        cy.get('.cart-quantity').should('have.text', '1')
    })

    it('Add book from search results', () => {
        //from commands
        cy.getSearch('react')

        cy.get('.card-action').find('button').first().click()
        //popup added book should appear
        cy.get('#toast-container').should('be.visible')
        cy.get('.cart-quantity').should('have.text', '1')

        cy.get('.card-action').find('button').eq(2).click()
        cy.get('#toast-container').should('be.visible')
        cy.get('.cart-quantity').should('have.text', '2')
    })

    it('Add books from book description', () => {
        cy.get('.moreBtn').eq(0).click()
        cy.get('.card-action').find('button').first().click()
        cy.get('#toast-container').should('be.visible')
        cy.get('.cart-quantity').should('have.text', '1')

        //from commands
        cy.getSearch('react')
        cy.get('.moreBtn').eq(4).click()
        cy.get('.card-action').find('button').eq(4).click()
        cy.get('#toast-container').should('be.visible')
        cy.get('.cart-quantity').should('have.text', '2')
    })
})

