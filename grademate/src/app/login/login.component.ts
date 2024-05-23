import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor() {}

  onSubmit() {
    // For now, we'll just log the email and password
    console.log('Email:', this.email);
    console.log('Password:', this.password);
  }
}
