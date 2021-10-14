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

  public follow(data: FriendModel[]): Observable<FriendModel[]> {
    const url = `${environment.api}/add-friend`;
    return this.http.post<FriendModel[]>(url, data[0]);
  }

  public update(id: string, data: FriendModel[]): Observable<FriendModel[]> {
    const url = `${environment.api}//friend/update/${id}`;
    return this.http.put<FriendModel[]>(url, data[0]);
  }

  public updateClearFriend(
    id: string,
    data: FriendModel[]
  ): Observable<FriendModel[]> {
    const url = `${environment.api}/friend/clear/${id}`;
    return this.http.put<FriendModel[]>(url, data[0]);
  }
}
