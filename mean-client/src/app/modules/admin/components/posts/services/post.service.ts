import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { environment } from '../../../../../../environments/environment';

@Injectable()
export class PostService {

  host = environment.host;
  @Output() postEditEvent = new EventEmitter<any>()

  constructor(
    private http: HttpClient
  ) { }

  fetchPosts(): Observable<any> {

    return this.http.post<any> (this.host + '/admin/posts', null)
                .map(response =>response);

  }

  deletePost(postId): Observable<any> {

    return this.http.post<any> (
                this.host + '/admin/delete-post', 
                {'postId': postId})
                .map(response =>response);

  }

  // savePost(formObject): Observable<any> {

  //   return this.http.post(this.host + '/admin/save-post', {formObject: formObject})
  //               .map(response => response);

  // }
}
