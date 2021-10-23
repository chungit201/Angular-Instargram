import { Component, OnInit } from '@angular/core';
import { WebSocketService } from 'src/app/services/web-socket.service';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  public roomId:any;
  public messageText :any
  public messageArray: {user:string,message:string}[] = [];
  public currentUser :any;
  public selectUser:any;
  public phone? :string  
  public userList = [
    {
      id:1,
      name:"Chung Vương",
      image:"https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/83726493_239031113767009_453941681994072064_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=bhl4xQgR0FQAX_y_m39&_nc_ht=scontent.fhan2-2.fna&oh=445193468f623b858fa0ee3907d999a3&oe=6196B745",
      phone:'0336972209',
      roomId:{
        1: 'room-1',
        3: 'room-4',
        4: 'room-5'
      }
    },

    {
      id:2,
      name:"Thế bảo",
      image:"https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/51989053_759905091063583_853331588497276928_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=ggotgQJn1S4AX_Faytv&_nc_ht=scontent.fhan2-2.fna&oh=74260905f1739cb9bcda97f03db9709d&oe=6197BE02",
      phone:'013234413131',
      roomId:{
        1: 'room-3',
        2: 'room-5',
        4: 'room-6'
      }
    },

    {
      id:3,
      name:"Thế Thành",
      image:"https://scontent.fhan2-2.fna.fbcdn.net/v/t1.6435-9/89824135_2576283672690959_4577529436307456000_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=P_cC0hmqA4cAX8XPNN1&tn=2ZvIYDlW195BIPj4&_nc_ht=scontent.fhan2-2.fna&oh=113e177ef2034849cf7a097f60e1d937&oe=61992F1F",
      phone:'0987766573',
      roomId:{
        1: 'room-2',
        2: 'room-4',
        3: 'room-6'
      }
    }

  ]
  constructor(private webSocketService: WebSocketService) {
    this.webSocketService.getMessage()
    .subscribe((data:{user:string,message: string})=> {
      this.messageArray.push(data)
    })
  }
  

  ngOnInit(): void {
    this.currentUser = this.userList[0]
 
  }
  selectUserHandler (phone:string):void{
    this.selectUser = this.userList.find(user =>user.phone ==phone);
    this.roomId = this.selectUser.roomId[this.selectUser.id];
    this.messageArray = [];
    this.join(this.currentUser.name, this.roomId);
  }
  join(username:string,roomId:string):void{
    this.webSocketService.joinRoom({user:username,roomId:roomId})
  }

  senMessage():void{
    this.webSocketService.sendMessage({
      data:this.currentUser.name,
      room: this.roomId,
      message:this.messageText
    });
    this.messageText = '';
  }
}
