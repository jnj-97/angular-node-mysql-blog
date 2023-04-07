import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import {Blogs} from 'src/app/interfaces/blogs'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 blogs:Blogs[]=[]
 profileClicked:boolean=false
  constructor(private http:BlogsService,private router:Router,private datepipe:DatePipe){}
  ngOnInit(){

    this.http.getBlogs().subscribe(res=>{
      res.forEach(blog=>{
        if(blog.created_time){
        const date: Date = new Date(blog.created_time);
        blog.created_time = this.datepipe.transform(date, "dd-MM-YYYY hh:mm a") || '';
    }
  })
     this.blogs=res

    },
    err=>
    {
      if(err.status==401 || err.status==500 || err.status==403){
        localStorage.removeItem('token')
        this.router.navigate(['/login'])
      }
    })
  }
profileClick(){
  this.profileClicked=!this.profileClicked
}
profilePage(){
  this.router.navigate(['/me'])
}
logOut(){
  localStorage.setItem('token','')
  this.router.navigate(['/login'])
}
follow(){
  this.http.getFollowed().subscribe(res=>{
    res.forEach(blog=>{
      if(blog.created_time){
      const date: Date = new Date(blog.created_time);
      blog.created_time = this.datepipe.transform(date, "dd-MM-YYYY hh:mm a") || '';
  }})
  this.blogs=res
})}
reload(){
  location.reload()
}
}
