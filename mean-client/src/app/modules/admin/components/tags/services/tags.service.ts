import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class TagsService {

  host = 'http://localhost:3200/admin';

  constructor(
    private http: HttpClient
  ) { }

  getTags(): Observable<any> {

    return this.http.post<any>(this.host + '/tags', null).map(response => response);

  }

  addNewTag(tag): Observable<any> {

    return this.http.post<any> (this.host + '/add-tag', {tag: tag}).map(response => response);
  }

  updateTag(tag): Observable<any> {

    return this.http.post<any> (this.host + '/update-tag', {tag: tag}).map(res => res);

  }

}
