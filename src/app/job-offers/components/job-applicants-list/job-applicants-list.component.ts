import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Subject, switchMap, takeUntil } from 'rxjs';
import { JobOfferAplianceI } from '../../models/job-appliance.model';
import { JobOffersService } from '../../services/job-offers.service';

@Component({
  selector: 'app-job-applicants-list',
  templateUrl: './job-applicants-list.component.html'
})
export class JobApplicantsListComponent implements OnInit, OnDestroy {

  jobApplicants: JobOfferAplianceI[]|undefined = [];
  destroy$ = new Subject<boolean>();

  constructor(
    private jobOffersService: JobOffersService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap((params) => {
        const id = params['id'];

        if (id) {
          return this.jobOffersService.getJobApplicantsForJobOffer$(id)
        }

        return of(undefined);
      }),
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        this.jobApplicants = response;
        console.log(this.jobApplicants);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
