import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CheckboxesCreatorComponent,
  CheckboxesCreatorModule,
} from './checkboxes-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('CheckboxesCreatorComponent', () => {
  let component: CheckboxesCreatorComponent;
  let fixture: ComponentFixture<CheckboxesCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesCreatorModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesCreatorComponent);
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
