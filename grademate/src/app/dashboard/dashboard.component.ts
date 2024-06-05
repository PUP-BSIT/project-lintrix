import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedMenu: string | null = null;
  selectedSubMenu: string | null = null;

  selectMenu(menu: string): void {
    if (this.isEqual(this.selectedMenu, menu)) {
      this.selectedMenu = null;
    } else {
      this.selectedMenu = menu;
    }
    this.selectedSubMenu = null; 
  }

  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  isEqual(value1: string | null, value2: string): boolean {
    return Object.is(value1, value2);
  }
}
