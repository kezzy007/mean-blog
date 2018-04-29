import { Component, OnInit } from '@angular/core';
import { TagsService } from './services/tags.service';


@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {

  tags = [];
  tag = {
    name: '',
    slug: ''
  };

  constructor(
    private tagsService: TagsService
  ) { }

  ngOnInit() {

    this.getAllTags();

  }

  getAllTags() {

    const subscription = this.tagsService.getTags()
        .subscribe(response => {

          console.log(response);

          this.tags = response;

          subscription.unsubscribe();

        });

  }

  addNewTag() {
    console.log(this.tag);
  }

  tagListTracker(index) {
    return index;
  }

}
