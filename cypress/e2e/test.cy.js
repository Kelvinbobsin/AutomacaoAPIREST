/// <reference types= "cypress"/>


describe('Feature produtos', () => {
    beforeEach(() => {
        cy.visit('produtos')
    });

    it('produtos lista', () => {
        cy.get('.products > .row')
        cy.get('.post-3647 > .product-block')
        // .contains('Angus All-Weather Tank')
        .click()
        cy.get('.product_title').should('contain','Argus All-Weather Tank')
        cy.get('.product_title').should('exist')
    });

});

describe('Conta', () => {
    beforeEach(() => {
        cy.visit('minha-conta')
    });

    it('conta', () => {
        cy.get('.page-title').should('exist')
        cy.get('.page-title').should('contain.text','Minha conta')
    });
});