import { UserService } from 'src/app/services/user.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()

export class TokenInterceptor implements HttpInterceptor {
  constructor(private userService: UserService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const user = this.userService.getLoggedUser();
      if(user) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${req}`
          }
        });
      }
      return next.handle(req);
  }
}
