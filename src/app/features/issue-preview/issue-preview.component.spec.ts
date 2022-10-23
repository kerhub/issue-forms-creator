import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuePreviewComponent, IssuePreviewModule } from './issue-preview.component';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IssuePreviewComponent', () => {
  let component: IssuePreviewComponent;
  let fixture: ComponentFixture<IssuePreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssuePreviewModule, HttpClientTestingModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssuePreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null, Validators.required),
      title: new UntypedFormControl(null, Validators.required),
      body: new UntypedFormArray([]),
    });
    expect(component).toBeTruthy();
  });
});
