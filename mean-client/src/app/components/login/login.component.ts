import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ToasterService, ToasterConfig } from 'angular5-toaster';
import { Router } from '@angular/router';

import { LoginService } from './services/login-service.service';

import {
  AuthService,
  FacebookLoginProvider,
  GoogleLoginProvider
} from 'angular5-social-login';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  userForm;
  
  user = { email: '', password: '' };

  loggedIn = true;
  
  TOAST_OPTIONS = {
    SUCCESS: {
        text: 'CLOSE',
        duration: 5000,
        type: 'success',
    },
    FAILURE: {
        text: 'CLOSE',
        duration: 5000,
        type: 'error',
    }
  };

  userData = '';
  
  public toasterconfig: ToasterConfig =  new ToasterConfig({
      showCloseButton: true,
      tapToDismiss: true,
      timeout: 3000
  });

  constructor(
              private router: Router,
              private loginService: LoginService,
              private socialAuthService: AuthService,
              private toasterService: ToasterService
            ) {

  }

  ngOnInit() {

    this.checkIfLoggedIn();

  }

  checkIfLoggedIn() {

    if (!localStorage.getItem('user')) {
      this.loggedIn = false;
      return;
    }

    this.displayLogoutButton();

    this.redirectToDashboard();

  }

  displayLogoutButton() {
    this.loginService.userLoggedIn.emit(true);
  }

  redirectToDashboard() {

    this.router.navigateByUrl('/dashboard');

  }

  onSubmit(){

    // console.log(this.user);

    this.loginService.login(this.user)
        .subscribe((response) => {

          // console.log(response);

          if (!response.success) {

            return;
          }

          this.storeTokenInLocalStorage(response.token);

          this.storeUserInLocalStorage(response.user);

          this.router.navigateByUrl('/dashboard');

        });

  }

  socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;

    if(socialPlatform == 'facebook'){

      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;

    }else if(socialPlatform === 'google'){

      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;

    }

    // this.socialAuthService.signIn(socialPlatformProvider).then(
    //   (userData) => {

        //userData.id = undefined;

        //this.validateUserExists(userData);
        
        // console.log(socialPlatform+" sign in data : " , userData);
        
        // Now sign-in with userData
        let userData

        this.loginService.signupOrLoginUser(userData)
            .subscribe( response => {
              console.log(response)
            })
            
    //   }
    // );
  }

  validateUserExists(userData) {
   
    this.loginService.validateUserToken(userData)
    .subscribe((response) => {

       console.log(response);

      if (!response.success) {

        return;
      }

      this.storeTokenInLocalStorage(response.token);

      this.storeUserInLocalStorage(response.user);

      this.router.navigateByUrl('/dashboard');

    });

  }

  storeTokenInLocalStorage(token) {

    window.localStorage.setItem('token', token);

  }

  storeUserInLocalStorage(user) {

    window.localStorage.setItem('user', JSON.stringify(user));

  }

  displayToast(message, options) {

    this.toasterService.pop(
                                options.type,
                                'New notification',
                                !message && (options.type === 'failure') ?
                                'Operation failed' : message || 'Operation successful'
                            );

  }

}
