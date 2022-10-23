import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { CheckboxesCreatorComponent } from './checkboxes-creator.component';
import { checkboxesForm } from '../../../test/test.util';

export default {
  title: 'Components/Issue Creator/Checkboxes',
  component: CheckboxesCreatorComponent,
  decorators: [
    moduleMetadata({
      imports: [BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    formGroup: checkboxesForm(),
  },
});

const touchedForm = checkboxesForm();
touchedForm.markAllAsTouched();

export const touched = () => ({
  props: {
    formGroup: touchedForm,
  },
});

const filledForm = checkboxesForm({
  id: 'checklist',
  attributes: {
    label: 'checklist',
    description: 'tasks to complete',
    options: [],
  },
});

export const filled = () => ({
  props: {
    formGroup: filledForm,
  },
});
