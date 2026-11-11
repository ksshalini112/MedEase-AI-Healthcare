import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-questions',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './questions.html',
  styleUrl: './questions.css'
})
export class Questions implements OnInit {

  conversationId = '';

  questions: string[] = [];

  answers: string[] = [];

  loading = true;

  submitting = false;

  errorMessage = '';

  api =
    'http://localhost:5000/api/v1/ai/submit-followup';


  constructor(
    private http: HttpClient,
    private router: Router
  ) {}


  // ==========================================
  // LOAD AI QUESTIONS
  // ==========================================

  ngOnInit(): void {

    this.conversationId =
      sessionStorage.getItem('conversationId') || '';

    const savedAnalysis =
      sessionStorage.getItem('aiAnalysis');


    if (!this.conversationId) {

      this.errorMessage =
        'Assessment session not found.';

      this.loading = false;

      return;
    }


    if (!savedAnalysis) {

      this.errorMessage =
        'AI analysis not found.';

      this.loading = false;

      return;
    }


    try {

      const analysis =
        JSON.parse(savedAnalysis);


      this.questions =
        analysis.followUpQuestions || [];


      // Create an empty answer for every question

      this.answers =
        this.questions.map(() => '');


      this.loading = false;


      console.log(
        'AI Follow-up Questions:',
        this.questions
      );

    }

    catch (error) {

      console.error(
        'Unable to load AI questions:',
        error
      );

      this.errorMessage =
        'Unable to load AI questions.';

      this.loading = false;

    }

  }


  // ==========================================
  // SUBMIT ANSWERS
  // ==========================================

  submitAnswers(): void {

    this.errorMessage = '';


    if (!this.conversationId) {

      this.errorMessage =
        'Assessment session not found.';

      return;
    }


    // Check that every question has an answer

    for (
      let i = 0;
      i < this.answers.length;
      i++
    ) {

      if (!this.answers[i]?.trim()) {

        this.errorMessage =
          `Please answer question ${i + 1}.`;

        return;
      }

    }


    const token =
      localStorage.getItem('token');


    if (!token) {

      this.errorMessage =
        'Your session has expired. Please login again.';

      return;
    }


    // ==========================================
    // CREATE ANSWERS ARRAY
    // ==========================================

    const formattedAnswers =
      this.questions.map(
        (question, index) => ({

          question: question,

          answer:
            this.answers[index].trim()

        })
      );


    console.log(
      'Submitting answers:',
      formattedAnswers
    );


    // ==========================================
    // AUTHORIZATION
    // ==========================================

    const headers = new HttpHeaders({

      Authorization:
        `Bearer ${token}`

    });


    this.submitting = true;


    // ==========================================
    // SEND TO BACKEND
    // ==========================================

    this.http.post<any>(

      this.api,

      {
        conversationId:
          this.conversationId,

        answers:
          formattedAnswers
      },

      { headers }

    ).subscribe({

      // ========================================
      // SUCCESS
      // ========================================

      next: (res) => {

        this.submitting = false;


        console.log(
          'Final Assessment:',
          res
        );


        if (!res.success) {

          this.errorMessage =
            'Unable to complete assessment.';

          return;
        }


        // Save final assessment

        sessionStorage.setItem(

          'finalAssessment',

          JSON.stringify(res.data)

        );


        // Go to final assessment page

        this.router.navigate([

          '/patient/assessment/result'

        ]);

      },


      // ========================================
      // ERROR
      // ========================================

      error: (err) => {

        this.submitting = false;


        console.error(
          'Submit follow-up error:',
          err
        );


        this.errorMessage =

          err.error?.message ||

          'Unable to submit your answers.';

      }

    });

  }


  // ==========================================
  // GO BACK
  // ==========================================

  goBack(): void {

    this.router.navigate([

      '/patient/assessment/symptoms'

    ]);

  }


  // ==========================================
  // CANCEL
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

    sessionStorage.removeItem(
      'finalAssessment'
    );


    this.router.navigate([

      '/patient/dashboard'

    ]);

  }

}