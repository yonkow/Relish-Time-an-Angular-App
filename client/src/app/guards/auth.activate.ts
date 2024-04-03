import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthActivate implements CanActivate {
  constructor(
    private userService: UserService,
    private router: Router,
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (!this.userService.isLogged) {
      alert(
        'You are not allowed to view this page. You are redirected to login Page'
      );
      this.cookieService.delete('auth-cookie');
      this.router.navigate(['auth/login'], {
        queryParams: { retUrl: route.url },
      });
      return false;
    }
    return true;
  }
}
