import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueFormComponent } from './issue-form.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { IssueFormModule } from './issue-form.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconModule } from '../../shared/icon.module';

describe('IssueFormComponent', () => {
  let component: IssueFormComponent;
  let fixture: ComponentFixture<IssueFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueFormModule, HttpClientTestingModule, BrowserAnimationsModule, IconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
