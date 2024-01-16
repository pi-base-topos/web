import { setup } from '../support'

beforeEach(setup)

describe('Loading', () => {
  it('loads', () => {
    cy.visit('/theorems/T000002')

    cy.title().should(
      'eq',
      'T2: Countably compact ⇒ Weakly Countably Compact | π-Base',
    )
    cy.contains('Countably compact ⇒ Weakly Countably Compact')
  })
})

export {}
