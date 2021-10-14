import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { FriendModel } from '../model/friend-model';

@Injectable({
  providedIn: 'root',
})
export class FriendService {
  constructor(private http: HttpClient) {}

  public getFriend(): Observable<FriendModel[]> {
    const url = `${environment.api}/friend`;
    return this.http.get<FriendModel[]>(url);
  }
  public findUser(id: String): Observable<FriendModel[]> {
    const url = `${environment.api}/friend/find-user?friend=${id}`;
    return this.http.get<FriendModel[]>(url);
  }
}
