import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { DropdownPreviewComponent, DropdownPreviewModule } from './dropdown-preview.component';

export default {
  title: 'Components/Issue Preview/Dropdown',
  component: DropdownPreviewComponent,
  decorators: [
    moduleMetadata({
      imports: [DropdownPreviewModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    formGroup: new FormGroup({
      type: new FormControl('dropdown'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(''),
        multiple: new FormControl(false),
        options: new FormControl(null, Validators.required),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    }),
  },
});

const filledForm: FormGroup = new FormGroup({
  type: new FormControl('dropdown'),
  id: new FormControl('browser'),
  attributes: new FormGroup({
    label: new FormControl('Your browser', Validators.required),
    description: new FormControl('We need to know which browser was used to reproduce the bug'),
    multiple: new FormControl(false),
    options: new FormControl(['Chrome', 'Edge'], Validators.required),
  }),
  validations: new FormGroup({
    required: new FormControl(true),
  }),
});

export const filled = () => ({
  props: {
    formGroup: filledForm,
    optionsControl: new FormControl('Chrome'),
  },
});
