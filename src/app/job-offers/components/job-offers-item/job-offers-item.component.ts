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

  onApply(jobofferId: number | undefined): void {
    let userAppliance;

    if (this.currentUser && jobofferId) {
      userAppliance = {
        userId: this.currentUser.id,
        jobofferId: jobofferId,
        status: 'new'
      }
    }

    if (userAppliance) {
      let request$ = this.joboffersService.postUserAppliance$(userAppliance);

      request$.subscribe({
        next: () => {
          this.canApply = false;
        }
      });
    }
  }

  onLike(jobofferId: number | undefined): void {
    // on like update likes
    let userLike;

    if (this.currentUser && jobofferId) {
      userLike = {
        userId: this.currentUser.id,
        jobofferId: jobofferId
      }
    }

    if (userLike) {
      let request$ = this.joboffersService.postJobOfferUserLike$(userLike);

      request$.subscribe({
        next: () => {
          this.canLike = false;
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
