import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommentModel } from '../model/comment-model';
// import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  constructor(private http: HttpClient) {}

  public getComment(id: string): Observable<CommentModel[]> {
    const url = `${environment.api}/comment?post=${id}`;
    return this.http.get<CommentModel[]>(url);
  }

  public createComment(data: CommentModel[]): Observable<CommentModel[]> {
    const url = `${environment.api}/comment/create`;
    return this.http.post<CommentModel[]>(url, data[0]);
  }

  public updateComment(
    id: String,
    data: CommentModel[]
  ): Observable<CommentModel[]> {
    const url = `${environment.api}/comment/update/${id}`;
    return this.http.put<CommentModel[]>(url, data[0]);
  }

  public removeComment(id: string): Observable<CommentModel[]> {
    const url = `${environment.api}/comment/remove/${id}`;
    return this.http.delete<CommentModel[]>(url);
  }
}
