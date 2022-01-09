import { Component, Input, OnInit } from '@angular/core';
import { JobOfferAplianceI } from '../../models/job-appliance.model';
import { JobOffersService } from '../../services/job-offers.service';

@Component({
  selector: 'app-job-applicants-item',
  templateUrl: './job-applicants-item.component.html',
  styleUrls: ['./job-applicants-item.component.css']
})
export class JobApplicantsItemComponent implements OnInit {
  @Input() jobApplicant: JobOfferAplianceI | undefined;
  isStatusNew: boolean = false;

  constructor(private jobOffersService: JobOffersService) {
  }

  ngOnInit(): void {
    if (this.jobApplicant?.status === 'new') {
      this.isStatusNew = true;
    }
  }

  handleStatusChange(status: string): void {
    if (this.jobApplicant) {
      let applianceStatus = {
        id: this.jobApplicant?.id,
        status: status
      }

      this.jobOffersService.patchJobApplianceStatus$(applianceStatus).subscribe({
          next: () => {
            this.isStatusNew = false;
          }
      })
    }
  }
}
