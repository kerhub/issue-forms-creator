import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputPreviewComponent, InputPreviewModule } from './input-preview.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
