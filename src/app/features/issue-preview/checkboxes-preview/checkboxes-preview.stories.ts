import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import {
  CheckboxesPreviewComponent,
  CheckboxesPreviewModule,
} from './checkboxes-preview.component';

export default {
  title: 'Components/Issue Preview/Checkboxes',
  component: CheckboxesPreviewComponent,
  decorators: [
    moduleMetadata({
      imports: [CheckboxesPreviewModule, BrowserAnimationsModule],
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

const filledForm: FormGroup = new FormGroup({
  type: new FormControl('checkboxes'),
  id: new FormControl('checklist'),
  attributes: new FormGroup({
    label: new FormControl('checklist'),
    description: new FormControl('tasks to complete'),
    options: new FormArray(
      [
        new FormGroup({
          label: new FormControl('launch tests', Validators.required),
          validations: new FormGroup({
            required: new FormControl(true),
          }),
        }),
        new FormGroup({
          label: new FormControl('read the code of conduct', Validators.required),
          validations: new FormGroup({
            required: new FormControl(true),
          }),
        }),
        new FormGroup({
          label: new FormControl('eat pizza', Validators.required),
          validations: new FormGroup({
            required: new FormControl(false),
          }),
        }),
      ],
      Validators.required,
    ),
  }),
});

export const filled = () => ({
  props: {
    formGroup: filledForm,
  },
});
