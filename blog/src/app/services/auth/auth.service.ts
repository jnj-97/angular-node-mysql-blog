import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Auth, tokenResponse } from 'src/app/interfaces/auth';
import { Blogs } from 'src/app/interfaces/blogs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseURL:string="http://localhost:4000"
  constructor(private http:HttpClient) {}

register(body:JSON):Observable<Auth>{
  return this.http.post<Auth>(`${this.baseURL}/users/register`,body)
}
login(body:JSON):Observable<Auth>{
  return this.http.post<Auth>(`${this.baseURL}/users/login`,body)
}

}
