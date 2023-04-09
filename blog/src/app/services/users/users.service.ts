import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,otherUser, searchUser } from 'src/app/interfaces/users';
import {liked} from 'src/app/interfaces/blogs'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL:string="http://localhost:5000/users/"
  constructor(private http:HttpClient) { }

  getProfile():Observable<User>{
    return this.http.get<User>(`${this.baseURL}getProfile`)
  }
  changeProfilePicture(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}changeprofilepicture`,body)
  }
  checkusername(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}checkusername`,body)
  }
  changeusername(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}changeusername`,body)
  }
  checkpassword(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}checkpassword`,body)
  }
  changepassword(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}changepassword`,body)
  }
  getOtherProfile(body:string):Observable<otherUser>{
    return this.http.get<otherUser>(`${this.baseURL}${body}`)
  }
  follow(body:string):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}follow`,body)
  }
  unfollow(body:string):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}unfollow`,body)
  }
  getProfileImage():Observable<liked>{
    return this.http.get<liked>(`${this.baseURL}profile/getProfilePicture`)
  }
  searchUsers(body:string):Observable<searchUser[]>{
    return this.http.get<searchUser[]>(`${this.baseURL}search/${body}`)
  }
}
