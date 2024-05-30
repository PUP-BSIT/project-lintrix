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
    // Here you would send the authentication code to the user's email.
    // Simulating sending the code:
    this.codeSent = true;
    this.message = 'Authentication code sent to ' + this.email;
  }

  verifyAuthCode() {
    // Here you would verify the authentication code.
    // Simulating verification:
    if (this.authCode === '123456') { // replace '123456' with the actual logic to verify the code
      this.message = 'Authentication successful!';
    } else {
      this.message = 'Invalid authentication code. Please try again.';
    }
  }
}

