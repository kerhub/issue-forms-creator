import { InputCreatorComponent, InputCreatorModule } from './input-creator.component';
import { Meta } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';

export default {
  title: 'Components/Issue Creator/Input',
  component: InputCreatorComponent,
  decorators: [
    moduleMetadata({
      imports: [InputCreatorModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    formGroup: new FormGroup({
      type: new FormControl('input'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(null),
        placeholder: new FormControl(null),
        value: new FormControl(null),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    }),
  },
});

const touchedForm: FormGroup = new FormGroup({
  type: new FormControl('input'),
  id: new FormControl(null),
  attributes: new FormGroup({
    label: new FormControl(null, Validators.required),
    description: new FormControl(null),
    placeholder: new FormControl(null),
    value: new FormControl(null),
  }),
  validations: new FormGroup({
    required: new FormControl(false),
  }),
});
touchedForm.markAllAsTouched();

export const touched = () => ({
  props: {
    formGroup: touchedForm,
  },
});

const filledForm: FormGroup = new FormGroup({
  type: new FormControl('input'),
  id: new FormControl('foo'),
  attributes: new FormGroup({
    label: new FormControl('Version number', Validators.required),
    description: new FormControl('indicates the version of the project'),
    placeholder: new FormControl('eg v01.2.3'),
    value: new FormControl('here is a default value'),
  }),
  validations: new FormGroup({
    required: new FormControl(true),
  }),
});

export const filled = () => ({
  props: {
    formGroup: filledForm,
  },
});
