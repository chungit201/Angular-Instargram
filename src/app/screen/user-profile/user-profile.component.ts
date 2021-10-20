import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/services/user.service';
import { PostModel } from 'src/app/model/post-model';
import { PostService } from 'src/app/services/post.service';
import { FriendService } from 'src/app/services/friend.service';
import { FriendModel } from 'src/app/model/friend-model';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit, OnChanges {
  private id?: string;
  public profile?: any;
  public posts?: any = [];
  public friends?: any = [];
  public checkUser?: boolean = false;
  private followData: any[] = [];
  public statusFollow: boolean = false;
  private dataFollow: any = [];
  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private friendService: FriendService,
    private routers: Router
  ) {
    routers.events
      .pipe(filter((event: any) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.id = event.url.split('/')[2];
        this.getProfile();
        this.getPosts();
        this.getFollowers();
        this.checkUserProfile();
        this.checkStatusFollow();
      });
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getProfile();
    this.getPosts();
    this.getFollowers();
    this.checkUserProfile();
    this.checkStatusFollow();
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  public unFollow(): void {
    const id = this.userService.getID();
    this.statusFollow = false;
    this.friendService.findUser(id).subscribe((data: any) => {
      const idF = data.friend._id;
      this.friendService.updateClearFriend(idF, []).subscribe((data) => {
        let dataFL = this.dataFollow.filter((item: any) => item != this.id);
        dataFL = [{ friend: [...dataFL] }];
        this.friendService.update(idF, dataFL).subscribe(
          (data) => {
            console.log(data);
          },
          (error) => {
            console.log(error);
          }
        );
      });
    });
  }

  private checkStatusFollow(): void {
    const id = this.userService.getID();
    if (id == this.id) return;
    this.friendService.findUser(id).subscribe((data) => {
      const { friend }: any = data;
      this.dataFollow = [];
      if (!friend || friend == null) return;
      if (!friend.friends) return;
      friend.friends.forEach((element: any) => {
        this.dataFollow.push(element);
        if (element == this.id) {
          this.statusFollow = true;
        }
      });
    });
  }

  public follow(): void {
    const id = this.userService.getID();
    this.friendService.findUser(id).subscribe((data: any) => {
      if (data.friend == null || data.friend.user != id) {
        this.followData = [
          {
            user: id,
            friends: [this.id],
            status: true,
          },
        ];
        this.friendService.follow(this.followData).subscribe(
          () => {
            this.statusFollow = true;
          },
          (error) => {
            console.log(false);
          }
        );
      } else {
        const id = data.friend._id;
        data = [{ friends: [this.id] }];

        this.friendService.update(id, data).subscribe((data) => {
          this.statusFollow = true;
        });
      }
    });
  }
  private checkUserProfile(): void {
    if (this.id == this.userService.getID()) {
      this.checkUser = true;
      return;
    }
  }

  private getProfile(): void {
    this.userService.profile(this.id!).subscribe((data: UserModel[]) => {
      this.profile = data;
    });
  }

  private getPosts(): void {
    this.postService.profilePosts(this.id!).subscribe((data: PostModel[]) => {
      const { posts }: any = data;
      this.posts.push(posts);
    });
  }

  private getFollowers(): void {
    this.friendService.findUser(this.id!).subscribe((data: FriendModel[]) => {
      const { friend }: any = data;
      if (friend != null && data) {
        this.friends = friend.friends;
      }
    });
  }
}
