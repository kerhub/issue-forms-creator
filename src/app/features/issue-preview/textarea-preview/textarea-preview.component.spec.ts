import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextareaPreviewComponent, TextareaPreviewModule } from './textarea-preview.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
