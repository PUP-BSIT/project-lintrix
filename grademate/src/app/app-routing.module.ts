// app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SignupLandingComponent } from './signup-landing/signup-landing.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'signup-landing', component: SignupLandingComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
