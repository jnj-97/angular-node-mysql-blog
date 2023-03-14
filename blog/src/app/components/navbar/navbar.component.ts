import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BlogsService } from 'src/app/services/blogs/blogs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  constructor(private http:BlogsService,private router:Router){}
  ngOnInit(){
    this.http.getBlogs().subscribe(res=>{
      console.log("blogs: ",res)
    },
    err=>
    {
      if(err.status==401 || err.status==500 || err.status==403){
        this.router.navigate(['/login'])
      }
    })
  }


}
