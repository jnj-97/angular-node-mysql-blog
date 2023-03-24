import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent {

  @Input() author:string='';
  @Input() title:string='';
  @Input() body:string='';
  @Input() created:string='';

}
