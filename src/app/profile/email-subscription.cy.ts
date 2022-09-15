import { EmailSubscriptionComponent } from './email-subscription.component'
import { NoopAnimationsModule } from '@angular/platform-browser/animations'
import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'

describe('EmailSubscriptionComponent', () => {
  it('works', () => {
    const template = `
      <div class="my-9 bg-zinc-50 border border-slate-400 rounded-lg">
        <app-email-subscription (emailSubscription)="onEmailSubscription($event)"></app-email-subscription>
      </div>
    `
    cy.mount(template, {
      declarations: [EmailSubscriptionComponent],
      imports: [
        NoopAnimationsModule,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSlideToggleModule,
        MatButtonModule,
        MatIconModule,
      ],
      componentProperties: {
        onEmailSubscription: cy.stub().as('onEmailSubscription'),
      },
    })
    const email = 'email@email.email'
    cy.get('input:checkbox[role=switch]').should('be.disabled')
    cy.get('input[type=email]').type(email)
    cy.get('input:checkbox[role=switch]').should('be.enabled')
    // needs a better selector
    cy.contains('button', 'add_box').click()
    cy.get('@onEmailSubscription').should('be.calledOnceWithExactly', {
      email,
      subscribe: true,
    })
  })
})
