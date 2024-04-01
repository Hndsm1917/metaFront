
describe('My First Test', () => {
    before(() => {

    })
    it('visits the app root url', () => {
        cy.visit('/')
        cy.contains('h1', 'You did it!')
    })
})
