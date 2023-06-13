import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AddHeaderService implements HttpInterceptor {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token:any=localStorage.getItem('token')
    if(token==null){
      return next.handle(request)
    }
    else{
   let tokenRequest=request.clone({
       setHeaders:{
        Authorization:token
       }
    })
    return next.handle(tokenRequest);
  }
  }
}
