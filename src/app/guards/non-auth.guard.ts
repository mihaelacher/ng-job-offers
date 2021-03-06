import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class NonAuthGuard implements CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    canLoad(route: Route): boolean {
        const loggedUser = this.authService.getLoggedUserFromLocalStorage();
    
        if (loggedUser) {
          this.router.navigate(['/main']);
    
          return false;
        }
    
        return true;
      }
}