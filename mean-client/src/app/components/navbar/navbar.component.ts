import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login/services/login-service.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy {

  loggedIn = false;
  displayForm = null;
  navbarDropDowns = {
    LOGIN_FORM: 'loginForm',
    SIGNUP_FORM: 'signupForm',
  }

  constructor(
              private loginService: LoginService,
              private router: Router
            ) { }

  ngOnInit() {

    this.verifyUserLoggedIn()

    this.hideDropDownOnWindowClicked()

  }

  ngOnDestroy() {

    console.log("destroy called")

  }

  verifyUserLoggedIn() {

    if ( this.getUser() ) {
      this.loggedIn = true;
      return;
    }

    const subscribedService = this.loginService.userLoggedIn.subscribe((loggedIn) => {

      this.loggedIn = loggedIn;

    });

  }

  hideDropDownOnWindowClicked() {

    const { LOGIN_FORM, SIGNUP_FORM } = this.navbarDropDowns

    // window.addEventListener('click', event => {

    //   const matchFound = event.path.find( element => {

    //     if( (element.classList !== undefined) && 
    //         (element.classList.contains('enlarge-dropdown'))
    //       ){
    //         return true
    //       } 

    //     return false

    //   })

    //   console.log(matchFound, this.displayForm)

    //   if(matchFound && (this.displayForm !== null) ){
    //     console.log('removing')
    //       this.displayForm = null
    //   }

    //   // if(event.path.contains('div.dropdown-menu.dropdown.dropdown-primary.enlarge-dropdown.py-5.ng-star-inserted')){

    //   //   console.log('In')
    //   //   if( (this.displayForm !== LOGIN_FORM) || (this.displayForm !== SIGNUP_FORM) ){
       
    //   //     console.log(this.displayForm)

    //   //     return
          
    //   //   }
        
    //   //   console.log('removing')



    //   // }
      

    // })

  }

  toggleNavbarDropdown(dropdown) {

    
    switch(dropdown){

      case this.navbarDropDowns.LOGIN_FORM:
        const {LOGIN_FORM} = this.navbarDropDowns
        this.displayForm = this.displayForm === LOGIN_FORM ? null : LOGIN_FORM 
        break

      case this.navbarDropDowns.SIGNUP_FORM:
        const {SIGNUP_FORM} = this.navbarDropDowns
        this.displayForm = this.displayForm === SIGNUP_FORM ? null : SIGNUP_FORM 
        break
        
      default:
        break

    }

  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  logout() {

    const logoutService = this.loginService.logout()
        .subscribe((response) => {

          if (!response.success) {
            console.log('Failed to logout');
            return;
          }

          this.loggedIn = false;

          this.removeUserFromLocalStorage();

          this.removeTokenFromLocalStorage();

          this.router.navigateByUrl('/');

          logoutService.unsubscribe();

        });
  }

  removeUserFromLocalStorage() {
    localStorage.removeItem('user');
  }

  removeTokenFromLocalStorage() {
    localStorage.removeItem('token');
  }
}
