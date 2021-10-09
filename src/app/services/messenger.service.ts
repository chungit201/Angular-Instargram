import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { MessengerModel } from '../model/messenger-model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class MessengerService {
  constructor(private http: HttpClient) {}
}
