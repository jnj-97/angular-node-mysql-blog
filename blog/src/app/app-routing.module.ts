import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { MeComponent } from './components/me/me.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [

  {path:"login",component:LoginComponent},
  {path:"home",component:NavbarComponent},
  {path:"signUp",component:SignupComponent},
{path:"",redirectTo:"/login",pathMatch:"full"},
{path:"me",component:MeComponent},
{path:"users/:username",component:ProfileComponent}
];

@NgModule({
  providers:[],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
