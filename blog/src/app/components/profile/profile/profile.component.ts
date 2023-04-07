import { Component } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { UsersService } from 'src/app/services/users/users.service';
import { User,otherUser } from 'src/app/interfaces/users';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profilePicture:string="data:image/png;base64,"
  userExists:boolean=false
  user:otherUser={profile_picture:"",blogs:[],message:"",followed:false}
  username:string=''
constructor(private router:Router,private http:UsersService,private datepipe:DatePipe,private route:ActivatedRoute){}
ngOnInit(){
  this.username = this.route.snapshot.paramMap.get('username') as string;

  this.http.getOtherProfile(this.username).subscribe(res=>{
    this.user=res
    console.log(res)
    if(res.message=="User doesnt exist"){
      this.userExists=false
      console.log("res: ",res)
    }
    else if(res.message=="user exists"){
      this.userExists=true
    this.profilePicture=this.profilePicture+this.user.profile_picture
    for(let blog of this.user.blogs){
      const date: Date = new Date(blog.created_time);
      blog.created_time = this.datepipe.transform(date, "dd-MM-YYYY hh:mm a") || '';
    }
}})
}
goback(){
  this.router.navigate(['/home'])
}
follow(){
  const jsondata={username:this.username}
  const jsonData = JSON.stringify(jsondata);
const jsonObject = JSON.parse(jsonData);
  this.http.follow(jsonObject).subscribe(res=>{
    if(res.message=="followed"){
      location.reload()
    }
  })
}
unfollow(){
  const jsondata={username:this.username}
  const jsonData = JSON.stringify(jsondata);
const jsonObject = JSON.parse(jsonData);
  this.http.unfollow(jsonObject).subscribe(res=>{
    if(res.message=="unfollowed"){
      location.reload()
    }
  })
}
}
