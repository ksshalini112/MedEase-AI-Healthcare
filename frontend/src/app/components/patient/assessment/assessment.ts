import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-assessment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './assessment.html',
  styleUrl: './assessment.css'
})
export class Assessment {

  age: number | null = null;
  gender = '';

  pregnant = false;
  pregnancyWeeks: number | null = null;

  allergies = '';
  chronicDiseases = '';
  currentMedicines = '';

  constructor(private router: Router) {}

  continueToSymptoms(): void {

    if (!this.age || !this.gender) {
      alert('Please enter your age and gender.');
      return;
    }

    if (this.pregnant && !this.pregnancyWeeks) {
      alert('Please enter your pregnancy weeks.');
      return;
    }

    // Temporarily store assessment information.
    // We will connect this to the backend next.
    const medicalInfo = {
      age: this.age,
      gender: this.gender,
      pregnant: this.pregnant,
      pregnancyWeeks: this.pregnancyWeeks,
      allergies: this.allergies,
      chronicDiseases: this.chronicDiseases,
      currentMedicines: this.currentMedicines
    };

    sessionStorage.setItem(
      'assessmentMedicalInfo',
      JSON.stringify(medicalInfo)
    );

    this.router.navigate(['/patient/assessment/symptoms']);
  }

  cancel(): void {
    this.router.navigate(['/patient/dashboard']);
  }
}