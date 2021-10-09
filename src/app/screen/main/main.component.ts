import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.setActive(this.userService.getID());
  }

  private setActive(id: string): void {
    if (!localStorage.getItem('token')) return;
    this.userService
      .updateProfile(id, [{ activeStatus: true }])
      .subscribe((data: any) => {
        this.userService.setActive(data.activeStatus);
      });
  }
}
