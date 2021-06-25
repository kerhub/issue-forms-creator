import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Meta } from '@storybook/angular/types-6-0';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarkdownCreatorComponent, MarkdownCreatorModule } from './markdown-creator.component';

export default {
  title: 'Components/Issue Creator/Markdown',
  component: MarkdownCreatorComponent,
  decorators: [
    moduleMetadata({
      imports: [MarkdownCreatorModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    formGroup: new FormGroup({
      type: new FormControl('markdown'),
      attributes: new FormGroup({
        value: new FormControl(null, Validators.required),
      }),
    }),
  },
});

const touchedForm: FormGroup = new FormGroup({
  type: new FormControl('markdown'),
  attributes: new FormGroup({
    value: new FormControl(null, Validators.required),
  }),
});
touchedForm.markAllAsTouched();

export const touched = () => ({
  props: {
    formGroup: touchedForm,
  },
});

const filledForm: FormGroup = new FormGroup({
  type: new FormControl('markdown'),
  attributes: new FormGroup({
    value: new FormControl('## Motivation', Validators.required),
  }),
});

export const filled = () => ({
  props: {
    formGroup: filledForm,
  },
});
