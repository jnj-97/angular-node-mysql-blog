import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
import { Comment } from 'src/app/interfaces/comment';
import { searchUser } from 'src/app/interfaces/users';
import { Blogs,likes,liked} from '../../interfaces/blogs';


@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private baseURL:string="http://localhost:5000/blogs/"
  constructor(private http:HttpClient) {}
  getBlogs():Observable<Blogs[]>{
    return this.http.get<Blogs[]>(`${this.baseURL}home`)
  }
  getFollowed():Observable<Blogs[]>{
    return this.http.get<Blogs[]>(`${this.baseURL}followed`)
  }
  addBlog(body:JSON):Observable<JSON>{
    return this.http.post<JSON>(`${this.baseURL}addpost`,body)
  }
  likeBlog(body: JSON): Observable<liked> {
    let response:any;
    response=this.http.post<liked>(`${this.baseURL}likeblog`, body)
    console.log("response: ",response)
    return response
  }
  checkLikes(body:JSON):Observable<likes>{
    return this.http.post<likes>(`${this.baseURL}checklikes`,body)
  }
  addComment(body:JSON):Observable<Comment[]>{
    console.log("addComment called")
    return this.http.post<Comment[]>(`${this.baseURL}addComment`,body)
  }
  getLikes(body:JSON):Observable<searchUser[]>{
   return this.http.post<searchUser[]>(`${this.baseURL}likeList`,body)
  }

}
