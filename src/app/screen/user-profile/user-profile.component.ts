import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserModel } from 'src/app/model/user-model';
import { UserService } from 'src/app/services/user.service';
import { PostModel } from 'src/app/model/post-model';
import { PostService } from 'src/app/services/post.service';
import { FriendService } from 'src/app/services/friend.service';
import { FriendModel } from 'src/app/model/friend-model';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  private id?: string;
  public profile?: any;
  public posts?: any = [];
  public friends?: any = [];
  constructor(
    private router: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
    private friendService: FriendService
  ) {}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];
    this.getProfile();
    this.getPosts();
    this.getFollowers();
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
      this.friends = friend.friends;
    });
  }
}
