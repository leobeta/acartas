import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";

import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../services/user.service";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getLoggedUser() ? this.userService.getLoggedUser() : null;
    if (token) {
      const header = `Bearer ${token}`
      req = req.clone({
        setHeaders: {
          Authorization: header
        }
      });
    }
    return next.handle(req);
  }
}
