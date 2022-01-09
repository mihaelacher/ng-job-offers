import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { GetUserApplianceI } from '../../models/get-user-appliance.model';
import { JobOfferI } from '../../models/job-offer.model';
import { JobOffersService } from '../../services/job-offers.service';

@Component({
  selector: 'app-myappliances',
  templateUrl: './myappliances.component.html'
})
export class MyAppliancesComponent implements OnInit {

  jobOffers: JobOfferI[] = [];

  constructor(
    private jobOffersService: JobOffersService,
    private authService: AuthService
    ) {
  }

  ngOnInit(): void {
    let currentUser = this.authService.getLoggedUserFromLocalStorage();
    
    if (currentUser) {
      this.jobOffersService.getUserAppliances$(currentUser.id).subscribe({
        next: (response: GetUserApplianceI[]) => {
          this.jobOffers = response.map(a => a.joboffer);
        }
      });
    }
  }
}
