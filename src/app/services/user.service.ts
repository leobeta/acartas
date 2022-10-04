import { API } from './../models/api';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';
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
    const user = this.httpClient.post<User>(API.user.login, { username: username, password: password })
    .pipe(
      map(user => {
        localStorage.setItem('token', JSON.stringify(user))
          return user;
        }
      )
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  getLoggedUser() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }
}
