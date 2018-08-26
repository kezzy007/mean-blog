import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  ToasterService } from 'angular5-toaster';
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

  @Input() isDropdown; 
  userForm;
  
  user = { email: '', password: '' };

  loggingIn = false;
  
  loadingIconProps = {
    height: '1.5rem',
    width: '7px',
    'transform-origin': '6px 4px',
    '-webkit-transform-origin': '6px 4px',
    top: '0px'
  }

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
  

  constructor(
              private router: Router,
              private loginService: LoginService,
              private socialAuthService: AuthService,
              private toasterService: ToasterService
            ) {

  }

  ngOnInit() {

    this.checkIfLoggedIn()

  }


  checkIfLoggedIn() {


    if (!localStorage.getItem('user')) {
      this.loggingIn = false;
      return;
    }

    this.displayLogoutButton();

  }

  doConsole(param) {

    console.log(param)

  }

  // setLoadingIconHeight(heightValue) {

  //   this.loadingIconHeight = heightValue

  // }

  displayLogoutButton() {
    this.loginService.userLoggedIn.emit(true);
  }

  onSubmit(){

    // console.log(this.user);
    this.loggingIn = true

    // this.setLoadingIconHeight('20px')

    this.loginService.login(this.user)
        .subscribe((response) => {

          // console.log(response);

          if (!response.success) {

            return;
          }

          const { user } = response

          // if(user.role)
          // this.router.navigateByUrl('/dashboard');

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
