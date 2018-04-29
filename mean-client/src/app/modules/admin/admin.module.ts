import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, Router} from '@angular/router';
import { FormsModule, RadioControlValueAccessor, CheckboxControlValueAccessor } from '@angular/forms';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PostsComponent } from './components/posts/posts.component';
import { TagsComponent } from './components/tags/tags.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NewPostComponent } from './components/new-post/new-post.component';

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
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule, DashboardComponent ],
  declarations: [ RadioControlValueAccessor,
                  DashboardComponent,
                  PostsComponent,
                  TagsComponent,
                  CategoriesComponent,
                  NewPostComponent]
})
export class AdminModule { }
