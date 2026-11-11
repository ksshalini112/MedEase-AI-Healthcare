import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-symptoms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './symptoms.html',
  styleUrl: './symptoms.css'
})
export class Symptoms {

  symptoms = '';
  duration = '';
  severity = '';
  additionalInfo = '';

  loading = false;
  errorMessage = '';

  api =
    'http://localhost:5000/api/v1/ai/analyze-symptoms';

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  // ==========================================
  // CONTINUE TO AI QUESTIONS
  // ==========================================

  continueToQuestions(): void {

    this.errorMessage = '';


    // Validate symptoms
    if (!this.symptoms.trim()) {

      this.errorMessage =
        'Please describe your symptoms.';

      return;
    }


    // Validate duration
    if (!this.duration) {

      this.errorMessage =
        'Please select how long you have had these symptoms.';

      return;
    }


    // Validate severity
    if (!this.severity) {

      this.errorMessage =
        'Please select the severity of your symptoms.';

      return;
    }


    // ==========================================
    // CREATE MESSAGE
    // ==========================================

    const message = `
Symptoms: ${this.symptoms}

Duration: ${this.duration}

Severity: ${this.severity}

Additional Information: ${
      this.additionalInfo.trim() || 'None'
    }
`;


    // ==========================================
    // GET JWT TOKEN
    // ==========================================

    const token =
      localStorage.getItem('token');


    if (!token) {

      this.errorMessage =
        'Your session has expired. Please login again.';

      return;
    }


    // ==========================================
    // HTTP HEADERS
    // ==========================================

    const headers = new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });


    // ==========================================
    // REQUEST BODY
    // IMPORTANT:
    // Backend currently expects ONLY message
    // ==========================================

    const requestBody = {

      message: message

    };


    console.log(
      'Sending symptom analysis:',
      requestBody
    );


    // ==========================================
    // CALL BACKEND
    // ==========================================

    this.loading = true;


    this.http.post<any>(

      this.api,

      requestBody,

      { headers }

    ).subscribe({

      // ========================================
      // SUCCESS
      // ========================================

      next: (res) => {

        this.loading = false;


        console.log(
          'AI Analysis Response:',
          res
        );


        if (!res.success) {

          this.errorMessage =
            'Unable to analyze your symptoms.';

          return;
        }


        // ======================================
        // SAVE CONVERSATION ID
        // ======================================

        sessionStorage.setItem(

          'conversationId',

          res.conversationId

        );


        // ======================================
        // SAVE AI RESPONSE
        // ======================================

        sessionStorage.setItem(

          'aiAnalysis',

          JSON.stringify(res.data)

        );


        // ======================================
        // GO TO STEP 3
        // ======================================

        this.router.navigate([

          '/patient/assessment/questions'

        ]);

      },


      // ========================================
      // ERROR
      // ========================================

      error: (err) => {

        this.loading = false;


        console.error(

          'Symptom analysis error:',

          err

        );


        console.error(

          'Backend response:',

          err.error

        );


        this.errorMessage =

          err.error?.message ||

          'Unable to connect to MedEase AI.';

      }

    });

  }


  // ==========================================
  // GO BACK TO STEP 1
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/patient/assessment'

    ]);

  }


  // ==========================================
  // CANCEL ASSESSMENT
  // ==========================================

  cancel(): void {

    sessionStorage.removeItem(
      'assessmentMedicalInfo'
    );

    sessionStorage.removeItem(
      'assessmentSymptoms'
    );

    sessionStorage.removeItem(
      'conversationId'
    );

    sessionStorage.removeItem(
      'aiAnalysis'
    );


    this.router.navigate([

      '/patient/dashboard'

    ]);

  }

}