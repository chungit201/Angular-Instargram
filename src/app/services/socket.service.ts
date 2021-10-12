import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { SocketIo } from '../model/socket-model';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  constructor(private socket: Socket) {}
  public senMessage(message: string) {
    this.socket.emit('new message', message);
  }

  public getMessage() {
    return Observable.create((observer: any) => {
      this.socket.on('new message', (message: string) => {
        observer.next(message);
      });
    });
  }
}
