import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  hasUser: boolean = false;
  isAdmin: boolean = false;
  isApplicant: boolean = false;

  destroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.setHasUser();
    this.setIsAdmin();
    this.setIsApplicant();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['/auth', 'login']);
  }

  setHasUser(): void {
    this.authService.getHasUser$().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (hasUser) => {
        this.hasUser = hasUser;
      }
    });
  }

  setIsAdmin(): void {
    this.authService.getIsAdmin$().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (isAdmin) => {
        this.isAdmin = isAdmin;
      }
    });
  }

  setIsApplicant(): void {
    this.authService.getIsApplicant$().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (isApplicant) => {
        this.isApplicant = isApplicant;
      }
    });
  }
 }
