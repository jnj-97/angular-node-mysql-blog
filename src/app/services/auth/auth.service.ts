import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from 'src/app/interfaces/auth';
import { liked } from 'src/app/interfaces/blogs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private baseURL:string="https://ebc6-13-233-250-80.ngrok-free.app/users/"
  constructor(private http:HttpClient) {}

register(body:JSON):Observable<Auth>{
  return this.http.post<Auth>(`${this.baseURL}register`,body)
}
login(body:JSON):Observable<Auth>{
  return this.http.post<Auth>(`${this.baseURL}login`,body)
}
validateToken():Observable<liked>{
  return this.http.get<liked>(`${this.baseURL}validate`)
}

}
