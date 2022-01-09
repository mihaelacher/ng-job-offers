import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { JobOfferI } from '../../models/job-offer.model';
import { JobOffersService } from '../../services/job-offers.service';

@Component({
  selector: 'app-job-offers-form',
  templateUrl: './job-offers-form.component.html',
  styleUrls: ['./job-offers-form.component.css']
})
export class JobOffersFormComponent implements OnInit,OnDestroy {

  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private jobOffersService: JobOffersService,
    private authService: AuthService
  ) {
    this.formGroup = this.buildForm();
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        const id = params['id'];

        if (id) {
          return this.jobOffersService.getJobOffer$(id);
        }

        return of(null);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response) {
          this.formGroup = this.buildForm(response);
        } 
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): Promise<boolean>|void {
    const jobOffer = this.formGroup.value as JobOfferI;
    const currentUser = this.authService.getLoggedUserFromLocalStorage();
    
    if (currentUser) {
      jobOffer.usersId = currentUser.id;
    } else {
      return this.router.navigate(['/auth', 'login']);
    }
   

    let request$;

    if (!jobOffer.id) {
      request$ = this.jobOffersService.postJobOffers$(jobOffer);
    } else {
      request$ = this.jobOffersService.putJobOffers$(jobOffer);
    }

    request$.subscribe({
      next: () => {
        this.router.navigate(['/main', 'joboffers']);
      }
    });
  }

  private buildForm(jobOffer?: JobOfferI): FormGroup {
    return this.fb.group({
      id: jobOffer?.id,
      title: [jobOffer?.title || '', [Validators.required]],
      description: [jobOffer?.description || ''],
      type: [jobOffer?.type || '', [Validators.required]],
      category: [jobOffer?.category || '', [Validators.required]]
    });
  }

}
