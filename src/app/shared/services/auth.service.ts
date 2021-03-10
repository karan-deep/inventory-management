import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Login, Register, Token } from '../models/inventory';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token: string;
  isLoggedIn: boolean;

  register(body: Register) {
    return this.http.post(environment.apiBasePath + 'auth/register', body);
  }

  login(body: Login): Observable<Token> {
    return this.http.post<Token>(environment.apiBasePath + 'auth/login', body);
  }

  logout() {
    this.isLoggedIn = false;
    this.token = '';
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  constructor(private http: HttpClient, private router: Router) {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.isLoggedIn = true;
    }
  }
}
