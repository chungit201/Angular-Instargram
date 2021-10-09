import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/services/comment.service';
import { CommentModel } from 'src/app/model/comment-model';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Input } from '@angular/core';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
})
export class CommentComponent implements OnInit {
  @Input() itemPost: any;
  // @Output() onCreateComment: EventEmitter<any> = new EventEmitter();
  private comment: CommentModel[] = [];

  commentForm = new FormGroup({
    content: new FormControl(''),
  });
  constructor(
    private commentService: CommentService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    // console.log(this.itemPost);
  }

  public createComment(): void {
    this.comment = [
      {
        content: this.commentForm.value.content,
        user: this.userService.getID() as any,
        status: this.itemPost._id,
      },
    ];
    this.commentService.createComment(this.comment).subscribe(() => {
      this.commentForm.setValue({ content: '' });
    });
  }

  //Resize input comment
  reSizeComment(event: any) {
    const textarea: any = document.querySelector('.textarea_comment');
    textarea.style.height = '21px';
    let scHeight = event.target.scrollHeight;
    textarea.style.height = `${scHeight}px`;
  }
}
