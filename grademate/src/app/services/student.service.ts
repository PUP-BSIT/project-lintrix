import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {
  private apiUrl = 'http://localhost/php-project/student.php';
  //private apiUrl = 'https://grademate.tech/api/student.php';

  constructor(private http: HttpClient) {}

  getStudent(): Observable<any> {
    return this.http.get(this.apiUrl, { withCredentials: true });
  }

  createStudent(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { withCredentials: true });
  }

  updateStudent(data: any): Observable<any> {
    return this.http.put(this.apiUrl, data, { withCredentials: true });
  }

  deleteStudent(id: number): Observable<any> {
    const url = `${this.apiUrl}?id=${id}`;
    return this.http.delete(url, { withCredentials: true });
  }
}