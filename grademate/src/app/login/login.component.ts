import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?\/\\-])[a-zA-Z\d!@#$%^&*()_+={}\[\]:;<>,.?\/\\-]{8,16}$/)]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+={}\[\]:;<>,.?\/\\-]).{8,16}/)]]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.showSnackbar('Please fill in all required fields correctly.', 'Close');
      return;
    }

    this.loginService.login(this.loginForm.value).subscribe({
      next: () => {
        this.showSnackbar('Login successful!', 'Close');
        this.loginForm.reset();  // Clear the form fields
        this.router.navigate(['/dashboard']);
      },
      error: error => {
        if (error.message.includes('401')) {
          this.showSnackbar('Invalid username or password.', 'Close');
        } else {
          this.showSnackbar('Something went wrong. Please try again later.', 'Close');
        }
      }
    });
  }

  private showSnackbar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.duration = 5000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';
  
    this.snackBar.open(message, action, config);
  }  
}