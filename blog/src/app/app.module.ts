import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthService } from './services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { AddHeaderService } from './services/interceptors/add-header.service';
import { AddPostFormComponent } from './components/addPost/add-post-form/add-post-form.component';
import { CommonModule, DatePipe } from '@angular/common';
import { MeComponent } from './components/me/me.component';
import { ProfileComponent } from './components/profile/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BlogsComponent,
    LoginComponent,
    SignupComponent,
    AddPostFormComponent,
    MeComponent,
    ProfileComponent ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [ {
    provide:HTTP_INTERCEPTORS,
    useClass:AddHeaderService,
    multi:true
  },AuthService,DatePipe

],
  bootstrap: [AppComponent]
})
export class AppModule { }
