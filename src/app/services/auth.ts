import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { userQUery } from '../models/query-Model.model';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private baseUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {}

  register(user:any):Observable<any>{
    return this.http.post(this.baseUrl+"/register",user,{responseType:'text'});
  }

  login(user:any):Observable<any>{
    return this.http.post(this.baseUrl+"/login",user);
  }

  practice():Observable<any>{
    return this.http.get(this.baseUrl+"/practice",{responseType:'text'})
  }

  upload(uploadData:any):Observable<any>{
    return this.http.post(this.baseUrl+"/s3/upload",{responseType:'text'})
  }

  userQuery(queryData:any):Observable<any>{
    return this.http.post(this.baseUrl+"/putUserQuery",queryData,{responseType:'text'})
  }

  loadQUeries():Observable<any>{
    return this.http.get<userQUery[]>(this.baseUrl+"/loadQueries")
  }

  logout(refreshToken:String|null):Observable<any>{
    return this.http.post(this.baseUrl+"/logout",refreshToken,{responseType:'text'})
  }
  refresh(refreshToken:String):Observable<any>{
    return this.http.post(this.baseUrl+"/refresh",refreshToken,{responseType:'text'})
  }
}
