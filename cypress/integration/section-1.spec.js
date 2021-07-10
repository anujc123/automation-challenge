describe('Problem 1', () => {
  before(() => {
    cy.visit('/section-1.html')
  })

  describe('DOM tables', () => {
    beforeEach(() => {
      cy.get('[data-test="user-table"]').as('table')
      cy.get('@table').find('tr[data-test="table-header"]').as('headerRow')
      cy.get('@table').find('tr:not([data-test="table-header"])').as('dataRows')
    })

    it('Assert that the table is not visible', () => {
      cy.get('@table').should('not.be.visible')
    })

    it('After clicking the "Show table" button, assert the table is visible', () => {
      cy.get('[data-test="table-toggle-button"]').click()
      cy.get('@table').should('be.visible')
    })

    it('Assert that the table is 5 columns wide', () => {
      cy.get('@table').find('tr:first-child').children().should('have.length', 5)
    })

    it('Assert that the table is 10 rows long, excluding the first (header) row', () => {
      cy.get('@dataRows').should('have.length', 10)
    })

    it('Assert that at least 5 entries have the role "user"', () => {
      cy.get('@headerRow').contains('th', 'Role').invoke('index').then((index) => {
        cy.get('@dataRows').find(`th:nth-child(${index + 1})`).filter(':contains(user)').should('have.length.gte', 5)
      })
    })

    it('Assert there are exactly 3 people older than 60 years old', () => {
      cy.get('@headerRow').contains('th', 'D.O.B').invoke('index').then((index) => {
        cy.get('@dataRows').find(`th:nth-child(${index + 1})`).filter((i, $th) => {
          const yearParts = $th.innerText.split('/')
          const year = parseInt(yearParts[2], 10)
          const currentYear = new Date().getFullYear()

          return currentYear - year > 60
        }).should('have.length', 3)
      })
    })
  })

  describe('Form', () => {
    beforeEach(() => {
      cy.get('[data-test="signup-form"]').as('form')
    })

    it('Assert that the form is not visible', () => {
      cy.get('@form').should('not.be.visible')
    })

    it('After clicking the "Show form" button, assert that the form is visible', () => {
      cy.get('[data-test="form-toggle-button"]').click()
      cy.get('@form').should('be.visible')
    })

    it('Fill in the "Name" and "Age" inputs, and assert that both inputs are filled', () => {
      cy.get('[data-test="full-name-input"]').type('Anusha JC').invoke('val').should('not.be.empty')
      cy.get('[data-test="age-input"]').type('25').invoke('val').should('not.be.empty')
    })

    it('Select "Female" from the select option, and assert that the value is "female"', () => {
      cy.get('[data-test="gender-select"]').select('Female').should('have.value', 'female')
    })

    it('Tick the "Nurse" checkbox and assert that the value "nurse" is true', () => {
      cy.get('[data-test="nurse-input"]').check().should('be.checked')
    })

    it('Click on the "Submit" button and assert that there is an alert window showing with the text "Form submitted!"', () => {
      cy.get('[data-test="submit-btn"]').click()
      cy.on('window:alert', (txt) => {
        expect(txt).to.contains('Form submitted!')
      })
    })
  })
})
