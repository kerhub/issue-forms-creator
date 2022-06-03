import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownCreatorComponent, DropdownCreatorModule } from './dropdown-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    component.formGroup = new FormGroup({
      type: new FormControl('dropdown'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(''),
        multiple: new FormControl(false),
        options: new FormControl(null, Validators.required),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    });
    expect(component).toBeTruthy();
  });
});
