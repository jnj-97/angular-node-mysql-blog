import { Component,Input } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs/blogs.service';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {

  @Input() author:string='';
  @Input() title:string='';
  @Input() body:string='';
  @Input() created:string='';
  @Input() id:string='';
  @Input() likes:number=0
  @Input() liked:boolean=false;
  @Input() profile_picture:string=''


  constructor(private http:BlogsService){
    console.log("profile_picture: ",this.profile_picture)
  }
  like(){
    this.liked=!this.liked
    const blogData = { id: this.id };
  const jsonData = JSON.stringify(blogData);
  const jsonObject = JSON.parse(jsonData);
  console.log("like button clicked")
  this.http.likeBlog(jsonObject).subscribe(res=>{
    console.log("res: ",res)
    if(res.message=="liked"){
        this.http.checkLikes(jsonObject).subscribe(res=>{
          console.log("likes: ",res.likes)
          this.likes=Number(res.likes)
        })
    }
    else{
      console.log("Error occured when liking/unliking post")
    }
  })
  }

}
