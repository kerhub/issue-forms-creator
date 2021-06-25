import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkdownPreviewComponent, MarkdownPreviewModule } from './markdown-preview.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

describe('MarkdownPreviewComponent', () => {
  let component: MarkdownPreviewComponent;
  let fixture: ComponentFixture<MarkdownPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MarkdownPreviewModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkdownPreviewComponent);
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
