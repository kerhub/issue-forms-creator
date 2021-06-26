import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueCreatorComponent, IssueCreatorModule } from './issue-creator.component';
import { IssueFormGroup } from '../../forms/issue-form-group';

describe('IssueCreatorComponent', () => {
  let component: IssueCreatorComponent;
  let fixture: ComponentFixture<IssueCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IssueCreatorModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IssueCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    component.form = new IssueFormGroup();
    expect(component).toBeTruthy();
  });
});
