import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('token')) {
          // logged in so return true
          console.log(localStorage.getItem('token'));
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['form-login'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
