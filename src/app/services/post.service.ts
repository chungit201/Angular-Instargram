import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { PostModel } from '../model/post-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient, private authService: AuthService) {
    this.getPosts();
  }

  public getPosts(): Observable<PostModel[]> {
    const url = `${environment.api}/post`;
    return this.http.get<PostModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }

  public detailPost(id: string): Observable<PostModel[]> {
    const url = `${environment.api}/post/detail/${id}`;
    return this.http.get<PostModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }

  public createPost(data: PostModel[]): Observable<PostModel[]> {
    const url = `${environment.api}/post/create`;
    return this.http.post<PostModel[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }

  public updatePost(id: string, data: PostModel[]): Observable<PostModel[]> {
    const url = `${environment.api}/post/update/${id}`;
    return this.http.put<PostModel[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }

  public removePost(id: string): Observable<PostModel[]> {
    const url = `${environment.api}/post/remove/${id}`;
    return this.http.delete<PostModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }

  public profilePosts(id: string): Observable<PostModel[]> {
    const url = `${environment.api}/post/profile?post=${id}`;
    return this.http.get<PostModel[]>(url, {
      headers: this.authService.getHeader(),
    });
  }
}
