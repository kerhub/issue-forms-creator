import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaPreviewComponent, TextareaPreviewModule } from './textarea-preview.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('TextareaPreviewComponent', () => {
  let component: TextareaPreviewComponent;
  let fixture: ComponentFixture<TextareaPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaPreviewModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new UntypedFormGroup({
      type: new UntypedFormControl('textarea'),
      id: new UntypedFormControl(null),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(null, Validators.required),
        description: new UntypedFormControl(''),
        placeholder: new UntypedFormControl(''),
        value: new UntypedFormControl(null),
        render: new UntypedFormControl(null),
      }),
      validations: new UntypedFormGroup({
        required: new UntypedFormControl(false),
      }),
    });
    expect(component).toBeTruthy();
  });
});
