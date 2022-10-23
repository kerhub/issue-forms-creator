import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPreviewComponent, DropdownPreviewModule } from './dropdown-preview.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('DropdownPreviewComponent', () => {
  let component: DropdownPreviewComponent;
  let fixture: ComponentFixture<DropdownPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownPreviewModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new UntypedFormGroup({
      type: new UntypedFormControl('dropdown'),
      id: new UntypedFormControl(null),
      attributes: new UntypedFormGroup({
        label: new UntypedFormControl(null, Validators.required),
        description: new UntypedFormControl(''),
        multiple: new UntypedFormControl(false),
        options: new UntypedFormControl(null, Validators.required),
      }),
      validations: new UntypedFormGroup({
        required: new UntypedFormControl(false),
      }),
    });
    expect(component).toBeTruthy();
  });
});
