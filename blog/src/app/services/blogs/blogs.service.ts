import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Blogs } from '../../interfaces/blogs';

@Injectable({
  providedIn: 'root'
})
export class BlogsService {

  private baseURL:string="http://localhost:3000"
  constructor(private http:HttpClient) {}
  getBlogs():Observable<Blogs>{
    return this.http.get<Blogs>(`${this.baseURL}/users/home`)
  }
}
