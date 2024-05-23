import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit() {
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
