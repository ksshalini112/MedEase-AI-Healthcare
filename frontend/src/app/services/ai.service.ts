import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AiService {

  // =========================================
  // BACKEND AI API URL
  // =========================================

  private apiUrl =
    'http://localhost:5000/api/v1/ai';


  constructor(
    private http: HttpClient
  ) {}


  // =========================================
  // GET AUTHORIZATION HEADERS
  // =========================================

  private getHeaders(): HttpHeaders {

    const token =
      localStorage.getItem('token');

    console.log(
      '===================================='
    );

    console.log(
      'AI SERVICE - TOKEN CHECK'
    );

    console.log(
      'Token exists:',
      !!token
    );

    if (!token) {

      console.error(
        'NO JWT TOKEN FOUND IN LOCAL STORAGE'
      );

    }

    console.log(
      '===================================='
    );


    return new HttpHeaders({

      Authorization:
        `Bearer ${token || ''}`

    });

  }


  // =========================================
  // GET SAVED CONVERSATION
  // =========================================

  getConversation(
    conversationId: string
  ): Observable<any> {

    console.log(
      '===================================='
    );

    console.log(
      'GET SAVED CONVERSATION'
    );

    console.log(
      'Conversation ID:',
      conversationId
    );

    console.log(
      '===================================='
    );


    return this.http.get<any>(

      `${this.apiUrl}/conversation/${conversationId}`,

      {
        headers: this.getHeaders()
      }

    );

  }


  // =========================================
  // ANALYZE SYMPTOMS
  // =========================================

  analyzeSymptoms(

    message: string,

    medicalInfo?: any

  ): Observable<any> {


    console.log(
      '===================================='
    );

    console.log(
      'ANALYZE SYMPTOMS'
    );

    console.log(
      'Message:',
      message
    );

    console.log(
      '===================================='
    );


    return this.http.post<any>(

      `${this.apiUrl}/analyze-symptoms`,

      {

        message,

        medicalInfo

      },

      {

        headers: this.getHeaders()

      }

    );

  }


  // =========================================
  // SUBMIT FOLLOW-UP
  // =========================================

  submitFollowup(

    conversationId: string,

    answers: any[]

  ): Observable<any> {


    console.log(
      '===================================='
    );

    console.log(
      'SUBMIT FOLLOW-UP'
    );

    console.log(
      'Conversation ID:',
      conversationId
    );

    console.log(
      'Answers:',
      answers
    );

    console.log(
      '===================================='
    );


    return this.http.post<any>(

      `${this.apiUrl}/submit-followup`,

      {

        conversationId,

        answers

      },

      {

        headers: this.getHeaders()

      }

    );

  }

}