import { Injectable } from '@angular/core';
import { observable, Observable, Subscriber } from 'rxjs';
import { io,Socket } from 'socket.io-client';
@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: Socket;
  private url = 'ws://localhost:7777'
  constructor() {
    this.socket= io(this.url,{ transports: ['websocket', 'polling', 'flashsocket'] });
   }
  joinRoom(data:any):void{
    this.socket.emit('join',data);
  }

  sendMessage(data:any):void{
    this.socket.emit('message',data);
  };

  getMessage() : Observable <any> {
    return new Observable<{user:string,message: string}>(observable =>{
      this.socket.on('new message',(data)=>{
        observable.next(data)
      });
      return () =>{
        this.socket.disconnect();
      }
    })
  }
}
