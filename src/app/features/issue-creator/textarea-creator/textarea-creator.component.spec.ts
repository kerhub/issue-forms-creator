import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaCreatorComponent, TextareaCreatorModule } from './textarea-creator.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('TextareaCreatorComponent', () => {
  let component: TextareaCreatorComponent;
  let fixture: ComponentFixture<TextareaCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextareaCreatorModule, BrowserAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new FormGroup({
      type: new FormControl('textarea'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(''),
        placeholder: new FormControl(''),
        value: new FormControl(null),
        render: new FormControl(null),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    });
    expect(component).toBeTruthy();
  });
});
