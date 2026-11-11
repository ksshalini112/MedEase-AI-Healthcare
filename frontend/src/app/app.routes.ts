import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadComponent: () =>
      import('./components/home/home')
        .then(m => m.Home)
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./components/auth/login/login')
        .then(m => m.Login)
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./components/auth/register/register')
        .then(m => m.Register)
  },

  {
    path: 'doctor/dashboard',
    loadComponent: () =>
      import('./components/doctor/dashboard/dashboard')
        .then(m => m.Dashboard)
  },

  {
    path: 'patient/dashboard',
    loadComponent: () =>
      import('./components/patient/dashboard/dashboard')
        .then(m => m.Dashboard)
  },

  {
    path: 'patient/assessment',
    loadComponent: () =>
      import('./components/patient/assessment/assessment')
        .then(m => m.Assessment)
  },
  {
  path: 'patient/assessment/symptoms',
  loadComponent: () =>
    import('./components/patient/assessment/symptoms/symptoms')
      .then(m => m.Symptoms)
},
{
  path: 'patient/assessment/questions',
  loadComponent: () =>
    import('./components/patient/assessment/questions/questions')
      .then(m => m.Questions)
},
{
  path: 'patient/assessment/result',
  loadComponent: () =>
    import('./components/patient/assessment/result/result')
      .then(m => m.Result)
},
{
  path: 'patient/assessment/report',

  loadComponent: () =>
    import('./components/patient/assessment/report/report')
      .then(m => m.Report)

},
];