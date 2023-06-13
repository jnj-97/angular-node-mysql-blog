import { Comment } from "./comment"
export interface Blogs {
  title:string,
  body:string,
  username:string,
  created_time:string,
  profile_picture:string,
  likes:number,
  liked:boolean,
  id:string,
  comments:Comment[]
}
export interface likes{
  likes:number
}
export interface liked{
  message:string
}
