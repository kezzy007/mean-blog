import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from  '@angular/common/http'
import { Observable } from 'rxjs'
import 'rxjs/add/operator/map'

import { environment } from '../../../../environments/environment';



@Injectable()
export class RegisterService {

  host = environment.host
  notifyLoggedIn = new EventEmitter<any>()

  constructor(private http: HttpClient) { }

  registerUser( user ): Observable<any> {

    return this.http.post<any>(`${this.host}/users/register`, { user })
                .map( response =>{
                  
                    if(response.success){
                      this.notifyLoggedIn.emit({ ...response });
                    }
                  
                    return response 
                  
                  })

  }
}
