import { Component, OnInit } from '@angular/core';
import { FriendModel } from 'src/app/model/friend-model';
import { FriendService } from 'src/app/services/friend.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  private id!: string;
  public roomId:any;
  public messageText :any
  public messageArray: {user:string,message:string}[] = [];
  public currentUser :any;
  public dataUser?: any;
  public dataFriend :any[] = [];
  constructor(
    private userService: UserService,
    private friendService: FriendService
    ) {

  }
  

  ngOnInit(): void {
    this.getDataUser();
    this.getID()
    this.getFriendUser()
  }
  
  public getDataUser(): void {
    this.userService.profileDetail(this.userService.getID())
      .subscribe((data) => {
        this.dataUser = data
        console.log(this.dataUser);
        
      });
  }
  private getFriendUser(): void {
    this.friendService.findUser(this.id).subscribe((data: FriendModel[]) => {
      let { friend }: any = data;
      console.log(friend);
        friend.friends.forEach((element: string) => {
        this.userService.profileDetail(element).subscribe((data: any) => {
          this.dataFriend.push(data)  
          console.log(this.dataFriend);
        });
      });
    });
  }
  
  

  private getID(): void {
    this.id = this.userService.getID();
  }


}
