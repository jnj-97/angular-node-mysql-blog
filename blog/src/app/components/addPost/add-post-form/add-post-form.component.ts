import { Component } from '@angular/core';
import { BlogsService } from 'src/app/services/blogs/blogs.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent {
  constructor(private http:BlogsService){}
  empty:boolean=false;
  onSubmit(postForm:any){
    this.empty=false
    if(postForm.value.title==""||postForm.value.body==""){
      this.empty=true
    }
    console.log(postForm.value)
    this.http.addBlog(postForm.value).subscribe(res=>{
      console.log(res)
    },
    err=>{console.log(err)})

  }
}
