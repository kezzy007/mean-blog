import { Component, OnInit } from '@angular/core';
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

  constructor() { }

  ngOnInit() {
  }

}
