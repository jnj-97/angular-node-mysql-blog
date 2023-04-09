import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  constructor(){}
  @Input() message:string='';
  @Input() profile_picture:string='';
  @Input() username:string='';
  @Input() created_at:string='';

  ngOnInit(){}

}
