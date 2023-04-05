import { DatePipe } from '@angular/common';
import { ReadVarExpr } from '@angular/compiler';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/users';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-me',
  templateUrl: './me.component.html',
  styleUrls: ['./me.component.css']
})
export class MeComponent {
  users:User={email:"",profile_picture:"",username:"",blogs:[]}
  profilePicture:string="data:image/png;base64,"
  changeUsername:boolean=false;
  changePassword:boolean=false;
  checkUsername:boolean=false;
  checkPassword:boolean=false;
  emptyUsername:boolean=false;
  emptyPassword:boolean=false;
  samePassword:boolean=false;
  wrongPassword:boolean=false;
  constructor(private router:Router,private http:UsersService,private datepipe:DatePipe){}
  ngOnInit(){
this.http.getProfile().subscribe(res=>{
  this.users=res
  this.profilePicture=this.profilePicture+res.profile_picture
  for(let blog of this.users.blogs){
    const date: Date = new Date(blog.created_time);
    blog.created_time = this.datepipe.transform(date, "dd-MM-YYYY hh:mm a") || '';
  }
})
  }
goback(){
  this.router.navigate(['/home'])
}
onFileSelected(event:any){
  const image:File=event.target.files[0]
  const file:FileReader=new FileReader();
  file.readAsDataURL(image);
  file.onload=()=>{
    const imageURL=file.result as string;
    const base64=imageURL.split(',')[1];
    const jsondata={image:base64}
    const jsonData = JSON.stringify(jsondata);
  const jsonObject = JSON.parse(jsonData);
    this.http.changeProfilePicture(jsonObject).subscribe(res=>{
      if(res.message=="changed"){
        location.reload()
      }
    })
  }
}
notUsername(){
  console.log("change username clicked: ",this.changeUsername)
  this.changeUsername=!this.changeUsername
}
changeusername(username:any){

  if(this.checkUsername){

  }
  if(username.value.username.length==0){
    this.emptyUsername=true;
  }
  else{
    const jsondata={username:username.value.username}
    const jsonData = JSON.stringify(jsondata);
  const jsonObject = JSON.parse(jsonData);
this.http.changeusername(jsonObject).subscribe(res=>{
  if(res.message=="changed"){
    location.reload()
  }
})
  }
  console.log(username.value)
}
checkusername(username:any){
  this.checkUsername=false
  console.log("username value changed: ",username)
  this.checkUsername=false
  const jsondata={username:username}
    const jsonData = JSON.stringify(jsondata);
  const jsonObject = JSON.parse(jsonData);
  this.http.checkusername(jsonObject).subscribe(res=>{
    if(res.message=="exists"){
      this.checkUsername=true
    }
  })
}
changepassword(password:any){
this.checkPassword=false;
this.emptyPassword=false;
this.samePassword=false;
this.wrongPassword=false;
if(password.value.confirmpassword!=password.value.newpassword){
    this.checkPassword=true
  }
  if(password.value.oldpassword.length==0||password.value.newpassword.length==0||password.value.confirmpassword.length==0){
    this.emptyPassword=true;
  }
  else if(password.value.oldpassword==password.value.newpassword){
    this.samePassword=true
  }
  else{
    const jsondata={oldpassword:password.value.oldpassword}
    const jsonData = JSON.stringify(jsondata);
  const jsonObject = JSON.parse(jsonData);
this.http.checkpassword(jsonObject).subscribe(res=>{
  if(res.message=="true"){
    const jsondata1={newpassword:password.value.newpassword}
    const jsonData1=JSON.stringify(jsondata1)
    const jsonObject1=JSON.parse(jsonData1);
    this.http.changepassword(jsonObject1).subscribe(res=>{
      if(res.message=="changed"){
        location.reload()
      }
    })
    location.reload()
  }
  else if(res.message=="false"){
this.wrongPassword=true;
  }
})
  }
  console.log(password.value)
}
notpassword(){
  this.changePassword=!this.changePassword
}
}
