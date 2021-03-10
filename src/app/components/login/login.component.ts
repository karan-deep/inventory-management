import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from 'src/app/shared/models/inventory';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  login: Login = {
    email: '',
    password: '',
  };
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  logIn() {
    this.authService.login(this.login).subscribe(
      (resultLogin) => {
        this.authService.isLoggedIn = true;
        this.authService.token = resultLogin.token;
        this.router.navigate(['/inventory']);
        localStorage.setItem('token', this.authService.token);
      },
      (error) => {
        console.error(error);
        this.error = error.message;
      }
    );
  }
}
