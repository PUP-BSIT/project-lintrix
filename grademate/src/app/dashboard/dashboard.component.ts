import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../auth-service/signup.service';
import { AuthenticationService } from '../auth-service/authenthication.service';

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
export class DashboardComponent implements OnInit {
  selectedMenu: string | null = 'home';
  selectedSubMenu: string | null = '';
  selectedCourses: boolean[] = [];

  profile = {
    image: '',
    profilePic: './assets/profile-pic.png',
    name: 'John Doe',
    username: 'username.john',
    email: 'john.doe@example.com',
    school: 'Polytechnic University of the Philippines',
    gender: 'Male',
    birthday: new Date(1990, 1, 1),
    age: 30
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
  isDeleteSelectedModalOpen: boolean = false;
  dropdowns: any = {
    quizzes: false,
    activities: false,
    exams: false,
    projects: false
  };

  loggedInUsername: string = ''; // Initialize here

  constructor(
    private authService: AuthenticationService,
    private signupService: SignupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Fetch logged-in username when component initializes
    this.loggedInUsername = this.authService.getLoggedInUsername() || ''; // Initialize based on the actual logic
    console.log('Logged in username:', this.loggedInUsername);
  }

  // Assessments
  quizzes: any[] = [];
  selectedCourse: string = '';
  selectedAssessmentType: string = '';
  assessments: Assessment[] = [];
  assessmentTypes: string[] = ['Quiz', 'Activity', 'Exam', 'Project'];
  newAssessmentName: string = '';
  newAssessmentGrade: number | null = null;
  newAssessmentWeight: number | null = null;
  currentAssessmentType: string = '';
  isAssessmentModalOpen: boolean = false;
  assessmentToEditIndex: number | null = null;
  assessmentToDeleteIndex: number | null = null;

  logout(): void {
    this.signupService.logout().subscribe(response => {
      console.log(response);  // Handle the response if needed
      this.router.navigate(['/login']);  // Redirect to login page
    });
  }

  selectMenu(menu: string): void {
    if (menu === 'logout') {
      this.logout();
    } else {
      this.selectedMenu = menu;
      if (menu !== 'courses') {
        this.selectedSubMenu = '';
      }
    }
  }
  

  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  toggleDropdown(menu: string): void {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }

  editImage(): void {
    const uploadImageInput = document.getElementById('uploadImage') as HTMLInputElement;
    uploadImageInput.click();
  }

  onProfilePicChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.profilePic = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  goToAccountInfo(): void {
    this.selectedMenu = 'account';
  }

  // Courses
  addCourse(): void {
    if (this.newCourseName) {
      this.courses.push(this.newCourseName);
      this.newCourseName = '';
      this.selectedCourses.push(false);  // Add false for the new course selection
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
    this.courseToDeleteIndex = null;
  }

  confirmDelete(): void {
    if (this.courseToDeleteIndex !== null) {
      this.courses.splice(this.courseToDeleteIndex, 1);
      this.selectedCourses.splice(this.courseToDeleteIndex, 1);  // Remove corresponding selection
      this.courseToDeleteIndex = null;
      this.closeDeleteModal();
    }
  }

  openDeleteSelectedModal(): void {
    this.isDeleteSelectedModalOpen = true;
  }

  closeDeleteSelectedModal(): void {
    this.isDeleteSelectedModalOpen = false;
  }

  confirmDeleteSelected(): void {
    const indicesToDelete: number[] = [];
    for (let i = 0; i < this.selectedCourses.length; i++) {
      if (this.selectedCourses[i]) {
        indicesToDelete.push(i);
      }
    }
    indicesToDelete.sort((a, b) => b - a); 
    indicesToDelete.forEach(index => {
      this.courses.splice(index, 1);
      this.selectedCourses.splice(index, 1);
    });
    this.closeDeleteSelectedModal();
  }

  toggleSelectAll(event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    this.selectedCourses = this.selectedCourses.map(() => checked);
  }

  anyCourseSelected(): boolean {
    return this.selectedCourses.some(selected => selected);
  }

  checkSelectedCourses(): void {
    if (this.selectedCourses.every(selected => !selected)) {
      const selectAllCheckbox = document.querySelector('input[type="checkbox"]') as HTMLInputElement;
      if (selectAllCheckbox) {
        selectAllCheckbox.checked = false;
      }
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
  get showQuizzes(): boolean {
    return this.selectedAssessmentType === 'Quiz';
  }

  get showActivities(): boolean {
    return this.selectedAssessmentType === 'Activity';
  }

  get showExams(): boolean {
    return this.selectedAssessmentType === 'Exam';
  }

  get showProjects(): boolean {
    return this.selectedAssessmentType === 'Project';
  }

} 