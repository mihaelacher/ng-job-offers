import { NgModule } from "@angular/core";
import { Route, RouterModule } from "@angular/router";
import { AclGuard } from "../guards/acl.guard";
import { ApplicantGuard } from "../guards/applicant.guard";
import { MyAppliancesComponent } from "./components/favorites/myappliances.component";
import { JobApplicantsListComponent } from "./components/job-applicants-list/job-applicants-list.component";
import { JobOffersFormComponent } from "./components/job-offers-form/job-offers-form.component";
import { JobOffersListComponent } from "./components/job-offers-list/job-offers-list.component";
import { JobOffersComponent } from "./components/job-offers/job-offers.component";
import { MyJobOffersComponent } from "./components/my-job-offers/my-job-offers.component";

const routes: Route[] = [
    {
      path: '',
      component: JobOffersComponent,
      children: [
        {
          path: 'joboffers',
          component: JobOffersListComponent
        },
        {
          path: 'myappliances',
          component: MyAppliancesComponent,
          canActivate: [ApplicantGuard]
        },
        {
          path: 'myjoboffers',
          component: MyJobOffersComponent,
          canActivate: [AclGuard]
        },
        {
          path: 'joboffers/edit',
          component: JobOffersFormComponent,
          canActivate: [AclGuard]
        },
        {
          path: 'joboffers/edit/:id',
          component: JobOffersFormComponent,
          canActivate: [AclGuard]
        },
        {
          path: 'jobapplicants/:id',
          component: JobApplicantsListComponent,
          canActivate: [AclGuard]
        },
        {
          path: '',
          pathMatch: 'full',
          redirectTo: 'joboffers'
        }
      ]
    }
  ];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
      ],
      exports: [
        RouterModule
      ]
})
export class JobOffersRoutingModule {

}