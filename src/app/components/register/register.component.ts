import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Register } from 'src/app/shared/models/inventory';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  register: Register = {
    email: '',
    password: '',
    confirmPassword: '',
  };
  error: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}

  onRegister() {
    this.authService.register(this.register).subscribe(
      () => {
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error(error);
        this.error = error.message;
      }
    );
  }
}
