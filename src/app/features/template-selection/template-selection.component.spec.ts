import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  TemplateSelectionComponent,
  TemplateSelectionModule,
} from './template-selection.component';

describe('TemplateSelectionComponent', () => {
  let component: TemplateSelectionComponent;
  let fixture: ComponentFixture<TemplateSelectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemplateSelectionModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TemplateSelectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
