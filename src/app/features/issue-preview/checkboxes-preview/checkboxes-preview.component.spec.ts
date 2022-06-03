import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CheckboxesPreviewComponent,
  CheckboxesPreviewModule,
} from './checkboxes-preview.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
    component.formGroup = new FormGroup({
      type: new FormControl('checkboxes'),
      id: new FormControl(),
      attributes: new FormGroup({
        label: new FormControl(null),
        description: new FormControl(),
        options: new FormArray([], Validators.required),
      }),
    });
    expect(component).toBeTruthy();
  });
});
