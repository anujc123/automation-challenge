describe('Problem 2', () => {
  describe('Http: Waiting for network calls', () => {
    let alertStub

    before(() => {
      cy.visit('/section-2.html')
      cy.intercept('http://localhost:8889/todos/*').as('todos')

      alertStub = cy.stub()
      cy.on('window:alert', alertStub)
      cy.get('[data-test="network-call-button"]').click()

      cy.wait('@todos', {
        timeout: 15000,
      }).as('longResponse')
    })

    it('should have status 200 and content', () => {
      cy.get('@longResponse')
          .its('response.statusCode')
          .should('eq', 200)

      cy.get('@longResponse')
          .its('response.body')
          .should('deep.equal', {
            id: 1,
            title: 'Abnormally long network call!',
          })
    })

    it('should show alert', () => {
      expect(alertStub.getCall(0)).to.be.calledWith('Abnormally long network call!')
    })
  })

  describe('Opening a new tab', () => {
    before(() => {
      cy.visit('/section-2.html')
    })

    it('should open a new tab', () => {
      cy.get('[data-test="new-tab-button"]').as('newTabButton')
      cy.get('@newTabButton').parent().invoke('attr', 'target').should('eq', '_blank')
      cy.get('@newTabButton').parent().invoke('removeAttr', 'target').click()

      cy.url().should('eq', 'http://localhost:8080/')
    })
  })
})
