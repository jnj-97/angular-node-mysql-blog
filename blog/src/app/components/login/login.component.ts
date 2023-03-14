import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private http:AuthService,private router:Router){}
loginError:string=""
loginSubmit(loginForm:any){
  console.log(loginForm.value)
  this.http.login(loginForm.value).subscribe(res=>{
    console.log(res)
    if(res.message=="true"){


      localStorage.setItem('token',res?.token??'null')

      this.router.navigate(['/home'])
    }
    else if(res.message=="Invalid Password"){
      this.loginError=res.message
    }
    else if(res.message=="Invalid User. Please Register"){
      this.loginError=res.message
    }
    else{
      this.loginError="Unknown Error. Please Try Again"
    }
  },
  err=>{this.loginError=err})
  console.log("After request")
}
}
