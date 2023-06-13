import { Component,Input } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs/blogs.service';
import { Comment } from 'src/app/interfaces/comment';
import { DatePipe } from '@angular/common';
import { searchUser } from 'src/app/interfaces/users';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {
  name:string=''
  likesDisplay:boolean=false
  likeList:searchUser[]=[];
  @Input() author:string='';
  @Input() title:string='';
  @Input() body:string='';
  @Input() created:string='';
  @Input() id:string='';
  @Input() likes:number=0
  @Input() liked:boolean=false;
  @Input() profile_picture:string=''
@Input() user:string=''
@Input() comments:Comment[]=[];

  constructor(private http:BlogsService,private datepipe:DatePipe){
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
  addComment(){
  console.log("Comment: ",this.name)
    if(this.name==""){}
    else{
    const blogData = { id: this.id,message:this.name };
  const jsonData = JSON.stringify(blogData);
  const jsonObject = JSON.parse(jsonData);
    this.http.addComment(jsonObject).subscribe(res=>{

      for(let comment of res){
        if(comment.created_at){
          const comment_date: Date = new Date(comment.created_at);
          comment.created_at = this.datepipe.transform(comment_date, "dd-MM-YYYY hh:mm a") || '';
        }
      }
      this.comments=res
      this.name=""
    })
 }
}
  showLikes(){
    const blogData = { id: this.id};
    const jsonData = JSON.stringify(blogData);
    const jsonObject = JSON.parse(jsonData);
    if(!this.likesDisplay)
    this.http.getLikes(jsonObject).subscribe(res=>{
      this.likeList=res
      this.likesDisplay=true
    })
    else{
      this.likesDisplay=false
    }
  }


}
