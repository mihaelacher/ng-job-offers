import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplianceStatusI } from "../models/appliance-status.model";
import { GetJobOfferUserLikeI } from "../models/get-joboffer-user-like.model";
import { GetUserApplianceI } from "../models/get-user-appliance.model";
import { JobOfferAplianceI } from "../models/job-appliance.model";
import { JobOfferI } from "../models/job-offer.model";
import { PostJobOfferUserLikeI } from "../models/post-joboffer-user-like.model";
import { PostUserApplianceI } from "../models/post-user-appliance.model";

@Injectable({
    providedIn: 'root'
})
export class JobOffersService {

    constructor(private http: HttpClient) {
    }
  
    getJobOffers$(): Observable<JobOfferI[]> {
      return this.http.get<JobOfferI[]>(`${environment.apiUrl}/joboffers?_embed=jobOfferUserLikes`);//.pipe(catchError(err) => this.handleError(err));
    }

    getJobOffersByUser$(userId: number): Observable<JobOfferI[]> {
      return this.http.get<JobOfferI[]>(`${environment.apiUrl}/joboffers?usersId=${userId}`);//.pipe(catchError(err) => this.handleError(err));
    }
  
    getJobOffer$(id: number): Observable<JobOfferI> {
      return this.http.get<JobOfferI>(`${environment.apiUrl}/joboffers/${id}`);
    }
  
    postJobOffers$(jobOffer: JobOfferI): Observable<JobOfferI> {
      return this.http.post<JobOfferI>(`${environment.apiUrl}/joboffers`, jobOffer);
    }
  
    putJobOffers$(jobOffer: JobOfferI): Observable<JobOfferI> {
      return this.http.put<JobOfferI>(`${environment.apiUrl}/joboffers/${jobOffer.id}`, jobOffer);
    }
  
    deleteJobOffers$(id: number): Observable<void> {
      return this.http.delete<void>(`${environment.apiUrl}/joboffers/${id}`);
    }

    getUserAppliances$(userId: number): Observable<GetUserApplianceI[]> {
      return this.http.get<GetUserApplianceI[]>(`${environment.apiUrl}/userAppliances?userId=${userId}&_expand=joboffer`);
    }

    postUserAppliance$(userAppliance: PostUserApplianceI): Observable<PostUserApplianceI> {
      return this.http.post<PostUserApplianceI>(`${environment.apiUrl}/userAppliances`, userAppliance);
    }

    getJobOfferUserLike$(userId: number): Observable<GetJobOfferUserLikeI[]> {
      return this.http.get<GetJobOfferUserLikeI[]>(`${environment.apiUrl}/jobOfferUserLikes?userId=${userId}&_expand=joboffer`);
    }

    postJobOfferUserLike$(jobofferUserLike: PostJobOfferUserLikeI): Observable<PostUserApplianceI> {
      return this.http.post<PostJobOfferUserLikeI>(`${environment.apiUrl}/jobOfferUserLikes`, jobofferUserLike);
    }

    getJobApplicantsForJobOffer$(jobOfferId: number): Observable<JobOfferAplianceI[]> {
      return this.http.get<JobOfferAplianceI[]>(`${environment.apiUrl}/userAppliances?jobofferId=${jobOfferId}&_expand=user`);
  }

  patchJobApplianceStatus$(appliance: ApplianceStatusI): Observable<ApplianceStatusI> {
      return this.http.patch<ApplianceStatusI>(`${environment.apiUrl}/userAppliances/${appliance.id}`, appliance);
  }
}