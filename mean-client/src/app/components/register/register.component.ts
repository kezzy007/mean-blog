import { Component, OnInit } from '@angular/core'
import { RegisterService } from './services/register.service'
import {  ToasterService } from 'angular5-toaster';
import { toasterConfiguration } from '../../configs'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  signingUp = false
  toasterConfig = toasterConfiguration
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

          if(!response.success){
            
            this.displayToast('Registration failed', this.TOAST_OPTIONS.FAILURE)

            return
          }

          // Store token and use for further requests
          this.displayToast('Registration successful', this.TOAST_OPTIONS.SUCCESS)

          regSubscription.unsubscribe()

        })

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
