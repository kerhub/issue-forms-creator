import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CheckboxesPreviewComponent,
  CheckboxesPreviewModule,
} from './checkboxes-preview.component';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('CheckboxesPreviewComponent', () => {
  let component: CheckboxesPreviewComponent;
  let fixture: ComponentFixture<CheckboxesPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesPreviewModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new UntypedFormGroup({
      type: new UntypedFormControl('checkboxes'),
      id: new UntypedFormControl(),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(null),
        description: new UntypedFormControl(),
        options: new UntypedFormArray([], Validators.required),
      }),
    });
    expect(component).toBeTruthy();
  });
});
