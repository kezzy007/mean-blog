import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { RouterModule, Routes } from '@angular/router';

import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';


import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { LoadingIconComponent } from './components/loading-icon/loading-icon.component';
import { NavbarComponent } from './components/navbar/navbar.component';


const routes: Routes =  [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoadingIconComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    AdminModule,
    UserModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
