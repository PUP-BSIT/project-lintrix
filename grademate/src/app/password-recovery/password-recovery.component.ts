import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-password-recovery',
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.css'
})
export class PasswordRecoveryComponent {

  emailaddress: string = '';

@Output() navigate = new EventEmitter<string>();

  onSubmit() {
    console.log('EmailAddress:', this.emailaddress);

    this.navigate.emit('forgot-password');
  }

}
