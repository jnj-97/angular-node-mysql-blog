import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginGuard } from './guards/auth/login.guard';

const routes: Routes = [

  {path:"login",component:LoginComponent},
  {path:"home",component:NavbarComponent,canActivate:[LoginGuard]},
  {path:"signUp",component:SignupComponent},
{path:"",redirectTo:"/login",pathMatch:"full"}
];

@NgModule({
  providers:[LoginGuard],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
