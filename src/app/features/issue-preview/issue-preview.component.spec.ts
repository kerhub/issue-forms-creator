import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePreviewComponent, IssuePreviewModule } from './issue-preview.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

describe('IssuePreviewComponent', () => {
  let component: IssuePreviewComponent;
  let fixture: ComponentFixture<IssuePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuePreviewModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      body: new FormArray([]),
    });
    expect(component).toBeTruthy();
  });
});
