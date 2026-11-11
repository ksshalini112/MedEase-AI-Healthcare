import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  email = '';
  password = '';

  loading = false;
  errorMessage = '';

  api = 'http://localhost:5000/api/v1/auth/login';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login() {

    this.errorMessage = '';

    if (!this.email || !this.password) {
      this.errorMessage = 'Please enter email and password.';
      return;
    }

    this.loading = true;

    this.http.post<any>(this.api, {
      email: this.email,
      password: this.password
    }).subscribe({

      next: (res) => {

        this.loading = false;

        // Save JWT token
        localStorage.setItem(
          'token',
          res.data.token
        );

        // Save logged-in user
        localStorage.setItem(
          'user',
          JSON.stringify(res.data.user)
        );

        // Redirect based on role
        if (res.data.user.role === 'doctor') {

          this.router.navigate(['/doctor/dashboard']);

        } else {

          this.router.navigate(['/patient/dashboard']);

        }
      },

      error: (err) => {

        this.loading = false;

        this.errorMessage =
          err.error?.message ||
          'Invalid email or password.';

      }

    });
  }
}