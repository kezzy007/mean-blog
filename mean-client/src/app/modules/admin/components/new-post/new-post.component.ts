import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NewPostService } from './services/new-post.service';
import { PostService } from '../posts/services/post.service';
import { ToasterService } from 'angular5-toaster'

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})

export class NewPostComponent implements OnInit {

  @Input() postToEdit;

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
  
  tinymceConfig = {
    max_width: '1000',
    min_height: '200'
  };

  tags;
  
  categories;

  postEditId = '';

  constructor(
    private router: ActivatedRoute,
    private newPostService: NewPostService,
    private postService: PostService,
    private toasterService: ToasterService
  ) { 


  }

  ngOnInit() {

    this.getTagsAndCategoriesList()

  }

  updateFormFieldsIfEditing() {

    if(this.postToEdit) {
      
      this.postEditId = this.postToEdit._id

      this.initializeFormObjectWithPostProps()

      this.mergePostCategoryAndSelect()
    }

  }

  mergePostCategoryAndSelect() {
    
    this.categories = 
        this.categories.filter( 
              category => 
              category._id !== this.postToEdit.category._id
            )

    this.categories.unshift(this.postToEdit.category)

  }

  initializeFormObjectWithPostProps() {

    Object.keys(this.form).forEach(key => {

      this.form[key] = this.postToEdit[key]

    })

  }

  getTagsAndCategoriesList() {
    
    this.newPostService.getTagsAndCategoriesList()
        .subscribe(response => {

          this.tags = response.tags;
          this.categories = response.categories;

          this.initializePostCategory()

          this.updateFormFieldsIfEditing()
        });

  }

  initializePostCategory(){
    this.form.category = 
      this.categories.length > 0 ? 
        this.categories[0]: null
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  savePost() {

    this.generatePostSlug();

    this.newPostService.savePost(this.form, this.postEditId )
        .subscribe(response => {

          console.log(response);
          
          //return if failed
          if(!response.success) {
            (this.displayToast('error', 'Update failed'))
            return
          }

          // Implies an update for a post
          if( this.postEditId !== '' ){

            this.handlePostUpdateResponse(response)
            return
          }

          // Notify post saved
          if(response.success) {

            this.displayToast('success','Post saved')
            return
            
          }
          

        });
  }

  handlePostUpdateResponse(updateResponse) {

    updateResponse.updateStatus ?
      (this.displayToast('success', 'Update successful')) : 
      (this.displayToast('error', 'Update failed'))

  }

  displayToast(status, message) {

    this.toasterService.pop(status, '', message);

  }

  checkIfTagExists(tag) {

    (this.form.tags.find(postTag => tag._id === postTag._id ) !== undefined) ? "checked" : '' 

  }

  generatePostSlug() {

    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();

    this.form.slug = this.form.title.replace(' ', '-').toLowerCase() + '/' + day + '/' + month + '/' + year;

  }

  toggleTag(tag) {

    if(this.form.tags.indexOf(tag) !== -1){
      this.form.tags.splice(this.form.tags.indexOf(tag), 1);
    }
    else{
      this.form.tags.push(tag);
    }
  }

  togglePostFeatured($event) {

    // const postFeaturedElement = $event.target;

    // if (postFeaturedElement.classList.contains('fa-star-o') ){
    //   postFeaturedElement.classList.remove('fa-star-o');
    //   postFeaturedElement.classList.add('fa-star');
    // } 
    // else{
    //   postFeaturedElement.classList.remove('fa-star');
    //   postFeaturedElement.classList.add('fa-star-o');
    // }

    this.form.featured = !this.form.featured;

  }

  setPostCategory($event){

    // console.log("Setting category", $event.target.value.toLowerCase(), this.categories);

    if(this.categories === null) return;

   for(var i = 0; i < this.categories.length; i++){

      if (this.categories[i].name.toLowerCase() === $event.target.value.toLowerCase()) {
        
        this.form.category = this.categories[i];
        break;

      }

   }
      


  }

}
