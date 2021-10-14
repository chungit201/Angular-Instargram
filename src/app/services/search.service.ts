import { Injectable } from '@angular/core';
import { UserModel } from '../model/user-model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  constructor(private http: HttpClient) {}

  public searchToName(search: string): Observable<UserModel[]> {
    const url = `${environment.api}/profile/search?search=${search}`;
    return this.http.get<UserModel[]>(url);
  }
}
