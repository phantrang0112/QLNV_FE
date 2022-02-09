import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate{
  constructor(private router: Router) { }

  canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if (localStorage.getItem('username')) {
          // logged in so return true
          console.log(localStorage.getItem('username'));
          return true;
      }

      // not logged in so redirect to login page with the return url
      this.router.navigate(['formLogin'], { queryParams: { returnUrl: state.url }});
      return false;
  }
}
