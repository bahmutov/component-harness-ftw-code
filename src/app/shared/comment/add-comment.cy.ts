import { AddCommentComponent } from './add-comment.component'
import { FormsModule } from '@angular/forms'

describe('AddCommentComponent', () => {
  beforeEach(() => {
    const template = `
      <app-add-comment (comment)="onCommented($event)"></app-add-comment>
    `
    cy.mount(template, {
      declarations: [AddCommentComponent],
      imports: [FormsModule],
      componentProperties: {
        onCommented: cy.stub().as('onCommented'),
      },
    })
  })

  it('submits a comment', () => {
    cy.get('input[type=text]').should('have.value', '')
    cy.contains('button', 'Add').should('be.disabled')
    const comment = 'TEST TEST'
    cy.get('input[type=text]').type(comment)
    cy.contains('button', 'Add')
      // cy.click only works if the button is no longer disabled
      .click()
    cy.get('@onCommented').should('be.calledOnceWithExactly', comment)
  })

  it('does not allow empty comments', () => {
    const comment = '    '
    cy.get('input[type=text]').type(comment)
    cy.contains('button', 'Add').click()
    cy.get('@onCommented').should('be.calledOnceWithExactly', comment)
  })
})
