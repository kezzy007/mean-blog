import { Component, OnInit } from '@angular/core';
import { CategoriesService } from './services/categories.service';

interface ICategories{
  id: string;
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
    name: '',
    slug: ''
  };

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

    this.catService.addNewCategory(this.category)
        .subscribe(response => {

          if(!response.success) return;
          
          this.categories.push(response.category);

        });

  }

  categoryListTracker(index) {
    return index;
  }

  editCategory(category) {

  }
}
