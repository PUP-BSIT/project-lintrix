import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  @Output() navigate = new EventEmitter<string>();

  onSubmit() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      this.navigate.emit('dashboard');
      // Handle login logic here
    } else {
      console.log('Both email and password are required.');
    }
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    // Your forgot password logic here, for example:
    alert('Forgot password functionality not implemented yet.');
  }
}
