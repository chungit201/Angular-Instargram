import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  public check: boolean = true;
  constructor(private userService: UserService, private router: Router) {}
  ngOnInit(): void {
    this.autoLogin();
  }

  private autoLogin() {
    const jwtHelper = new JwtHelperService();
    const userData: string = this.userService.getToken();
    if (!userData) {
      this.userService.signOut();
      return;
    }
    if (jwtHelper.isTokenExpired(userData)) {
      this.userService.setToken(userData);
    }
  }
}
