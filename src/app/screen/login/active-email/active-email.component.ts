import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-active-email',
  templateUrl: './active-email.component.html',
  styleUrls: ['./active-email.component.css'],
})
export class ActiveEmailComponent implements OnInit {
  public verify: boolean = false;
  public message?: string;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    const token = localStorage.getItem('emailToken')!;
    this.userService.verifyEmail(token).subscribe((data: any) => {
      this.verify = true;
      localStorage.removeItem('emailToken');
    });
  }
}
