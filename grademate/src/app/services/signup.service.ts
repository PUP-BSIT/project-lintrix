import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class SignupService {
  private signupUrl = 'http://localhost/php-project';
  //private signupUrl = 'https://grademate.tech/api';

  constructor(private http: HttpClient) {}

  signup(data: any): Observable<any> {
    return this.http.post<any>(`${this.signupUrl}/signup.php`, data, { observe: 'response' });
  }
}