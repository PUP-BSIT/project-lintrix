import { Component } from '@angular/core';

@Component({
  selector: 'app-email-auth',
  templateUrl: './email-auth.component.html',
  styleUrls: ['./email-auth.component.css']
})
export class EmailAuthComponent {
  email: string = '';
  authCode: string = '';
  message: string = '';
  codeSent: boolean = false;

  sendAuthCode() {
    this.codeSent = true;
    this.message = 'Authentication code sent to ' + this.email;
  }

  verifyAuthCode() {
    if (this.authCode === '123456') { 
      this.message = 'Authentication successful!';
    } else {
      this.message = 'Invalid authentication code. Please try again.';
    }
  }
}

