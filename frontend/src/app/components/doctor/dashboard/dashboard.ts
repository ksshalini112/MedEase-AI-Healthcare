import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {

  loading = true;
  errorMessage = '';

  dashboardData: any = null;

  searchText = '';

  api = 'http://localhost:5000/api/v1/doctor/dashboard';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboard();
  }

  // Load doctor dashboard
  loadDashboard(): void {

    this.loading = true;
    this.errorMessage = '';

    this.http.get<any>(this.api).subscribe({

      next: (res) => {

        this.loading = false;

        if (res.success) {
          this.dashboardData = res.data;
        } else {
          this.errorMessage =
            'Unable to load doctor dashboard.';
        }

      },

      error: (err) => {

        this.loading = false;

        console.error(
          'Doctor dashboard error:',
          err
        );

        this.errorMessage =
          err.error?.message ||
          'Unable to connect to the server.';

      }

    });

  }

  // Combine all priority queues into one table
  get allPatients(): any[] {

    if (!this.dashboardData) {
      return [];
    }

    return [
      ...(this.dashboardData.critical || []),
      ...(this.dashboardData.high || []),
      ...(this.dashboardData.medium || []),
      ...(this.dashboardData.low || [])
    ];

  }

  // Search patients
  get filteredPatients(): any[] {

    const search = this.searchText
      .trim()
      .toLowerCase();

    if (!search) {
      return this.allPatients;
    }

    return this.allPatients.filter(patient =>

      patient.name?.toLowerCase().includes(search) ||

      patient.email?.toLowerCase().includes(search) ||

      patient.symptoms?.toLowerCase().includes(search) ||

      patient.priority?.toLowerCase().includes(search)

    );

  }

  // View patient details
  viewPatient(patient: any): void {

    this.router.navigate([
      '/doctor/patient',
      patient.conversationId
    ]);

  }

  // Complete consultation
  completeConsultation(patient: any): void {

    if (!confirm(
      `Complete consultation for ${patient.name}?`
    )) {
      return;
    }

    const url =
      `http://localhost:5000/api/v1/doctor/consultation/${patient.conversationId}/complete`;

    this.http.patch<any>(url, {}).subscribe({

      next: (res) => {

        if (res.success) {

          this.loadDashboard();

        } else {

          alert(
            'Unable to complete consultation.'
          );

        }

      },

      error: (err) => {

        console.error(
          'Complete consultation error:',
          err
        );

        alert(
          err.error?.message ||
          'Unable to complete consultation.'
        );

      }

    });

  }

}