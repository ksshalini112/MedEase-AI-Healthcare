import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

  name = '';
  email = '';
  phone = '';
  password = '';
  confirmPassword = '';
  role = 'patient';

  loading = false;
  errorMessage = '';
  successMessage = '';

  api = 'http://localhost:5000/api/v1/auth/register';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  register() {

    this.errorMessage = '';
    this.successMessage = '';

    // Required fields
    if (
      !this.name ||
      !this.email ||
      !this.phone ||
      !this.password ||
      !this.confirmPassword
    ) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }

    // Password validation
    if (this.password.length < 8) {
      this.errorMessage = 'Password must be at least 8 characters.';
      return;
    }

    // Confirm password
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.loading = true;

    const registerData = {
      name: this.name,
      email: this.email,
      phone: this.phone,
      password: this.password,
      role: this.role
    };

    this.http.post<any>(this.api, registerData).subscribe({

      next: (res) => {

        this.loading = false;

        this.successMessage =
          res.message || 'Registration successful!';

        // Go to login after registration
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1000);
      },

      error: (err) => {

        this.loading = false;

        this.errorMessage =
          err.error?.message ||
          'Registration failed. Please try again.';
      }

    });
  }
}