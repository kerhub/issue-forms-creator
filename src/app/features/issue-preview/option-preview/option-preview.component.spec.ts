import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionPreviewComponent, OptionPreviewModule } from './option-preview.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('OptionPreviewComponent', () => {
  let component: OptionPreviewComponent;
  let fixture: ComponentFixture<OptionPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OptionPreviewModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
