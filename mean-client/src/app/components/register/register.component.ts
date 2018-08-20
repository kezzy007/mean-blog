import { Component, OnInit } from '@angular/core'
import { RegisterService } from './services/register.service'
import {  ToasterService, ToasterConfig } from 'angular5-toaster';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signingUp = false
  
  user = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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

  constructor(
    private registerService: RegisterService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
  }

  onSubmit() {

    this.signingUp = true

    const regSubscription = this.registerService.registerUser(this.user)
        .subscribe( response => {

          console.log(response)

          if(!response.success){
            
            this.displayToast('Registration failed', this.TOAST_OPTIONS.FAILURE)

            return
          }

          // Store token and use for further requests
          this.displayToast('Registration successful', this.TOAST_OPTIONS.SUCCESS)

          const { token, user } = response

          this.storeTokenInLocalStorage(token)

          this.storeUserInLocalStorage(user)

          this.notifyUserLoggedIn()

          regSubscription.unsubscribe()

        })

  }

  notifyUserLoggedIn() {

    this.registerService.notifyLoggedIn.emit('loggedIn')

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
