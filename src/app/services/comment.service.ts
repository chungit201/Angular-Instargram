import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../model/comment-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  public createComment(data: CommentModel[]): Observable<CommentModel[]> {
    const url = `${environment.api}/comment/create`;
    return this.http.post<CommentModel[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }

  public updateComment(
    id: String,
    data: CommentModel[]
  ): Observable<CommentModel[]> {
    const url = `${environment.api}/comment/update/${id}`;
    return this.http.put<CommentModel[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }

  public removeComment(id: string): Observable<CommentModel[]> {
    const url = `${environment.api}/comment/remove/${id}`;
    return this.http.delete<CommentModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }
}
