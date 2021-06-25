import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreatorComponent, InputCreatorModule } from './input-creator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('InputCreatorComponent', () => {
  let component: InputCreatorComponent;
  let fixture: ComponentFixture<InputCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputCreatorModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new FormGroup({
      type: new FormControl('input'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(null),
        placeholder: new FormControl(null),
        value: new FormControl(null),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    });

    expect(component).toBeTruthy();
  });
});
