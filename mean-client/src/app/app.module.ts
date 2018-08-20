import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AdminModule } from './modules/admin/admin.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';

import { LoginService } from './components/login/services/login-service.service';
import { HomeService } from './components/home/services/home.service';
import { RegisterService } from './components/register/services/register.service';

import
  {
    SocialLoginModule,  
    AuthServiceConfig,  
    GoogleLoginProvider,  
    FacebookLoginProvider 
  } 
from 'angular5-social-login';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes =  [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {
    path: 'admin/login',
    component: LoginComponent
  }
];

// Configs 
export function getAuthServiceConfigs() {
  const config = new AuthServiceConfig(
      [
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('1810655365645838')
        },
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider('1007168666401-83dk66n4bnjikbqg01ampadg662kgc3a.apps.googleusercontent.com')
        },
      ]
  );
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    SharedModule,
    AdminModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    LoginService,
    HomeService,
    RegisterService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
