import { Observable, map } from 'rxjs';

import { API } from './../models/api';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private httpClient: HttpClient) { }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  login(username: string, password: string): Observable<User> {
    return this.httpClient.post<User>(API.user.login, { username: username, password: password });
  }

  logout(): void {
    localStorage.clear()
    this.router.navigate(['/login']);
  }

  getLoggedUser() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
