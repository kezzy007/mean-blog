import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {


  constructor(private router: ActivatedRoute) { }

  ngOnInit() {

    // this.router.snapshot.params

  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

}
