import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedMenu: string | null = 'home';
  selectedSubMenu: string | null = '';
  newCourseName: string = '';
  editCourseName: string = '';
  courses: string[] = [];
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  courseToEditIndex: number | null = null;
  courseToDeleteIndex: number | null = null;

  selectMenu(menu: string): void {
    if (this.selectedMenu === menu) {
      this.selectedMenu = null;
    } else {
      this.selectedMenu = menu;
    }
    this.selectedSubMenu = null;
  }

  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  addCourse(): void {
    if (this.newCourseName.trim()) {
      this.courses.push(this.newCourseName.trim());
      this.newCourseName = '';
      this.closeModal();
    }
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }

  openEditModal(course: string, index: number): void {
    this.editCourseName = course;
    this.courseToEditIndex = index;
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.courseToEditIndex = null;
  }

  updateCourse(): void {
    if (this.editCourseName.trim() && this.courseToEditIndex !== null) {
      this.courses[this.courseToEditIndex] = this.editCourseName.trim();
      this.editCourseName = '';
      this.courseToEditIndex = null;
      this.closeEditModal();
    }
  }

  openDeleteModal(index: number): void {
    this.courseToDeleteIndex = index;
    this.isDeleteModalOpen = true;
  }

  closeDeleteModal(): void {
    this.isDeleteModalOpen = false;
    this.courseToDeleteIndex = null;
  }

  confirmDelete(): void {
    if (this.courseToDeleteIndex !== null) {
      this.courses.splice(this.courseToDeleteIndex, 1);
      this.courseToDeleteIndex = null;
      this.closeDeleteModal();
    }
  }
}
