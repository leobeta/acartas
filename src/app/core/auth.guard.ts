import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  private userId = localStorage.getItem('userId') || '';
  constructor(private router: Router, private userService: UserService) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const currentUser = await this.userService.getLoggedUser();
    if (currentUser) {
      return true
    }
    await this.router.navigate(['/login']);
    return false;
  }

}
