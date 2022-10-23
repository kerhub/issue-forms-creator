import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPreviewComponent, MarkdownPreviewModule } from './markdown-preview.component';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

describe('MarkdownPreviewComponent', () => {
  let component: MarkdownPreviewComponent;
  let fixture: ComponentFixture<MarkdownPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownPreviewModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPreviewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.formGroup = new UntypedFormGroup({
      type: new UntypedFormControl('markdown'),
      attributes: new UntypedFormGroup({
        value: new UntypedFormControl(null, Validators.required),
      }),
    });
    expect(component).toBeTruthy();
  });
});
