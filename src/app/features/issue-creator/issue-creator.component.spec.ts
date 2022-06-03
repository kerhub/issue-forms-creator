import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IssueCreatorComponent, IssueCreatorModule } from './issue-creator.component';
import { IssueForm } from '../../forms/issue.form';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('IssueCreatorComponent', () => {
  let component: IssueCreatorComponent;
  let fixture: ComponentFixture<IssueCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCreatorModule, HttpClientTestingModule, BrowserAnimationsModule],
      teardown: { destroyAfterEach: false },
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.form = new IssueForm();
    expect(component).toBeTruthy();
  });
});
