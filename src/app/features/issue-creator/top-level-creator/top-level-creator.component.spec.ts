import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopLevelCreatorComponent, TopLevelCreatorModule } from './top-level-creator.component';
import { UntypedFormArray, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TopLevelCreatorComponent', () => {
  let component: TopLevelCreatorComponent;
  let fixture: ComponentFixture<TopLevelCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLevelCreatorModule, HttpClientTestingModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLevelCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      description: new UntypedFormControl(null, Validators.required),
      title: new UntypedFormControl(null, Validators.required),
      body: new UntypedFormArray([]),
    });
    expect(component).toBeTruthy();
  });
});
