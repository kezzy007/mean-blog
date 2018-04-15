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


const routes: Routes =  [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
];

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
    SharedModule,
    AdminModule,
    UserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [ LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
