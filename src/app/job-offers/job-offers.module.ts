import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { JobOffersComponent } from "./components/job-offers/job-offers.component";
import { JobOffersRoutingModule } from "./job-offers-routing.module";
import { JobOffersItemComponent } from './components/job-offers-item/job-offers-item.component';
import { JobOffersListComponent } from './components/job-offers-list/job-offers-list.component';
import { JobOffersFormComponent } from './components/job-offers-form/job-offers-form.component';
import { MyJobOffersComponent } from './components/my-job-offers/my-job-offers.component';
import { MyAppliancesComponent } from './components/favorites/myappliances.component';
import { JobApplicantsListComponent } from './components/job-applicants-list/job-applicants-list.component';
import { JobApplicantsItemComponent } from './components/job-applicants-item/job-applicants-item.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        HttpClientModule,
        JobOffersRoutingModule
      ],
      declarations: [
          JobOffersListComponent,
          JobOffersItemComponent,
          JobOffersFormComponent,
          JobOffersComponent,
          MyJobOffersComponent,
          MyAppliancesComponent,
          JobApplicantsListComponent,
          JobApplicantsItemComponent
      ]
})
export class JobOffersModule {

}