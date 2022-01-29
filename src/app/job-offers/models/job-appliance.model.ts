import { JobApplicantI } from "./job-applicant.model";

export interface JobOfferAplianceI {
    id: number,
    status: string,
    user: JobApplicantI,
    jobofferId: number
}