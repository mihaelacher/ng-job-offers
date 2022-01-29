import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../auth/services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class ApplicantGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router
    ) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (!this.authService.isApplicant$) {
          this.router.navigate(['/main']);
    
          return false;
        }
    
        return true;
      }
}