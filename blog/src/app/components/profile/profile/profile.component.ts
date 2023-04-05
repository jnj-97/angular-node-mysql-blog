import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User } from 'src/app/interfaces/users';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profilePicture:string="data:image/png;base64,"
  users:User={email:"",profile_picture:"",username:"",blogs:[]}
  username:string=''
constructor(private router:Router,private http:UsersService,private datepipe:DatePipe,private route:ActivatedRoute){}
ngOnInit(){
  this.username = this.route.snapshot.paramMap.get('username') as string;
  const jsondata={username:this.username}
    const jsonData = JSON.stringify(jsondata);
  const jsonObject = JSON.parse(jsonData);
  this.http.getOtherProfile(jsonObject).subscribe(res=>{
    this.users=res
    this.profilePicture=this.profilePicture+this.users.profile_picture
    for(let blog of this.users.blogs){
      const date: Date = new Date(blog.created_time);
      blog.created_time = this.datepipe.transform(date, "dd-MM-YYYY hh:mm a") || '';
    }
  })
}
goback(){
  this.router.navigate(['/home'])
}
}
