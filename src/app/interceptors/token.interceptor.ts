import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  private token: string;
  constructor(private userService: UserService) {
    this.token = localStorage.getItem('token') || '';
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const user = this.userService.getLoggedUser();
    if (user) {
      const header = `Bearer ${this.token}`
      req = req.clone({
        setHeaders: {
          Authorization: header
        }
      });
    }
    return next.handle(req);
  }
}
