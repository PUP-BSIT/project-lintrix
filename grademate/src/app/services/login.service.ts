import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class LoginService {
  private loginUrl = 'http://localhost/php-project/login.php';
  //private loginUrl = 'https://grademate.tech/api/login.php';
  
  constructor(private http: HttpClient) {}
  
  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials, { withCredentials: true });
  }
}
