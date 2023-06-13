
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
constructor(private authService:AuthService,private router:Router){}
ngOnInit(){}
registrationError:boolean=false

  onSignUpSubmit(signUpForm:any) {
    console.log(signUpForm.value);
    this.authService.register(signUpForm.value).subscribe(res=>{
      if(res.message=="added"){
        this.router.navigate(['/login'])
      }
      else{
        this.registrationError=!this.registrationError
      }
    },
    err=>console.log("Unknown Error Occurred: ",err))
  }
}
