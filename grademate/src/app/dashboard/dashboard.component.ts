import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupService } from '../services/signup.service';
import { StudentService } from '../services/student.service';

interface Assessment {
  name: string;
  grade: string;
  weight: string;
}

type AssessmentType = 'Quiz' | 'Activity' | 'Exam' | 'Project';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedMenu = 'assessment';
  selectedCourses: boolean[] = [];
  selectedSubMenu: string | null = '';
  selectedCourse = '';
  selectedAssessmentType: AssessmentType | '' = '';
  courses: string[] = [];
  assessmentTypes: AssessmentType[] = ['Quiz', 'Activity', 'Exam', 'Project'];

  assessments: Record<AssessmentType, Assessment[]> = {
    Quiz: [],
    Activity: [],
    Exam: [],
    Project: []
  };

  //account
  profile = {
    image: '',
    profilePic: './assets/profile-pic.png',
    name: '',
    username: '',
    email: '',
    school: '',
    gender: '',
    birthday: new Date(1990, 1, 1),
    age: 30
  };

  studentData: any;
  newStudentData: any = {
    first_name: '',
    middle_name: '',
    surname: '',
    email: '',
    birthdate: '',
    gender: '',
    password: '',
    university: '',
    academic_level: '',
    username: ''
  };

  newCourseName: string = '';
  editCourseName: string = '';
  isModalOpen: boolean = false;
  isEditModalOpen: boolean = false;
  isDeleteModalOpen: boolean = false;
  courseToEditIndex: number | null = null;
  courseToDeleteIndex: number | null = null;
  isDeleteSelectedModalOpen = false;
  isLogoutModalOpen: boolean = false;
  dropdowns: Record<string, boolean> = {
    quizzes: false,
    activities: false,
    exams: false,
    projects: false
  };

  loggedInUsername = '';
  logout: any;

  constructor(
    private signupService: SignupService,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit(): void {
    this.getStudent();
    throw new Error('Method not implemented.');
  }

  getStudent() {
    this.studentService.getStudent().subscribe({
      next: data => {
        this.studentData = data;
        this.profile = {
          image: '',
          profilePic: data.profilePic || './assets/profile-pic.png',
          name: data.name,
          username: data.username,
          email: data.email,
          school: data.university || 'Unknown University',
          gender: data.gender,
          birthday: new Date(data.birthdate),
          age: this.calculateAge(new Date(data.birthdate))
        };
      },
      error: error => {
        console.error('Error fetching student data:', error);
      }
    });
  }

  calculateAge(birthday: Date): number {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  createStudent() {
    this.studentService.createStudent(this.newStudentData).subscribe({
      next: data => {
        console.log('Student created:', data);
        this.getStudent(); // Refresh student data
      },
      error: error => {
        console.error('Error creating student:', error);
      }
    });
  }

  updateStudent() {
    this.studentService.updateStudent(this.studentData).subscribe({
      next: data => {
        console.log('Student updated:', data);
        this.getStudent(); // Refresh student data
      },
      error: error => {
        console.error('Error updating student:', error);
      }
    });
  }

  deleteStudent() {
    const studentId = this.studentData.id;
    this.studentService.deleteStudent(studentId).subscribe({
      next: data => {
        console.log('Student deleted:', data);
        this.studentData = null; // Clear student data
      },
      error: error => {
        console.error('Error deleting student:', error);
      }
    });
  }

  /* Darkmode */
  isDarkMode: boolean = false;

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    document.body.classList.toggle('dark-mode', this.isDarkMode);
    const elements = document.querySelectorAll('.header, .sidebar, .content, .table-container, table, th, td, .card, .menu-item, button, .modal-content');
    elements.forEach((element) => {
      element.classList.toggle('dark-mode', this.isDarkMode);
    });
  }

  // Assessments
  quizzes: any[] = [];
  newAssessmentName: string = '';
  newAssessmentGrade: number | null = null;
  newAssessmentWeight: number | null = null;
  currentAssessmentType: string = '';
  isAssessmentModalOpen: boolean = false;
  assessmentToEditIndex: number | null = null;
  assessmentToDeleteIndex: number | null = null;
  
  selectSubMenu(subMenu: string): void {
    this.selectedSubMenu = subMenu;
  }

  toggleDropdown(menu: string): void {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }

  // Courses
  addCourse(): void {
    if (this.newCourseName) {
      this.courses.push(this.newCourseName);
      this.newCourseName = '';
      this.selectedCourses.push(false);
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
      this.selectedCourses.splice(this.courseToDeleteIndex, 1);
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
    const indicesToDelete: number[] = this.selectedCourses
      .map((selected, index) => (selected ? index : -1))
      .filter(index => index !== -1)
      .sort((a, b) => b - a);

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

  addAssessment(type: AssessmentType) {
    this.assessments[type].push({ name: '', grade: '', weight: '' });
  }

  updateAssessment(type: AssessmentType, index: number, field: keyof Assessment, target: EventTarget | null) {
    if (target instanceof HTMLElement) {
      const inputValue = (target as HTMLInputElement).innerText.trim();
  
      switch (field) {
        case 'grade':
          const grade = parseFloat(inputValue);
          this.assessments[type][index].grade = isNaN(grade) ? '' : grade.toString();
          (target as HTMLElement).innerText = this.assessments[type][index].grade;
          break;
        case 'weight':
          const weight = parseFloat(inputValue);
          this.assessments[type][index].weight = isNaN(weight) ? '' : weight.toString();
          break;
      }
    }
  } 
  deleteAssessment(type: AssessmentType, index: number) {
    this.assessments[type].splice(index, 1);
  }

  getAssessmentsByType(type: AssessmentType): Assessment[] {
    return this.assessments[type];
  }

  getWeightedGrade(assessment: Assessment): string {
    return (parseFloat(assessment.grade) * parseFloat(assessment.weight) / 100).toFixed(2);
  }

  getTotalByType(type: AssessmentType): string {
    return this.assessments[type].reduce((total, assessment) => {
      return total + parseFloat(this.getWeightedGrade(assessment));
    }, 0).toFixed(2);
  }

  navigateCell(event: KeyboardEvent): void {
    const target = event.target as HTMLElement;
    const cell = target.closest('td');
    if (!cell) return;

    const row = cell.closest('tr');
    if (!row) return;

    const table = row.closest('table');
    if (!table) return;

    let cellIndex = Array.from(row.children).indexOf(cell);
    let newRow: HTMLElement | null = null;
    let newCell: HTMLElement | null = null;

    switch (event.key) {
        case 'ArrowUp':
            newRow = row.previousElementSibling as HTMLElement;
            if (newRow) {
                newCell = newRow.children[cellIndex] as HTMLElement;
            }
            break;
        case 'ArrowDown':
            newRow = row.nextElementSibling as HTMLElement;
            if (newRow) {
                newCell = newRow.children[cellIndex] as HTMLElement;
            }
            break;
        case 'ArrowLeft':
            if (cellIndex > 0) {
                newCell = row.children[cellIndex - 1] as HTMLElement;
            }
            break;
        case 'ArrowRight':
            if (cellIndex < row.children.length - 1) {
                newCell = row.children[cellIndex + 1] as HTMLElement;
            }
            break;
    }

    if (newCell) {
        newCell.focus();
        event.preventDefault();
    }
}

trackByFn(index: number): number {
  return index;
}

  selectMenu(menu: string) {
    this.selectedMenu = menu;
    if (menu === 'logout') {
      this.openLogoutModal();
    }
  }

  openLogoutModal(): void {
    this.isLogoutModalOpen = true;
  }

  closeLogoutModal(): void {
    this.isLogoutModalOpen = false;
  }

  confirmLogout(): void {
    this.router.navigate(['/login']);
  }



}