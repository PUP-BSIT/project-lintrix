// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    if (this.email && this.password) {
      console.log('Email:', this.email);
      console.log('Password:', this.password);
      // Handle login logic here, then navigate to dashboard
      this.router.navigate(['/dashboard']);
    } else {
      console.log('Both email and password are required.');
    }
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    // Implement forgot password logic here
    alert('Forgot password functionality not implemented yet.');
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
