import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryFinderComponent, RepositoryFinderModule } from './repository-finder.component';

describe('RepositoryFinderComponent', () => {
  let component: RepositoryFinderComponent;
  let fixture: ComponentFixture<RepositoryFinderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepositoryFinderModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryFinderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
