import { NavComponent } from './nav.component'
import { SigninService } from '../signin.service'

describe('NavComponent', () => {
  it('should create and show the links', () => {
    const signinService = new SigninService()
    cy.spy(signinService, 'login').as('login')
    cy.spy(signinService, 'logout').as('logout')
    cy.mount(NavComponent, {
      componentProperties: {
        signinService,
      },
    })

    cy.contains('a', 'HOME')
    cy.contains('button', 'LOG IN').should('be.visible').wait(1000).click()
    cy.get('@login').should('have.been.called')

    cy.contains('a', 'HOME')
    cy.contains('a', 'PROFILE').should('be.visible')
    cy.contains('button', 'LOG OUT').should('be.visible').wait(1000).click()
    cy.get('@logout').should('have.been.called')

    cy.contains('a', 'HOME')
    cy.contains('button', 'LOG IN').should('be.visible')
  })
})
