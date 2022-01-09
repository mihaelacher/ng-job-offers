import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { JobOfferI } from '../../models/job-offer.model';
import { JobOffersService } from '../../services/job-offers.service';

@Component({
  selector: 'app-my-job-offers',
  templateUrl: './my-job-offers.component.html',
  styleUrls: ['./my-job-offers.component.css']
})
export class MyJobOffersComponent {
  jobOffers: JobOfferI[] = [];

  constructor(
    private authService: AuthService,
    private jobOffersService: JobOffersService
  ) {
  }

  ngOnInit(): void {
    let currentUser = this.authService.getLoggedUserFromLocalStorage();
      if (currentUser) {
        this.jobOffersService.getJobOffersByUser$(currentUser.id).subscribe({
          next: (response: JobOfferI[]) => {
            this.jobOffers = response;
          }
        });
      }
  }

  onDelete(id: number): void {
    this.jobOffersService.deleteJobOffers$(id).subscribe({
      next: () => {
        this.jobOffers = this.jobOffers.filter(jobOffer => jobOffer.id !== id);
      }
    });
  }
}
