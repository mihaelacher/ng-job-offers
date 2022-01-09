import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { JobOfferI } from '../../models/job-offer.model';
import { JobOffersService } from '../../services/job-offers.service';

@Component({
  selector: 'app-job-offers-item',
  templateUrl: './job-offers-item.component.html',
  styleUrls: ['./job-offers-item.component.css']
})
export class JobOffersItemComponent implements OnInit {

  currentUser: User | null;

  @Input() jobOffer: JobOfferI | undefined;
  @Input() appliedJobOffersIds: Array<number> | undefined;
  @Input() likedJobOfferIds: Array<number> | undefined;
  @Input() hasPermissions: boolean = false;

  canApply: boolean = false;
  canLike: boolean = false;

  @Output() deleteClicked = new EventEmitter<number>();

  constructor(
    private joboffersService: JobOffersService,
    private authService: AuthService
  ) {
    this.currentUser = authService.getLoggedUserFromLocalStorage();
  }

  ngOnInit(): void {
    let isApplicant = this.authService.hasPermissions('user');
    
    if (isApplicant) {
      this.setApplicantProperties();
    } 
  }

  onApply(jobofferId: number | undefined, $event: any): void {
    let userAppliance;

    if (this.currentUser && jobofferId) {
      userAppliance = {
        usersId: this.currentUser.id,
        joboffersId: jobofferId
      }
    }

    if (userAppliance) {
      let request$ = this.joboffersService.postUserAppliance$(userAppliance);

      request$.subscribe({
        next: () => {
          ($event.target as HTMLButtonElement).hidden = true;
        }
      });
    }
  }

  onLike(jobofferId: number | undefined, $event: any): void {
    let userLike;

    if (this.currentUser && jobofferId) {
      userLike = {
        usersId: this.currentUser.id,
        joboffersId: jobofferId
      }
    }

    if (userLike) {
      let request$ = this.joboffersService.postJobOfferUserLike$(userLike);

      request$.subscribe({
        next: () => {
          ($event.target as HTMLButtonElement).hidden = true;
        }
      });
    }
  }

  onDelete(): void {
    this.deleteClicked.emit(this.jobOffer?.id);
  }

  /////////////////////////////////////// UTILITY FUNCTIONS //////////////////////////////////////////////

  setApplicantProperties(): void {
    if (this.jobOffer) {
      if (this.appliedJobOffersIds) {
        this.canApply = this.appliedJobOffersIds.indexOf(this.jobOffer.id) === -1;
      }

      if (this.likedJobOfferIds) {
        this.canLike = this.likedJobOfferIds.indexOf(this.jobOffer.id) === -1;
      }
    }
  }
}
