import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ToasterConfig } from 'angular5-toaster'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {

  public toasterconfig : ToasterConfig = 
  new ToasterConfig({
      showCloseButton: true, 
      tapToDismiss: false, 
      timeout: 0
  });

  authenticated = false;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {

    this.authenticateUser();

  }

  verifyUserAuthenticated() {

    return (JSON.parse(localStorage.getItem('user')) !== undefined) 
            && (localStorage.getItem('token') !== undefined)

  }

  authenticateUser() {

    this.authenticated = this.verifyUserAuthenticated()

    if(!this.authenticated){

      this.router.navigateByUrl('/admin/login')

    }


  }

}
