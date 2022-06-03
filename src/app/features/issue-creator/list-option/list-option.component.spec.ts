import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOptionComponent, ListOptionModule } from './list-option.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('ListOptionComponent', () => {
  let component: ListOptionComponent;
  let fixture: ComponentFixture<ListOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListOptionModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOptionComponent);
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
