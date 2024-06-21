import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUrl: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe(() => {
      this.currentUrl = this.router.url;
    });
  }

  isAuthRoute(): boolean {
    return this.currentUrl === '/login' || this.currentUrl === '/signup';
  }

  isDashboardRoute(): boolean {
    return this.currentUrl === '/dashboard';
  }
}
