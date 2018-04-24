import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';

import { LoginService } from './components/login/services/login-service.service';
import
  {
    SocialLoginModule,  
    AuthServiceConfig,  
    GoogleLoginProvider,  
    FacebookLoginProvider 
  } 
from 'angular5-social-login';

const routes: Routes =  [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
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
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    SocialLoginModule,
    SharedModule,
    AdminModule,
    UserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    },
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
