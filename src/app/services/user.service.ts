import {firstValueFrom} from 'rxjs';

import {API} from '../models/api';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private router: Router, private httpClient: HttpClient) {
  }

  async isUserAuthenticated(): Promise<boolean> {
    try {
      return !!localStorage.getItem('token');
    } catch (error) {
      console.error('An error occurred while fetching user is authenticated:', error);
      throw error;
    }
  }

  async login(username: string, password: string): Promise<User> {
    try {
      const observable = this.httpClient.post<User>(API.user.login, {username: username, password: password});
      return await firstValueFrom(observable);
    } catch (error) {
      console.error('An error occurred while login the user:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      localStorage.clear()
      await this.router.navigate(['/login']);
    } catch (error) {
      console.error('An error occurred while logout the user:', error);
      throw error;
    }
  }

  getLoggedUser() {
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    }
    return null;
  }
}
