import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class CategoriesService {

  host = 'http://localhost:3200/admin';

  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<any> {

    return this.http.post<any>(this.host + '/categories', null).map(response => response);

  }

  addNewCategory(category): Observable<any> {

    return this.http.post<any> (this.host + '/add-category', {category: category})
                .map(response => response);
  }
}
