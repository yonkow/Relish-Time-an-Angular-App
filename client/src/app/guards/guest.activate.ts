import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { User } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class GuestActivate implements CanActivate {
  constructor(private userService: UserService, private router: Router, private http: HttpClient) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.userService.isLogged) {
      alert(
        'You are not allowed to view this page. You are redirected to home Page'
      );

      this.router.navigate([''], {
        queryParams: { retUrl: route.url },
      });
      return false;
    }
    return true;
  }
}
