import { IssueForm } from '../forms/issue.form';
import { CheckboxesSection } from '../models/checkboxes-section';
import { UntypedFormGroup } from '@angular/forms';

export const checkboxesForm = (data?: Partial<CheckboxesSection>): UntypedFormGroup => {
  const issueForm = new IssueForm();
  issueForm.addCheckboxes(data);
  return issueForm.bodyControl.controls[0] as UntypedFormGroup;
};
