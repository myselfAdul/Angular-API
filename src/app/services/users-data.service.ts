import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersDataService {
  private apiUrl = 'https://dummyapi.online/api/users'; // Your API endpoint

  constructor(private http: HttpClient) {}

  users(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl); // Directly return the array of users
  }
}



