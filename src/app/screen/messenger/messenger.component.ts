import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket.service';
@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.css'],
})
export class MessengerComponent implements OnInit {
  constructor(private socket: SocketService) {}

  ngOnInit(): void {}
}
