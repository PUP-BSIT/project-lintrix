import { Component, EventEmitter, Output } from '@angular/core';
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

  @Output() navigate = new EventEmitter<string>();

  onSubmit() {
    console.log('Firstname:', this.firstname);
    console.log('Middlename:', this.middlename);
    console.log('Lastname:', this.lastname);
    // Handle signup logic here

    this.navigate.emit('login');
  }

}
