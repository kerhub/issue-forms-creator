import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLevelPreviewComponent, TopLevelPreviewModule } from './top-level-preview.component';

describe('TopLevelPreviewComponent', () => {
  let component: TopLevelPreviewComponent;
  let fixture: ComponentFixture<TopLevelPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopLevelPreviewModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLevelPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
