import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  firstname: string = '';
  middlename: string = '';
  lastname: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    console.log('Firstname:', this.firstname);
    console.log('Middlename:', this.middlename);
    console.log('Lastname:', this.lastname);

    this.router.navigate(['/signup-landing']);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
