import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router} from '@angular/router';
import { FormsModule, ReactiveFormsModule, CheckboxControlValueAccessor } from '@angular/forms';
import { TinyMceModule, tinymceDefaultSettings } from 'angular-tinymce';


import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { TagsComponent } from './components/tags/tags.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewPostComponent } from './components/new-post/new-post.component';

// Providers 
import { TagsService } from './components/tags/services/tags.service';
import { CategoriesService } from './components/categories/services/categories.service';
import { NewPostService } from './components/new-post/services/new-post.service';


const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: PostsComponent
      },
      {
        path: 'new-post',
        component: NewPostComponent
      },
      {
        path: 'categories',
        component: CategoriesComponent
      },
      {
        path: 'tags',
        component: TagsComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TinyMceModule.forRoot(tinymceDefaultSettings()),
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule, FormsModule, DashboardComponent ],
  declarations: [ 
                  DashboardComponent,
                  PostsComponent,
                  TagsComponent,
                  CategoriesComponent,
                  NewPostComponent
                ],
  providers: [TagsService, CategoriesService, NewPostService]
})
export class AdminModule { }
