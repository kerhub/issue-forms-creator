import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreatorComponent, InputCreatorModule } from './input-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('InputCreatorComponent', () => {
  let component: InputCreatorComponent;
  let fixture: ComponentFixture<InputCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCreatorModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new UntypedFormGroup({
      type: new UntypedFormControl('input'),
      id: new UntypedFormControl(null),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(null, Validators.required),
        description: new UntypedFormControl(null),
        placeholder: new UntypedFormControl(null),
        value: new UntypedFormControl(null),
      }),
      validations: new UntypedFormGroup({
        required: new UntypedFormControl(false),
      }),
    });

    expect(component).toBeTruthy();
  });
});
