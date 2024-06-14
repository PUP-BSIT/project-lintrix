import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthenticationService } from './services/authentication.service';
import { SignupService } from './services/signup.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmailAuthComponent } from './email-auth/email-auth.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PasswordRecoveryComponent } from './password-recovery/password-recovery.component';
import { SignupLandingComponent } from './signup-landing/signup-landing.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PasswordRecoveryComponent,
    SignupLandingComponent,
    EmailAuthComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, SignupService],
  bootstrap: [AppComponent]
})
export class AppModule { }
