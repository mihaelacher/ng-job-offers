import { JobOfferI } from "./job-offer.model";

export interface GetJobOfferUserLikeI {
    userId: number,
    jobofferId: number,
    joboffer: JobOfferI
  }
  