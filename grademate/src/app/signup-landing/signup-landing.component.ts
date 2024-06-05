import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-signup-landing',
  templateUrl: './signup-landing.component.html',
  styleUrl: './signup-landing.component.css'
})
export class SignupLandingComponent {
  birthday: string = '';
  sex: string = '';
  @Output() navigate = new EventEmitter<string>();

  onSubmit() {
    console.log('Birthday:', this.birthday);
    console.log('Sex:', this.sex);

    this.navigate.emit('login');
  }

}
