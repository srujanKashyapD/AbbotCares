import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';
import { AppComponent } from './app.component';
import { SignupModule } from './signup/signup.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { CommonModulesModule } from './common-modules/common-modules.module';
import { ForgotPasswordModule } from './forgot-password/forgot-password.module';
import { HomeModule } from './home/home.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NavigationBarModule,
    SignupModule,
    ForgotPasswordModule,    
    CommonModulesModule,
    HomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
