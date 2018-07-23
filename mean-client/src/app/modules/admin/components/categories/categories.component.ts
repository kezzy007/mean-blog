import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';

interface ICategories{
  _id: string;
  name: string;
  slug: string;
}


@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  category = {
    _id:'',
    name: '',
    slug: ''
  };
  
  editingCategory = {
    _id: '',
    name: '',
    slug: ''
  };

  currentEditingCategoryIndex;

  categories : ICategories[] = [];

  constructor(
    private catService: CategoriesService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {

    this.catService.getCategories()
        .subscribe(response => {

          console.log(response);

          if(!response.success) return; 

          this.categories = response.categories;

        }); 

  }

  addNewCategory() {

    const category = {
      name : this.category.name,
      slug: this.category.slug
    }


    this.catService.addNewCategory(category)
        .subscribe(response => {

          if(!response.success) return;

          this.clearAddCategoryField()

          this.categories.push(response.category);

        });

  }

  clearAddCategoryField() {

    Object.keys(this.category).forEach(key => {

      this.category[key] = '';
      
    })
    

  }

  categoryListTracker(index) {
    return index;
  }

  hideCategoryEditingFields(){
    
    let nodeList;

    //hide the main tags
    nodeList = document.querySelectorAll('.editRow'+ this.currentEditingCategoryIndex +'.main');
   
    this.alterClassList('remove', nodeList, 'd-none');

    // remove the d-none from the input
    nodeList = document.querySelectorAll('.editRow'+ this.currentEditingCategoryIndex +'.temp');

    this.alterClassList('add', nodeList, 'd-none');

 }

 editCategory(category, rowIndex) {

   if( this.currentEditingCategoryIndex !== null){
     this.hideCategoryEditingFields();
   }

   this.currentEditingCategoryIndex = rowIndex;

   let nodeList;

   this.editingCategory._id = category._id;
   this.editingCategory.name = category.name;
   this.editingCategory.slug = category.slug;

   //hide the main tags
   nodeList = document.querySelectorAll('.editRow'+rowIndex+'.main');
   
   this.alterClassList('add', nodeList, 'd-none');

   // remove the d-none from the input tags used fro editing
   nodeList = document.querySelectorAll('.editRow'+rowIndex+'.temp');

   this.alterClassList('remove', nodeList, 'd-none');

 }

 updateCategory() {

   this.catService.updateCategory(this.editingCategory)
       .subscribe( response => {

         if(!response.category.nModified){
           console.log("Operation failed");
           return;
         }
         
         this.categories[this.currentEditingCategoryIndex] = this.editingCategory;

         this.hideCategoryEditingFields();

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
