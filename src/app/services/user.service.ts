import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string) {
    console.log("Username: ", username)
    return this.httpClient.post('http://localhost:3001/api/user/login', {username: username, password: password});
  }
}
