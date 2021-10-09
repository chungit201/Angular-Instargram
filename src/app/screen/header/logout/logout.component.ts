import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css'],
})
export class LogoutComponent implements OnInit {
  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  public logout(): void {
    const id = this.userService.getID();

    this.userService
      .updateProfile(id, [{ activeStatus: false }])
      .subscribe(() => {
        this.userService.signOut().subscribe(() => {
          this.router.navigate(['/login']);
        });
      });
  }
}
