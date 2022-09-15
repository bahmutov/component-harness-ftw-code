import { Injectable } from '@angular/core'

@Injectable({
  providedIn: 'root',
})
export class SigninService {
  private isLoggedInState = false
  public get isLoggedIn() {
    return this.isLoggedInState
  }

  constructor() {}

  public login(): void {
    this.isLoggedInState = true
    console.log('isLoggedInState = true')
  }

  public logout(): void {
    this.isLoggedInState = false
    console.log('isLoggedInState = false')
  }
}
