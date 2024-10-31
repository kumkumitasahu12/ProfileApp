import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { User } from '../models/user';
import { LoginResponse } from '../models/loginResponse';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private loggedIn = false;
  private apiUrl = 'https://profileapp-7svu.onrender.com/api/Account';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/login`, body).pipe(
      tap(response => {        
        if (response && response.token) {
          this.loggedIn = true;
          localStorage.setItem('token', response.token);
        }
      })
    );
  }

  logout(): void {
    this.loggedIn = false;
    localStorage.removeItem('token'); // Remove token on logout
  }

  isLoggedIn(): boolean {
    return this.loggedIn || !!localStorage.getItem('token'); // Check token presence
  }

  register(userData: User): Observable<any> {
    return this.http.post(`${this.apiUrl }/register`, userData);
  }
}
