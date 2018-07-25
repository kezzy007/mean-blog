import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../../../environments/environment';

@Injectable()
export class NewPostService {

  host = environment.host;

  constructor(
    private http: HttpClient
  ) { }

  getTagsAndCategoriesList(): Observable<any> {

    return this.http.post<any> (this.host + '/admin/tags-and-categories', null)
                .map(response =>response);

  }

  savePost(formObject, postEditId = ''): Observable<any> {

    return this.http.post(this.host + '/admin/save-post', {formObject: formObject, postEditId: postEditId})
                .map(response => response);

  }
}
