import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxOptionComponent, CheckboxOptionModule } from './checkbox-option.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('CheckboxOptionComponent', () => {
  let component: CheckboxOptionComponent;
  let fixture: ComponentFixture<CheckboxOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxOptionModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxOptionComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.form = new FormGroup({
      label: new FormControl(null, Validators.required),
      validations: new FormGroup({
        required: new FormControl(),
      }),
    });
    expect(component).toBeTruthy();
  });
});
