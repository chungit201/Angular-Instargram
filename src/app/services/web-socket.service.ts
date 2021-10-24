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
   listen(eventName:string){
     return new  Observable((subscriber)=>{
       this.socket.on(eventName,(data)=>{
          subscriber.next(data);
       })
     })
   }
   emit(eventName:string,data:any){
     this.socket.emit(eventName,data);
   }
}
