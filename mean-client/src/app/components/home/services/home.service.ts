import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HomeService {

  host = environment.host;

  constructor(private http: HttpClient) { }

  getBlogPosts(url): Observable<any> {

    const fetchUrl = (url !== null) ? (url.join('/')) : 'posts'

    return this.http.get<any>(this.host + `/users/${fetchUrl}`)
              .map(response => response);

  }

  submitComment(comment): Observable<any> {

    return this.http.post<any>(this.host + '/users/save-comment', { comment:comment })
                .map(response => response);

  }

}
