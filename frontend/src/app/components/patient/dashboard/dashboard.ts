import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

  constructor(private router: Router) {}

  startAssessment(): void {
    this.router.navigate(['/patient/assessment']);
  }

  viewConsultations(): void {
    console.log('Consultations clicked');
  }

  viewReports(): void {
    console.log('Reports clicked');
  }

  viewProfile(): void {
    console.log('Profile clicked');
  }
}