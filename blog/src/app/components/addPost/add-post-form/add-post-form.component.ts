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
    this.http.addBlog(postForm.value).subscribe(res=>{
      console.log(res)
      location.reload()
      console.log("line after reload line")
    })

  }
}
