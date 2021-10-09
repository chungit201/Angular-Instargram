import { Component, Input, OnInit } from '@angular/core';
import { LikeService } from 'src/app/services/like.service';
import { LikeModel } from 'src/app/model/like-model';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css'],
})
export class LikeComponent implements OnInit {
  @Input() itemPost: any;
  private id?: string;
  private userLike: string[] = [];
  constructor(
    private likeService: LikeService,
    private userService: UserService
  ) {}
  public activeLike?: boolean;

  ngOnInit(): void {
    this.getID();
    this.checkActiveLike();
  }

  private getID(): void {
    this.id = this.userService.getID();
  }
  public hearted(): void {
    this.activeLike = !this.activeLike;
    this.likeService
      .findLike(this.itemPost._id)
      .subscribe((likes: LikeModel[]) => {
        const { like }: any = likes;
        this.countHearted(like);
      });
  }

  private countHearted(like: any): void {
    if (like.user.length === 0) {
      const data: any = [{ user: [this.id], amount: like.amount + 1 }];
      this.likeService.updateLike(like._id, data).subscribe();
    } else {
      let sum = 0;
      this.userLike = [];
      like.user.forEach((element: any) => {
        this.userLike.push(element);
      });
      this.userLike.forEach((love: any) => {
        if (love == this.id) {
          // unlike
          sum = 1;
          let data: any = this.resetUpdateUserLike(love);
          data = [{ user: data, amount: like.amount - 1 }];
          // reset array user = [], amount = 0
          this.likeService.updateUserLike(like._id, data).subscribe(() => {
            return;
          });
        }
      });
      if (sum !== 1) {
        // create new like to post
        for (let love of this.userLike) {
          if (love !== this.id) {
            let data: any = [
              { user: [...this.userLike, this.id], amount: like.amount + 1 },
            ];
            this.likeService.updateLike(like._id, data).subscribe();
            break;
          }
        }
      }
    }
  }

  private resetUpdateUserLike(id: string): String[] {
    return (this.userLike = this.userLike.filter((item) => item != id));
  }

  private checkActiveLike(): void {
    this.likeService.findLike(this.itemPost._id).subscribe((data) => {
      let { like }: any = data;
      like.user.forEach((user: any) => {
        if (user == this.id) {
          this.activeLike = true;
        }
      });
    });
  }
}
