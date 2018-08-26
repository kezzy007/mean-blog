import { Component, OnInit, Input } from '@angular/core';


interface propsForIcon{

  height: String;
  width: String;
  top: String;
  transformOrigin: String;

}

@Component({
  selector: 'app-loading-icon',
  templateUrl: './loading-icon.component.html',
  styleUrls: ['./loading-icon.component.scss']
})

export class LoadingIconComponent implements OnInit {

  @Input() IconProps: propsForIcon

  constructor() { }

  ngOnInit() {
    
    this.initializeLoadingIconProps()

  }

  initializeLoadingIconProps() {
    // const loadingSpinnerChildren = document.querySelectorAll('div.lds-spinner > div')
    //   loadingSpinnerChildren.forEach(child => {
    //      Object.keys(this.IconProps).forEach(prop => {
    //        console.log(child)
    //         child.style[prop] = this.IconProps[prop] 
    //      })
    //   })
  }

}
