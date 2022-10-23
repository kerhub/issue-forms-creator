import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxesCreatorComponent } from './checkboxes-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { checkboxesForm } from '../../../test/test.util';

describe('CheckboxesCreatorComponent', () => {
  let component: CheckboxesCreatorComponent;
  let fixture: ComponentFixture<CheckboxesCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxesCreatorComponent, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxesCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = checkboxesForm();
    expect(component).toBeTruthy();
  });
});
