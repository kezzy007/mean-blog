import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewPostService } from './services/new-post.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  form = {
    title: '',
    slug:'',
    description: '',
    featured: false,
    tags: [],
    category: null,
    status: '',
    content: ''
  };
  
  tags;
  categories;

  constructor(
    private router: ActivatedRoute,
    private newPostService: NewPostService
  ) { }

  ngOnInit() {

    this.getTagsAndCategoriesList();

  }

  getTagsAndCategoriesList() {
    
    this.newPostService.getTagsAndCategoriesList()
        .subscribe(response => {

          console.log(response);
          
          this.tags = response.tags;
          this.categories = response.categories;

        });

  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  savePost() {
    console.log(this.form);

    this.generatePostSlug();

    this.newPostService.savePost(this.form)
        .subscribe(response => {

          console.log(response);


        });
  }

  generatePostSlug() {

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    this.form.slug = this.form.title.replace(' ', '-') + '/' + day + '/' + month + '/' + year;

  }

  toggleTag(tag) {

    // console.log('toggling tag', tag);

    if(this.form.tags.indexOf(tag) !== -1){
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    }
    else{
      this.form.tags.push(tag);
    }
  }

  togglePostFeatured($event) {

    const postFeaturedElement = $event.target;

    if (postFeaturedElement.classList.contains('fa-star-o') ){
      postFeaturedElement.classList.remove('fa-star-o');
      postFeaturedElement.classList.add('fa-star');
    } 
    else{
      postFeaturedElement.classList.remove('fa-star');
      postFeaturedElement.classList.add('fa-star-o');
    }

    this.form.featured = !this.form.featured;

  }

  setPostCategory($event){

    console.log("Setting category");

    if(this.categories == null) return;

   for(var i = 0; i < this.categories.length; i++){

      if (this.categories[i].name.toLowerCase() === $event.target.value.toLowerCase()) {
        
        this.form.category = this.categories[i];
        break;

      }

   }
      


  }

}
