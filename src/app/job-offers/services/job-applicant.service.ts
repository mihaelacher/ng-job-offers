import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ApplianceStatusI } from "../models/appliance-status.model";
import { JobOfferAplianceI } from "../models/job-appliance.model";

@Injectable({
    providedIn: 'root'
})
export class JobApplicantService {
    isJobApplicantApproved$ = new BehaviorSubject<boolean>(false);

    constructor(private http: HttpClient) {
    }

    getJobApplicantsForJobOffer$(jobOfferId: number): Observable<JobOfferAplianceI[]> {
        return this.http.get<JobOfferAplianceI[]>(`${environment.apiUrl}/userAppliances?jobofferId=${jobOfferId}&_expand=user`);
    }

    getApprovedJobApplicantsForJobOffer$(jobOfferId: number): Observable<JobOfferAplianceI[]> {
        return this.http.get<JobOfferAplianceI[]>(`${environment.apiUrl}/userAppliances?jobofferId=${jobOfferId}&status=approved`);
    }
  
    patchJobApplianceStatus$(appliance: ApplianceStatusI): Observable<ApplianceStatusI> {
        return this.http.patch<ApplianceStatusI>(`${environment.apiUrl}/userAppliances/${appliance.id}`, appliance);
    }

    getIsJobApplicantApproved$(): Observable<boolean> {
        return this.isJobApplicantApproved$.asObservable();
    }

    setIsJobApplicantApproved(jobId: number): void {
            this.getApprovedJobApplicantsForJobOffer$(jobId).subscribe({
              next: (response: JobOfferAplianceI[]) => {
                this.isJobApplicantApproved$.next(response.length > 0);
            }
        })
      }
}