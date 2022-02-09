describe('Cart check', () => {
    beforeEach(() => {
        //from commands
        cy.getBooks()

        cy.get('.card-action').find('button').eq(1).click()
        cy.get('.card-action').find('button').eq(2).click()
        cy.get('.card-action').find('button').eq(3).click()

        cy.get('.cart-quantity').should('have.text', '3')

        cy.get('.cart').click()
    })

    it('should be added correct amount of books to cart', () => {
        cy.get('.collection-item.avatar').should('have.length', 3)
    })

    it('should display correct titles', () => {
        const titlesInCart = [
            'The Art of 64-Bit Assembly',
            'The Book of Inkscape, 2nd Edition',
            'Rust for Rustaceans'
        ]

        cy.get('.title')
            .each(($el, i) => {
                expect($el.text()).to.equal(titlesInCart[i]);
            });
    })

    it('should be correct price', () => {
        cy.get('.cartContainer').should('contain', '126.51$')
    })

    it('change amount of books in cart', () => {
        cy.get('.cartQuantity').contains('add').click()
        cy.get('.cartContainer').should('contain', '186.27$')

        cy.get('.cartQuantity').contains('remove').click()
        cy.get('.cartContainer').should('contain', '126.51$')
    })

    it('user cannot chose negative amount of books', () => {
        cy.get('.cartQuantity').contains('remove').click()
        cy.get('.cartContainer').should('contain', '66.75$')
        cy.get('.collection-item.avatar > p').first().should('contain', '0.00$')

        cy.get('.cartQuantity').contains('remove').click()
        cy.get('.cartContainer').should('contain', '66.75$')
        cy.get('.collection-item.avatar > p').first().should('contain', '0.00$')
    })

    it('delete from cart', () => {
        cy.get('.material-icons.item-delete-icon').first().click()

        cy.get('.collection-item.avatar').should('have.length', 2)
        cy.get('.cartContainer').should('contain', '66.75$')

        cy.get('.material-icons.item-delete-icon').eq(1).click()
        cy.get('.collection-item.avatar').should('have.length', 1)
        cy.get('.cartContainer').should('contain', '36.76$')
    })

    it('user can close and open again cart with chosen books', () => {
        cy.get('[title="close cart"]').click()

        cy.get('.cartContainer').should("not.exist")

        cy.get('.cart').click()
        cy.get('.collection-item.avatar').should('have.length', 3)
    })
})