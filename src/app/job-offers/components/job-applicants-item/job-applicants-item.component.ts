import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { JobOfferAplianceI } from '../../models/job-appliance.model';
import { JobApplicantService } from '../../services/job-applicant.service';

@Component({
  selector: 'app-job-applicants-item',
  templateUrl: './job-applicants-item.component.html',
  styleUrls: ['./job-applicants-item.component.css']
})
export class JobApplicantsItemComponent implements OnInit, OnDestroy {
  @Input() jobApplicant: JobOfferAplianceI | undefined;
  isStatusNew: boolean = false;
  isJobApplicantApproved: boolean = false;

  destroy$ = new Subject<boolean>();

  constructor(private jobApplicantService: JobApplicantService) {
  }

  ngOnInit(): void {
    if (this.jobApplicant?.status === 'new') {
      this.isStatusNew = true;
    }
    if (this.jobApplicant)
    this.jobApplicantService.setIsJobApplicantApproved(this.jobApplicant.jobofferId);

    this.jobApplicantService.getIsJobApplicantApproved$().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (isApproved) => {
        this.isJobApplicantApproved = isApproved;
      }
    });
  }

  handleStatusChange(status: string): void {
    if (this.jobApplicant) {
      let applianceStatus = {
        id: this.jobApplicant?.id,
        status: status
      }

      this.jobApplicantService.patchJobApplianceStatus$(applianceStatus).subscribe({
          next: () => {
            // TODO: somehow doesn't work properly, status text doesn't show dinamically, only after page reload
            // funny is that the same thing works well after like button click
            this.isStatusNew = false;
          }
      })

      this.jobApplicantService.setIsJobApplicantApproved(this.jobApplicant.jobofferId);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
}
