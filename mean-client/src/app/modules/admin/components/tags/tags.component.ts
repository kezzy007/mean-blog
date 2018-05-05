import { Component, OnInit } from '@angular/core';
import { TagsService } from './services/tags.service';

interface ITags{
  id: string;
  name: string;
  slug: string;
}

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})

export class TagsComponent implements OnInit {

  tags: ITags[];
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

          this.tags = response.tags;

          subscription.unsubscribe();

        });

  }

  addNewTag() {
    console.log(this.tag);

    this.tagsService.addNewTag(this.tag)
        .subscribe(response => {

          console.log(response);

          this.tags.push(response.tag);

        });

  }

  tagListTracker(index) {
    return index;
  }

  editTag(tag) {

  }

}
