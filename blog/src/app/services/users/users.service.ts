import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,otherUser, searchUser } from 'src/app/interfaces/users';
import {liked} from 'src/app/interfaces/blogs'
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private baseURL:string="http://localhost:5000"
  constructor(private http:HttpClient) { }

  getProfile():Observable<User>{
    return this.http.get<User>(`${this.baseURL}/users/getProfile`)
  }
  changeProfilePicture(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}/users/changeprofilepicture`,body)
  }
  checkusername(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}/users/checkusername`,body)
  }
  changeusername(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}/users/changeusername`,body)
  }
  checkpassword(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}/users/checkpassword`,body)
  }
  changepassword(body:JSON):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}/users/changepassword`,body)
  }
  getOtherProfile(body:string):Observable<otherUser>{
    return this.http.get<otherUser>(`${this.baseURL}/users/${body}`)
  }
  follow(body:string):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}/users/follow`,body)
  }
  unfollow(body:string):Observable<liked>{
    return this.http.post<liked>(`${this.baseURL}/users/unfollow`,body)
  }
  getProfileImage():Observable<liked>{
    return this.http.get<liked>(`${this.baseURL}/users/profile/getProfilePicture`)
  }
  searchUsers(body:string):Observable<searchUser[]>{
    return this.http.get<searchUser[]>(`${this.baseURL}/users/search/${body}`)
  }
}
