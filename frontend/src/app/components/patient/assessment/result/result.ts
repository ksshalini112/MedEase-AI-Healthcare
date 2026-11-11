import {
  Component,
  Inject,
  PLATFORM_ID,
  afterNextRender
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import {
  Router
} from '@angular/router';

import {
  AiService
} from '../../../../services/ai.service';


@Component({
  selector: 'app-patient-result',

  standalone: true,

  imports: [
    CommonModule
  ],

  templateUrl: './result.html',

  styleUrl: './result.css'
})
export class Result {

  // =====================================================
  // DATA
  // =====================================================

  assessment: any = null;

  loading = true;

  errorMessage = '';


  // =====================================================
  // CONSTRUCTOR
  // =====================================================

  constructor(

    private router: Router,

    private aiService: AiService,

    @Inject(PLATFORM_ID)
    private platformId: Object

  ) {

    /*
     * IMPORTANT:
     *
     * Do not access sessionStorage during SSR/hydration.
     *
     * afterNextRender() executes only after the initial
     * browser render has completed.
     */

    afterNextRender(() => {

      this.loadAssessment();

    });

  }


  // =====================================================
  // LOAD CURRENT PATIENT ASSESSMENT
  // =====================================================

  private loadAssessment(): void {

    if (
      !isPlatformBrowser(
        this.platformId
      )
    ) {

      return;

    }


    /*
     * IMPORTANT:
     *
     * There is NO hard-coded conversation ID here.
     *
     * The assessment page must save the current
     * conversationId when the consultation is created.
     */

    const conversationId =
      sessionStorage.getItem(
        'conversationId'
      );


    console.log(
      '===================================='
    );

    console.log(
      'PATIENT RESULT PAGE'
    );

    console.log(
      'Current conversation ID:',
      conversationId
    );

    console.log(
      '===================================='
    );


    if (!conversationId) {

      this.loading = false;

      this.errorMessage =
        'No assessment was found. Please complete an assessment first.';

      return;

    }


    this.loading = true;

    this.errorMessage = '';


    this.aiService
      .getConversation(
        conversationId
      )
      .subscribe({

        // =================================================
        // SUCCESS
        // =================================================

        next: (response: any) => {

          console.log(
            'Conversation response:',
            response
          );


          /*
           * Backend normally returns:
           *
           * {
           *   success: true,
           *   data: {...}
           * }
           */

          this.assessment =
            response?.data ||
            response ||
            null;


          console.log(
            'Final assessment:',
            this.assessment
          );


          this.loading = false;

        },


        // =================================================
        // ERROR
        // =================================================

        error: (error: any) => {

          console.error(
            'Conversation loading error:',
            error
          );


          if (
            error?.status === 401
          ) {

            this.errorMessage =
              'Your login session has expired. Please login again.';

          }

          else if (
            error?.status === 404
          ) {

            this.errorMessage =
              'This assessment could not be found.';

          }

          else {

            this.errorMessage =
              'Unable to load your assessment. Please try again.';

          }


          this.loading = false;

        }

      });

  }


  // =====================================================
  // CLINICAL SUMMARY
  // =====================================================

  get clinicalSummary(): string {

    return (
      this.assessment?.clinicalSummary ||
      'No consultation summary is available.'
    );

  }


  // =====================================================
  // SEVERITY
  // =====================================================

  get severity(): string {

    return (
      this.assessment?.finalSeverity ||
      this.assessment?.severity ||
      'Not Available'
    );

  }


  // =====================================================
  // PRIORITY
  // =====================================================

  get priority(): string {

    return (
      this.assessment?.finalPriority ||
      this.assessment?.priority ||
      'Not Available'
    );

  }


  // =====================================================
  // STATUS
  // =====================================================

  get status(): string {

    return (
      this.assessment?.status ||
      'Waiting for Doctor Consultation'
    );

  }


  // =====================================================
  // POSSIBLE CONDITIONS
  // =====================================================

  get possibleConditions(): any[] {

    return Array.isArray(
      this.assessment?.possibleConditions
    )
      ? this.assessment.possibleConditions
      : [];

  }


  // =====================================================
  // RECOMMENDED TESTS
  // =====================================================

  get recommendedTests(): any[] {

    return Array.isArray(
      this.assessment?.recommendedTests
    )
      ? this.assessment.recommendedTests
      : [];

  }


  // =====================================================
  // COMBINED ASSESSMENT
  // =====================================================

  get combinedAssessment(): string {

    return (
      this.assessment?.combinedAssessment ||
      ''
    );

  }


  // =====================================================
  // FINAL CONCLUSION
  // =====================================================

  get finalConclusion(): string {

    return (
      this.assessment?.finalConclusion ||
      this.assessment?.finalAssessment?.finalConclusion ||
      this.extractFinalConclusion() ||
      'Please discuss the complete assessment with your healthcare professional.'
    );

  }


  // =====================================================
  // REPORT SUMMARY
  // =====================================================

  get reportSummary(): any[] {

    return Array.isArray(
      this.assessment?.reportSummary
    )
      ? this.assessment.reportSummary
      : [];

  }


  // =====================================================
  // REPORT COUNT
  // =====================================================

  get reportCount(): number {

    if (
      this.reportSummary.length > 0
    ) {

      return this.reportSummary.length;

    }


    if (
      Array.isArray(
        this.assessment?.reportIds
      )
    ) {

      return this.assessment.reportIds.length;

    }


    return 0;

  }


  // =====================================================
  // REPORT UPLOADED
  // =====================================================

  get reportUploaded(): boolean {

    return (
      this.assessment?.reportUploaded === true ||
      this.reportCount > 0
    );

  }


  // =====================================================
  // ABNORMAL VALUES
  // =====================================================

  getAbnormalValues(
    report: any
  ): any[] {

    if (
      !Array.isArray(
        report?.values
      )
    ) {

      return [];

    }


    return report.values.filter(
      (value: any) => {

        const status =
          String(
            value?.status || ''
          )
          .toLowerCase();


        return (
          status === 'high' ||
          status === 'low' ||
          status === 'abnormal'
        );

      }
    );

  }


  // =====================================================
  // VALUE CLASS
  // =====================================================

  getValueClass(
    status: string
  ): string {

    return String(
      status || 'review'
    )
    .toLowerCase()
    .replace(
      /\s+/g,
      '-'
    );

  }


  // =====================================================
  // STATUS LABEL
  // =====================================================

  getStatusLabel(
    status: string
  ): string {

    return status || 'Review';

  }


  // =====================================================
  // EXPLANATION
  // =====================================================

  getExplanation(
    value: any
  ): any {

    return (
      value?.explanation || {
        summary:
          'This result should be reviewed with your healthcare professional.',

        whyItMayHappen:
          'There can be several reasons for an abnormal result.',

        whatItMayMean:
          'The significance depends on your complete clinical picture.',

        whatToDo:
          'Discuss this result with your healthcare professional.'
      }
    );

  }


  // =====================================================
  // CONDITION NAME
  // =====================================================

  getConditionName(
    condition: any
  ): string {

    if (!condition) {
      return 'Possible Condition';
    }


    if (
      typeof condition === 'string'
    ) {

      return condition;

    }


    return (
      condition.name ||
      condition.condition ||
      condition.title ||
      condition.diagnosis ||
      'Possible Condition'
    );

  }


  // =====================================================
  // CONDITION REASON
  // =====================================================

  getConditionReason(
    condition: any
  ): string {

    if (
      !condition ||
      typeof condition === 'string'
    ) {

      return '';

    }


    return (
      condition.reason ||
      condition.description ||
      condition.explanation ||
      ''
    );

  }


  // =====================================================
  // TEST NAME
  // =====================================================

  getTestName(
    test: any
  ): string {

    if (!test) {
      return '';
    }


    if (
      typeof test === 'string'
    ) {

      return test;

    }


    return (
      test.name ||
      test.test ||
      test.title ||
      ''
    );

  }


  // =====================================================
  // URGENT
  // =====================================================

  get isUrgent(): boolean {

    const priority =
      String(
        this.priority || ''
      )
      .toLowerCase();


    const severity =
      String(
        this.severity || ''
      )
      .toLowerCase();


    return (
      priority.includes('critical') ||
      priority.includes('life-threatening') ||
      priority.includes('high') ||
      severity.includes('critical') ||
      severity.includes('life-threatening') ||
      severity.includes('severe')
    );

  }


  // =====================================================
  // PRIORITY CLASS
  // =====================================================

  getPriorityClass(): string {

    return String(
      this.priority || 'review'
    )
    .toLowerCase()
    .replace(
      /\s+/g,
      '-'
    );

  }


  // =====================================================
  // FINAL CONCLUSION FALLBACK
  // =====================================================

  private extractFinalConclusion(): string {

    const text =
      this.combinedAssessment || '';


    const marker =
      'FINAL CONCLUSION';


    const index =
      text.indexOf(marker);


    if (index === -1) {
      return '';
    }


    const after =
      text.substring(
        index + marker.length
      );


    const end =
      after.indexOf(
        'FINAL PRIORITY'
      );


    if (end === -1) {

      return after.trim();

    }


    return after
      .substring(
        0,
        end
      )
      .trim();

  }


  // =====================================================
  // NAVIGATION
  // =====================================================

  goToDashboard(): void {

    this.router.navigate([
      '/patient/dashboard'
    ]);

  }


  // =====================================================
  // REPORTS
  // =====================================================

  goToReports(): void {

    this.router.navigate([
      '/patient/assessment/report'
    ]);

  }


  // =====================================================
  // VIEW CONVERSATION
  // =====================================================

  viewConversation(): void {

    if (
      !isPlatformBrowser(
        this.platformId
      )
    ) {

      return;

    }


    const conversationId =
      sessionStorage.getItem(
        'conversationId'
      );


    if (!conversationId) {

      console.warn(
        'No conversation ID found.'
      );

      return;

    }


    this.aiService
      .getConversation(
        conversationId
      )
      .subscribe({

        next: (response: any) => {

          console.log(
            'Saved conversation:',
            response
          );

        },

        error: (error: any) => {

          console.error(
            'Unable to load conversation:',
            error
          );

        }

      });

  }

}