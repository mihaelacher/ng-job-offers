import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GetJobOfferUserLikeI } from '../../models/get-joboffer-user-like.model';
import { GetUserApplianceI } from '../../models/get-user-appliance.model';
import { JobOfferI } from '../../models/job-offer.model';
import { JobOffersService } from '../../services/job-offers.service';

@Component({
  selector: 'app-job-offers-list',
  templateUrl: './job-offers-list.component.html'
})
export class JobOffersListComponent implements OnInit {

  jobOffers: JobOfferI[] = [];
  appliedJobOffersIds: Array<number> = [];
  likedJobOfferIds: Array<number> = [];

  constructor(
    private authService: AuthService,
    private jobOffersService: JobOffersService
  ) {
  }

  ngOnInit(): void {
    let currentUser = this.authService.getLoggedUserFromLocalStorage();
    let isApplicant = this.authService.getIsApplicant$();

    if (isApplicant && currentUser) {
      this.setApplicantProperties(currentUser.id);
    }

    this.jobOffersService.getJobOffers$().subscribe({
      next: (response: JobOfferI[]) => {
        this.jobOffers = response;
      }
    });
  }


  /////////////////////////////////////// UTILITY FUNCTIONS //////////////////////////////////////////////


  setApplicantProperties(userId: number): void {
    this.jobOffersService.getUserAppliances$(userId).subscribe({
      next: (response: GetUserApplianceI[]) => {
        this.appliedJobOffersIds = response.map(a => a.jobofferId);
      }
    });

    this.jobOffersService.getJobOfferUserLike$(userId).subscribe({
      next: (response: GetJobOfferUserLikeI[]) => {
        this.likedJobOfferIds = response.map(a => a.jobofferId);
      }
    });
  }
}
