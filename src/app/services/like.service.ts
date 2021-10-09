import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { LikeModel } from '../model/like-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LikeService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public createLike(data: LikeModel[]): Observable<LikeModel[]> {
    const url = `${environment.api}/like/create`;
    return this.http.post<LikeModel[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }

  public detailLike(id: string): Observable<LikeModel[]> {
    const url = `${environment.api}/like/${id}`;
    return this.http.get<LikeModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }

  public updateLike(id: String, data: LikeModel[]): Observable<LikeModel[]> {
    const url = `${environment.api}/like/update/${id}`;
    return this.http.put<LikeModel[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }

  public findLike(id: string): Observable<LikeModel[]> {
    const url = `${environment.api}/like/find?like=${id}`;
    return this.http.get<LikeModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }

  public updateUserLike(
    id: string,
    data: LikeModel[]
  ): Observable<LikeModel[]> {
    const url = `${environment.api}/like/update-like-user/${id}`;
    return this.http.put<LikeModel[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }
}
