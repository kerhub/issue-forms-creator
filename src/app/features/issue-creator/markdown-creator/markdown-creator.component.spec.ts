import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownCreatorComponent, MarkdownCreatorModule } from './markdown-creator.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('MarkdownCreatorComponent', () => {
  let component: MarkdownCreatorComponent;
  let fixture: ComponentFixture<MarkdownCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownCreatorModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new FormGroup({
      type: new FormControl('markdown'),
      attributes: new FormGroup({
        value: new FormControl(null, Validators.required),
      }),
    });
    expect(component).toBeTruthy();
  });
});
