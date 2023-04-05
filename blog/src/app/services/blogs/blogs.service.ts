import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
import { Blogs,likes,liked} from '../../interfaces/blogs';


@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private baseURL:string="http://localhost:5000"
  constructor(private http:HttpClient) {}
  getBlogs():Observable<Blogs[]>{
    return this.http.get<Blogs[]>(`${this.baseURL}/blogs/home`)
  }
  addBlog(body:JSON):Observable<JSON>{
    return this.http.post<JSON>(`${this.baseURL}/blogs/addpost`,body)
  }
  likeBlog(body: JSON): Observable<liked> {
    let response:any;
    response=this.http.post<liked>(`${this.baseURL}/blogs/likeblog`, body)
    console.log("response: ",response)
    return response
  }
  checkLikes(body:JSON):Observable<likes>{
    return this.http.post<likes>(`${this.baseURL}/blogs/checklikes`,body)
  }
}
