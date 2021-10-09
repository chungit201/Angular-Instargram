import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class GuardService implements CanActivate {
  constructor(
    public auth: AuthService,
    public router: Router,
    private user: UserService
  ) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.user.signOut();
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
