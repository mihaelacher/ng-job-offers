import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantsListComponent } from './job-applicants-list.component';

describe('JobApplicantsListComponent', () => {
  let component: JobApplicantsListComponent;
  let fixture: ComponentFixture<JobApplicantsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicantsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicantsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
