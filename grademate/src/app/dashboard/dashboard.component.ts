import { Component } from '@angular/core';

interface Assessment {
  type: string;
  name: string;
  grade: number;
  weight: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  selectedMenu: string | null = 'home';
  selectedSubMenu: string | null = '';
  user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePic: 'path/to/default/profile/pic.jpg'
  };
  newCourseName: string = '';
  editCourseName: string = '';
  courses: string[] = [];
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  courseToEditIndex: number | null = null;
  courseToDeleteIndex: number | null = null;
  isEditAssessmentModalOpen: boolean = false;
  isDeleteAssessmentModalOpen: boolean = false;
  dropdowns: { [key: string]: boolean } = {
    courses: false,
    'grade-entry': false,
  };

  // Assessments
  assessments: Assessment[] = [];
  assessmentTypes: string[] = ['Quiz', 'Activity', 'Exam', 'Project'];
  newAssessmentName: string = '';
  newAssessmentGrade: number | null = null;
  newAssessmentWeight: number | null = null;
  currentAssessmentType: string = '';
  isAssessmentModalOpen: boolean = false;
  assessmentToEditIndex: number | null = null;
  assessmentToDeleteIndex: number | null = null;

  selectMenu(menu: string): void {
    this.selectedMenu = menu;
    this.selectedSubMenu = '';
  }

  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  toggleDropdown(menu: string): void {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }

  onProfilePicChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.user.profilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Courses
  addCourse(): void {
    if (this.newCourseName) {
      this.courses.push(this.newCourseName);
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
  }

  updateCourse(): void {
    if (this.editCourseName && this.courseToEditIndex !== null) {
      this.courses[this.courseToEditIndex] = this.editCourseName;
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
  }

  confirmDelete(): void {
    if (this.courseToDeleteIndex !== null) {
      this.courses.splice(this.courseToDeleteIndex, 1);
      this.courseToDeleteIndex = null;
      this.closeDeleteModal();
    }
  }

  // Assessment Modal
  openAssessmentModal(assessmentType: string): void {
    this.currentAssessmentType = assessmentType;
    this.newAssessmentName = '';
    this.newAssessmentGrade = null;
    this.newAssessmentWeight = null;
    this.isAssessmentModalOpen = true;
    this.isEditAssessmentModalOpen = false;
  }

  closeAssessmentModal(): void {
    this.isAssessmentModalOpen = false;
    this.isEditAssessmentModalOpen = false;
  }

  addAssessment(): void {
    if (this.newAssessmentName && this.newAssessmentGrade !== null && this.newAssessmentWeight !== null) {
      this.assessments.push({
        type: this.currentAssessmentType,
        name: this.newAssessmentName,
        grade: this.newAssessmentGrade,
        weight: this.newAssessmentWeight
      });
      this.newAssessmentName = '';
      this.newAssessmentGrade = null;
      this.newAssessmentWeight = null;
      this.closeAssessmentModal();
    }
  }

  openEditAssessmentModal(assessment: Assessment, type: string, index: number): void {
    this.currentAssessmentType = type;
    this.newAssessmentName = assessment.name;
    this.newAssessmentGrade = assessment.grade;
    this.newAssessmentWeight = assessment.weight;
    this.isEditAssessmentModalOpen = true;
    this.assessmentToEditIndex = index;
    this.isAssessmentModalOpen = true;
  }

  updateAssessment(): void {
    if (this.assessmentToEditIndex !== null) {
      this.assessments[this.assessmentToEditIndex] = {
        type: this.currentAssessmentType,
        name: this.newAssessmentName,
        grade: this.newAssessmentGrade!,
        weight: this.newAssessmentWeight!
      };
      this.closeAssessmentModal();
    }
  }

  openDeleteAssessmentModal(assessment: Assessment, type: string, index: number): void {
    this.currentAssessmentType = type;
    this.assessmentToDeleteIndex = index;
    this.isDeleteAssessmentModalOpen = true;
  }

  closeDeleteAssessmentModal(): void {
    this.isDeleteAssessmentModalOpen = false;
  }

  confirmDeleteAssessment(): void {
    if (this.assessmentToDeleteIndex !== null) {
      this.assessments.splice(this.assessmentToDeleteIndex, 1);
      this.assessmentToDeleteIndex = null;
      this.closeDeleteAssessmentModal();
    }
  }

  getAssessmentsByType(type: string): Assessment[] {
    return this.assessments.filter(assessment => assessment.type === type);
  }

  getWeightedGrade(assessment: Assessment): number {
    return (assessment.grade * assessment.weight) / 100;
  }

  getTotalByType(type: string): number {
    const assessmentsOfType = this.getAssessmentsByType(type);
    return assessmentsOfType.reduce((total, assessment) => total + this.getWeightedGrade(assessment), 0);
  }

  getGrandTotal(): number {
    return this.assessments.reduce((total, assessment) => total + this.getWeightedGrade(assessment), 0);
  }
}