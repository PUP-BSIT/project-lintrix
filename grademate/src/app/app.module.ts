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
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { FaqsComponent } from './faqs/faqs.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    DashboardComponent,
    PasswordRecoveryComponent,
    SignupLandingComponent,
    EmailAuthComponent,
    HomeComponent,
    AboutUsComponent,
    FaqsComponent,
    HeaderComponent,
    FooterComponent
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
