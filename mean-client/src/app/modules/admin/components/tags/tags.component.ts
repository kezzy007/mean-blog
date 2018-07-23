import { Component, OnInit } from '@angular/core';
import { TagsService } from './services/tags.service';

interface ITags{
  _id: string;
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
  editingTag = {
    _id: '',
    name: '',
    slug: ''
  };
  currentEditingTagIndex;


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

  hideTagEditingFields(){
    
     let nodeList;

     //hide the main tags
     nodeList = document.querySelectorAll('.editRow'+ this.currentEditingTagIndex +'.main');
    
     this.alterClassList('remove', nodeList, 'd-none');
 
     // remove the d-none from the input
     nodeList = document.querySelectorAll('.editRow'+ this.currentEditingTagIndex +'.temp');
 
     this.alterClassList('add', nodeList, 'd-none');

  }

  editTag(tag, rowIndex) {

    if( this.currentEditingTagIndex !== null){
      this.hideTagEditingFields();
    }

    this.currentEditingTagIndex = rowIndex;

    let nodeList;

    this.editingTag._id = tag._id;
    this.editingTag.name = tag.name;
    this.editingTag.slug = tag.slug;

    //hide the main tags
    nodeList = document.querySelectorAll('.editRow'+rowIndex+'.main');
    
    this.alterClassList('add', nodeList, 'd-none');

    // remove the d-none from the input tags used fro editing
    nodeList = document.querySelectorAll('.editRow'+rowIndex+'.temp');

    this.alterClassList('remove', nodeList, 'd-none');

  }

  updateTag() {

    this.tagsService.updateTag(this.editingTag)
        .subscribe( response => {

          if(!response.tag.nModified){
            console.log("Operation failed");
          }
          
          this.tags[this.currentEditingTagIndex] = this.editingTag;

          this.hideTagEditingFields();

        });

  }

  alterClassList(alterType, nodeList, className) {

    let nodeClassList;

    for(var i = 0; i < nodeList.length; i++){
      
      nodeClassList = nodeList[i].classList;

      switch(alterType) {
        case 'add':
          nodeClassList.add('d-none');
          break;
        case 'remove':
          nodeClassList.remove('d-none');
          break;
      }

    }

  }

}
