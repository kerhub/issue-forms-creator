import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  CheckboxesCreatorComponent,
  CheckboxesCreatorModule,
} from './checkboxes-creator.component';

export default {
  title: 'Components/Issue Creator/Checkboxes',
  component: CheckboxesCreatorComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxesCreatorModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    formGroup: new FormGroup({
      type: new FormControl('checkboxes'),
      id: new FormControl(),
      attributes: new FormGroup({
        label: new FormControl(null),
        description: new FormControl(),
        options: new FormArray([], Validators.required),
      }),
    }),
  },
});

const touchedForm: FormGroup = new FormGroup({
  type: new FormControl('checkboxes'),
  id: new FormControl(),
  attributes: new FormGroup({
    label: new FormControl(null),
    description: new FormControl(),
    options: new FormArray([], Validators.required),
  }),
});
touchedForm.markAllAsTouched();

export const touched = () => ({
  props: {
    formGroup: touchedForm,
  },
});

const filledForm: FormGroup = new FormGroup({
  type: new FormControl('checkboxes'),
  id: new FormControl('checklist'),
  attributes: new FormGroup({
    label: new FormControl('checklist'),
    description: new FormControl('tasks to complete'),
    options: new FormArray([], Validators.required),
  }),
});

export const filled = () => ({
  props: {
    formGroup: filledForm,
  },
});
