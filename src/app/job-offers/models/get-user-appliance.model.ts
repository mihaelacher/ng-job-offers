import { JobOfferI } from "./job-offer.model";

export interface GetUserApplianceI {
    userId: number,
    jobofferId: number,
    joboffer: JobOfferI
  }
  