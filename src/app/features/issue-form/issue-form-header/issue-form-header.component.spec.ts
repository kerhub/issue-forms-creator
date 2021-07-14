import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueFormHeaderComponent, IssueFormHeaderModule } from './issue-form-header.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('IssueFormHeaderComponent', () => {
  let component: IssueFormHeaderComponent;
  let fixture: ComponentFixture<IssueFormHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueFormHeaderModule, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFormHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
