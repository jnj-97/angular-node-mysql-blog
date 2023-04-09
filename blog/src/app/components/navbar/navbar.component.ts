import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import {Blogs} from 'src/app/interfaces/blogs'
import { DatePipe } from '@angular/common';
import { UsersService } from 'src/app/services/users/users.service';
import { searchUser } from 'src/app/interfaces/users';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
 blogs:Blogs[]=[]
 results:boolean=false;
 profileClicked:boolean=false;
 searchUsers:searchUser[]=[];
 profilePicture:string='../../../assets/images/account.png'
  constructor(private http:BlogsService,private userService:UsersService,private router:Router,private datepipe:DatePipe){}
  ngOnInit(){
    this.userService.getProfileImage().subscribe(res=>{
      if(res.message==""){}
      else{
        console.log("res line 23: ",res)
        this.profilePicture="data:image/png;base64,"+res.message
        console.log("profilePicture: ",this.profilePicture)
      }
    })
    this.http.getBlogs().subscribe(res=>{
      res.forEach(blog=>{
        if(blog.created_time){
        const date: Date = new Date(blog.created_time);
        blog.created_time = this.datepipe.transform(date, "dd-MM-YYYY hh:mm a") || '';
        blog.comments.forEach(comment=>{
          if(comment.created_at){
            const comment_date: Date = new Date(comment.created_at);
            comment.created_at = this.datepipe.transform(comment_date, "dd-MM-YYYY hh:mm a") || '';
          }
        })
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
searchUser(event:any){
  if(event.target.value==""){
    this.results=false
  }
  else{
    this.userService.searchUsers(event.target.value).subscribe(res=>{
      this.results=true
      this.searchUsers=res

    })
  }
}
}
