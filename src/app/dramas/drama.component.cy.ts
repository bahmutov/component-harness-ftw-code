import { DramaService } from './../drama.service'
import { DramaComponent } from './drama.component'
import { Drama } from '../models/dramas'

const dramaService = new DramaService()
const dramas: Drama[] = dramaService.getDramas()

it('shows list of dramas', { viewportHeight: 1000, viewportWidth: 600 }, () => {
  const template =
    '<app-drama *ngFor="let d of dramas" [drama]="d"></app-drama>'
  cy.mount(template, {
    declarations: [DramaComponent],
    componentProperties: {
      dramas: dramas,
    },
  })
})

it('shows one drama', () => {
  cy.mount(DramaComponent, {
    componentProperties: {
      drama: dramas[0],
    },
  })
})
