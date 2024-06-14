import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private signupService: SignupService,
    private authService: AuthenticationService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.signupService.login(this.loginForm.value).subscribe({
        next: (response) => {
          if (response.message === 'success') {
            console.log('Login successful', response);
            // Set the logged-in username
            const username = this.loginForm.value.email; // Assuming you use email as the username
            this.authService.setLoggedInUsername(username);
            console.log('Setting logged-in username:', username);
            this.router.navigate(['/dashboard']);
          } else {
            console.log('Login failed', response);
          }
        },
        error: (error) => {
          console.log('Login error', error);
        }
      });
    }
  }

  onForgotPassword(event: Event) {
    event.preventDefault();
    alert('Forgot password functionality not implemented yet.');
  }

  navigateToSignup() {
    this.router.navigate(['/signup']);
  }
}
