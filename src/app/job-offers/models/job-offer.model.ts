import { GetJobOfferUserLikeI } from "./get-joboffer-user-like.model";

export interface JobOfferI {
    id: number;
    title: string;
    description: string;
    usersId: number;
    type: string;
    category: string;
    jobOfferUserLikes: GetJobOfferUserLikeI[]|undefined
  }
  