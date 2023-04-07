import { Blogs } from "./blogs";

export interface User {
  email:string,
  profile_picture:string,
  username:string,
  blogs:Blogs[]
}

export interface otherUser{
  profile_picture:string,
  followed:boolean,
  message:string
  blogs:Blogs[]
}
