import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { WebSocketService } from 'src/app/services/web-socket.service';

@Component({
  selector: 'app-form-chat',
  templateUrl: './form-chat.component.html',
  styleUrls: ['./form-chat.component.css']
})
export class FormChatComponent implements OnInit {
  public dataUser?: any;
  private id!: string;
  constructor(
    private webSocketService: WebSocketService,
    private userService: UserService,
    ) { }
  ngOnInit(): void {
    this.getDataUser();
    this.getID()
    this.getMessClient()
  }
  chatForm = new FormGroup({
    messages: new FormControl(''),
  })
  textMess: string = '';
  public getDataUser(): void {
    this.userService.profileDetail(this.userService.getID())
      .subscribe((data) => {
        this.dataUser = data
        console.log(this.dataUser);
      });
  }
  private getID(): void {
    this.id = this.userService.getID();
  }
  submitMess() {
    const sendMess = {
      user: this.dataUser.name,
      message: this.chatForm.value.messages
    }
    this.webSocketService.emit('client-chat', sendMess);
  };
  getMessClient(){
    const boxChat = document.querySelector('.chat-message') as HTMLElement;
    this.webSocketService.listen('serve-user-chat').subscribe((data: any) => {
      if(data.user==this.dataUser.name){
        const MyChat = `  <div class="flex items-end justify-end">
        <div
          class="
            flex flex-col
            space-y-2,
            float-right
            text-xs
            max-w-xs
            mx-2
            order-1
            items-end
          "
        >
          <div>
            <span
              class="
                px-4
                py-2
                rounded-lg
                inline-block
                bg-gray-200
                text-gray-600
              "
              >${data.message}</span
            >
          </div>
     
        </div>
        <img
          src="assets/default-user.png"
          alt="My profile"
          class="w-6 h-6 rounded-full order-2"
        />
      </div>`
        boxChat.innerHTML += MyChat
      }else{
        const messfriend = `  <div class="flex items-end">
        <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
          <div>
            <span
              class="px-4 py-2 rounded-lg inline-block rounded-bl-none border border-gray-300 text-gray-600">
                ${data.message}
                </span>
          </div>
        </div>
        <img src="https://picsum.photos/200" alt="My profile" class="w-6 h-6 rounded-full order-1">
      </div>`
      boxChat.innerHTML += messfriend
      }
    
    
    })
  }  
  
}
