import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TopLevelCreatorComponent, TopLevelCreatorModule } from './top-level-creator.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
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
    component.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      body: new FormArray([]),
    });
    expect(component).toBeTruthy();
  });
});
