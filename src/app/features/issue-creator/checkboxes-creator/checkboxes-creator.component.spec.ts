import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  CheckboxesCreatorComponent,
  CheckboxesCreatorModule,
} from './checkboxes-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

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
