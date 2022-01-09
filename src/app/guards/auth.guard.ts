import { Injectable } from "@angular/core";
import { CanLoad, Route, Router, UrlSegment, UrlTree } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanLoad {
    constructor(
        private authSevice: AuthService,
        private router: Router 
        ) {

    }

    canLoad(route: Route, segments: UrlSegment[]): boolean {
        const loggedUser = this.authSevice.getLoggedUserFromLocalStorage();

        if (!loggedUser) {
            this.router.navigate(['/auth', 'login']);

            return false;
        }

        return true;
    }
}