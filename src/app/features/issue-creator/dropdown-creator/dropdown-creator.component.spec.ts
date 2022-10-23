import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCreatorComponent, DropdownCreatorModule } from './dropdown-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('DropdownCreatorComponent', () => {
  let component: DropdownCreatorComponent;
  let fixture: ComponentFixture<DropdownCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DropdownCreatorModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownCreatorComponent);
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
