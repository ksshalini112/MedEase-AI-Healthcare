import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient-report',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './report.html',
  styleUrl: './report.css'
})
export class Report implements OnInit {

  recommendedTests: any[] = [];

  loading = false;

  errorMessage = '';

  successMessage = '';

  apiBase =
    'http://localhost:5000/api/v1/reports';


  constructor(
    private router: Router,
    private http: HttpClient
  ) {}


  // =========================================
  // PAGE LOAD
  // =========================================

  ngOnInit(): void {

    console.log(
      'Report Upload page loaded'
    );

    this.loadRecommendedTests();

  }


  // =========================================
  // LOAD RECOMMENDED TESTS
  // =========================================

  loadRecommendedTests(): void {

    const assessmentData =
      sessionStorage.getItem(
        'finalAssessment'
      );


    if (!assessmentData) {

      console.warn(
        'Final assessment not found.'
      );

      this.errorMessage =
        'Assessment data was not found. Please complete the assessment again.';

      return;
    }


    try {

      const response =
        JSON.parse(assessmentData);


      const assessment =
        response?.data || response;


      console.log(
        'Assessment loaded:',
        assessment
      );


      // Get recommended tests

      const tests =
        assessment?.recommendedTests ||
        assessment?.consultation?.recommendedTests ||
        [];


      // Create UI report objects

      this.recommendedTests =
        tests.map((test: any) => ({

          name:
            typeof test === 'string'
              ? test
              : (
                  test?.name ||
                  test?.test ||
                  test?.title ||
                  'Recommended Test'
                ),

          status: 'Pending',

          file: null,

          uploading: false,

          uploadedToServer: false,

          uploadResult: null,

          error: ''

        }));


      console.log(
        'Recommended reports:',
        this.recommendedTests
      );


    } catch (error) {

      console.error(
        'Unable to load reports:',
        error
      );

      this.errorMessage =
        'Unable to load recommended reports.';

      this.recommendedTests = [];

    }

  }


  // =========================================
  // FILE SELECTED
  // =========================================

  onFileSelected(
    event: Event,
    index: number
  ): void {

    const input =
      event.target as HTMLInputElement;


    if (
      !input.files ||
      input.files.length === 0
    ) {
      return;
    }


    const file =
      input.files[0];


    const allowedTypes = [

      'application/pdf',

      'image/jpeg',

      'image/jpg',

      'image/png'

    ];


    if (
      !allowedTypes.includes(file.type)
    ) {

      alert(
        'Please upload only PDF, JPG or PNG files.'
      );

      input.value = '';

      return;

    }


    // Optional file size limit: 10 MB

    const maxSize =
      10 * 1024 * 1024;


    if (file.size > maxSize) {

      alert(
        'File size must be less than 10 MB.'
      );

      input.value = '';

      return;

    }


    this.recommendedTests[index].file =
      file;

    this.recommendedTests[index].status =
      'Ready to Upload';

    this.recommendedTests[index].error =
      '';


    console.log(
      'Selected file:',
      file.name
    );


    this.saveReportData();

  }


  // =========================================
  // SKIP REPORT
  // =========================================

  skipReport(index: number): void {

    this.recommendedTests[index].file =
      null;

    this.recommendedTests[index].status =
      'Skipped';

    this.recommendedTests[index].error =
      '';

    this.recommendedTests[index].uploadedToServer =
      false;


    this.saveReportData();

  }


  // =========================================
  // RESET REPORT
  // =========================================

  resetReport(index: number): void {

    this.recommendedTests[index].file =
      null;

    this.recommendedTests[index].status =
      'Pending';

    this.recommendedTests[index].error =
      '';

    this.recommendedTests[index].uploadedToServer =
      false;

    this.recommendedTests[index].uploadResult =
      null;


    this.saveReportData();

  }


  // =========================================
  // REMOVE FILE
  // =========================================

  removeFile(index: number): void {

    this.recommendedTests[index].file =
      null;

    this.recommendedTests[index].status =
      'Pending';

    this.recommendedTests[index].error =
      '';

    this.recommendedTests[index].uploadedToServer =
      false;

    this.recommendedTests[index].uploadResult =
      null;


    this.saveReportData();

  }


  // =========================================
  // SAVE STATUS TO SESSION STORAGE
  // =========================================

  saveReportData(): void {

    const reportData =
      this.recommendedTests.map(
        (report: any) => ({

          name:
            report.name,

          status:
            report.status,

          fileName:
            report.file
              ? report.file.name
              : null,

          uploadedToServer:
            report.uploadedToServer

        })
      );


    sessionStorage.setItem(
      'reportUploadData',
      JSON.stringify(reportData)
    );

  }


  // =========================================
  // CONTINUE - UPLOAD ALL REPORTS
  // =========================================

  async continue(): Promise<void> {

    this.errorMessage = '';

    this.successMessage = '';


    // Get conversation ID

    const conversationId =
      sessionStorage.getItem(
        'conversationId'
      );


    if (!conversationId) {

      this.errorMessage =
        'Conversation ID was not found. Please restart the assessment.';

      return;

    }


    // Get JWT token

    const token =
      localStorage.getItem(
        'token'
      );


    if (!token) {

      this.errorMessage =
        'Your session has expired. Please login again.';

      return;

    }


    // Get reports selected for upload

    const reportsToUpload =
      this.recommendedTests.filter(
        report =>
          report.file &&
          report.status !== 'Skipped' &&
          !report.uploadedToServer
      );


    // =========================================
    // NO REPORT SELECTED
    // =========================================

    if (reportsToUpload.length === 0) {

      console.log(
        'No reports selected. Continuing without upload.'
      );


      this.saveReportData();


      this.router.navigate([
        '/patient/assessment/result'
      ]);

      return;

    }


    // =========================================
    // START UPLOAD
    // =========================================

    this.loading = true;


    try {

      let lastFinalAssessment: any = null;


      // Upload one report at a time

      for (
        const reportItem of reportsToUpload
      ) {

        const reportIndex =
          this.recommendedTests.indexOf(
            reportItem
          );


        this.recommendedTests[reportIndex].uploading =
          true;

        this.recommendedTests[reportIndex].status =
          'Uploading...';

        this.recommendedTests[reportIndex].error =
          '';


        console.log(
          'Uploading:',
          reportItem.name,
          reportItem.file.name
        );


        // Create FormData

        const formData =
          new FormData();


        /*
         * IMPORTANT:
         *
         * Backend uses:
         *
         * upload.single("report")
         *
         * So the field name MUST be "report"
         */

        formData.append(
          'report',
          reportItem.file
        );


        // Authorization only.
        // DO NOT manually add Content-Type for FormData.

        const headers =
          new HttpHeaders({

            Authorization:
              `Bearer ${token}`

          });


        const response: any =
          await this.http.post(

            `${this.apiBase}/upload/${conversationId}`,

            formData,

            { headers }

          ).toPromise();


        console.log(
          'Upload response:',
          response
        );


        // Mark uploaded

        this.recommendedTests[reportIndex].uploading =
          false;

        this.recommendedTests[reportIndex].uploadedToServer =
          true;

        this.recommendedTests[reportIndex].status =
          'Analyzed';

        this.recommendedTests[reportIndex].uploadResult =
          response;


        /*
         * Your backend returns:
         *
         * {
         *   success: true,
         *   data: {
         *     report,
         *     consultation,
         *     reportAnalysis,
         *     finalAssessment
         *   }
         * }
         */

        if (
          response?.success &&
          response?.data
        ) {

          lastFinalAssessment =
            response.data;

        }


        this.saveReportData();

      }


      // =========================================
      // SAVE FINAL COMBINED ASSESSMENT
      // =========================================

      if (lastFinalAssessment) {

        /*
         * Result page currently expects
         * sessionStorage.getItem('finalAssessment')
         *
         * We save the complete latest backend response.
         */

        sessionStorage.setItem(
          'finalAssessment',
          JSON.stringify({
            success: true,
            data: {
              ...lastFinalAssessment,

              /*
               * Keep these values at top level
               * for Result page compatibility
               */

              clinicalSummary:
                lastFinalAssessment
                  ?.consultation
                  ?.clinicalSummary,

              severity:
                lastFinalAssessment
                  ?.finalAssessment
                  ?.severity,

              priority:
                lastFinalAssessment
                  ?.finalAssessment
                  ?.priority,

              finalSeverity:
                lastFinalAssessment
                  ?.finalAssessment
                  ?.severity,

              finalPriority:
                lastFinalAssessment
                  ?.finalAssessment
                  ?.priority

            }
          })
        );

      }


      this.loading = false;


      this.successMessage =
        'All selected reports were uploaded and analyzed successfully.';


      console.log(
        'All uploads completed.'
      );


      // Small delay so success message can be seen

      setTimeout(() => {

        this.router.navigate([
          '/patient/assessment/result'
        ]);

      }, 800);


    } catch (error: any) {

      console.error(
        'Report upload error:',
        error
      );


      this.loading = false;


      /*
       * Find the report currently uploading
       * and mark it as failed
       */

      const uploadingReport =
        this.recommendedTests.find(
          report => report.uploading
        );


      if (uploadingReport) {

        uploadingReport.uploading =
          false;

        uploadingReport.status =
          'Failed';

        uploadingReport.error =
          error?.error?.message ||
          'Upload failed. Please try again.';

      }


      this.errorMessage =
        error?.error?.message ||
        'Unable to upload and analyze the report.';


      this.saveReportData();

    }

  }


  // =========================================
  // GO BACK
  // =========================================

  goBack(): void {

    this.router.navigate([
      '/patient/assessment/result'
    ]);

  }

}