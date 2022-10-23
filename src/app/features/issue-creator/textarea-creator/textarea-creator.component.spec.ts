import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaCreatorComponent, TextareaCreatorModule } from './textarea-creator.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TextareaCreatorComponent', () => {
  let component: TextareaCreatorComponent;
  let fixture: ComponentFixture<TextareaCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaCreatorModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaCreatorComponent);
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
