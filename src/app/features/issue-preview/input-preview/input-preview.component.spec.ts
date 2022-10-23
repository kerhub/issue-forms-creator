import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPreviewComponent, InputPreviewModule } from './input-preview.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('InputPreviewComponent', () => {
  let component: InputPreviewComponent;
  let fixture: ComponentFixture<InputPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputPreviewModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputPreviewComponent);
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
