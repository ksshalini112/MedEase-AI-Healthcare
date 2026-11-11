import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-patient-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './patient-details.html',
  styleUrl: './patient-details.css'
})
export class PatientDetails implements OnInit {

  loading = true;
  errorMessage = '';

  patientData: any = null;

  conversationId = '';

  api = 'http://localhost:5000/api/v1/doctor/patient';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.conversationId =
      this.route.snapshot.paramMap.get('conversationId') || '';

    if (!this.conversationId) {
      this.errorMessage = 'Invalid consultation ID.';
      this.loading = false;
      return;
    }

    this.loadPatientDetails();
  }

  loadPatientDetails(): void {

    this.loading = true;
    this.errorMessage = '';

    this.http.get<any>(
      `${this.api}/${this.conversationId}`
    ).subscribe({

      next: (res) => {

        this.loading = false;

        if (res.success) {

          this.patientData = res.data;

        } else {

          this.errorMessage =
            'Unable to load patient details.';

        }

      },

      error: (err) => {

        this.loading = false;

        console.error(
          'Patient details error:',
          err
        );

        this.errorMessage =
          err.error?.message ||
          'Unable to connect to the server.';

      }

    });
  }

  goBack(): void {

    this.router.navigate([
      '/doctor/dashboard'
    ]);

  }

}