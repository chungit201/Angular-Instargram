import { Injectable } from '@angular/core';
import { UserModel } from '../model/user-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public searchToName(search: string): Observable<UserModel[]> {
    const url = `${environment.api}/profile/search?search=${search}`;
    return this.http.get<UserModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }
}
