import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownPreviewComponent, DropdownPreviewModule } from './dropdown-preview.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
