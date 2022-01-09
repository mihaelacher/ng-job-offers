import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobApplicantsItemComponent } from './job-applicants-item.component';

describe('JobApplicantsItemComponent', () => {
  let component: JobApplicantsItemComponent;
  let fixture: ComponentFixture<JobApplicantsItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobApplicantsItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobApplicantsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
