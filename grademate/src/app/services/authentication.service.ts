import { Injectable } from '@angular/core';

@Injectable()
export class AuthenticationService {
    private loggedInUsername: string | null = null;

    constructor() {}

    // Method to get logged-in username
    getLoggedInUsername(): string | null {
      console.log('Getting logged-in username:', this.loggedInUsername);
      return this.loggedInUsername;
    }

    // Method to set logged-in username
    setLoggedInUsername(username: string): void {
      this.loggedInUsername = username;
      console.log('Setting logged-in username:', this.loggedInUsername);
    }
}
