import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Meta } from '@storybook/angular/types-6-0';
import { TextareaCreatorComponent, TextareaCreatorModule } from './textarea-creator.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export default {
  title: 'Components/Issue Creator/Textarea',
  component: TextareaCreatorComponent,
  decorators: [
    moduleMetadata({
      imports: [TextareaCreatorModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    formGroup: new FormGroup({
      type: new FormControl('textarea'),
      id: new FormControl(null),
      attributes: new FormGroup({
        label: new FormControl(null, Validators.required),
        description: new FormControl(''),
        placeholder: new FormControl(''),
        value: new FormControl(null),
        render: new FormControl(null),
      }),
      validations: new FormGroup({
        required: new FormControl(false),
      }),
    }),
  },
});

const touchedForm: FormGroup = new FormGroup({
  type: new FormControl('textarea'),
  id: new FormControl(null),
  attributes: new FormGroup({
    label: new FormControl(null, Validators.required),
    description: new FormControl(''),
    placeholder: new FormControl(''),
    value: new FormControl(null),
    render: new FormControl(null),
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
  type: new FormControl('textarea'),
  id: new FormControl('motivation'),
  attributes: new FormGroup({
    label: new FormControl('Motivation', Validators.required),
    description: new FormControl('Explain the motivation of your feature request'),
    placeholder: new FormControl('Fill it'),
    value: new FormControl('default value'),
    render: new FormControl('AsciiDoc'),
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
