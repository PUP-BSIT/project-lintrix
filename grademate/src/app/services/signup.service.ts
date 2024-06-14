import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class SignupService {

  private registerUrl = 'http://localhost/grademate_db/registration.php';
  private loginUrl = 'http://localhost/grademate_db/login.php';
  private logoutUrl = 'http://localhost/grademate_db/logout.php';
  //private sessionCheckUrl = 'http://localhost/grademate_db/session_check.php';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(this.registerUrl, user);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(this.loginUrl, credentials);
  }

  logout(): Observable<any> {
    return this.http.get(this.logoutUrl);
  }

  /*
  checkSession(): Observable<any> {
    return this.http.get(this.sessionCheckUrl);
  }
  */
}
