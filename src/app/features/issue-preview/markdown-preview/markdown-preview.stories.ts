import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Meta } from '@storybook/angular/types-6-0';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MarkdownPreviewComponent, MarkdownPreviewModule } from './markdown-preview.component';

export default {
  title: 'Components/Issue Preview/Markdown',
  component: MarkdownPreviewComponent,
  decorators: [
    moduleMetadata({
      imports: [MarkdownPreviewModule, BrowserAnimationsModule],
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

const filledForm: FormGroup = new FormGroup({
  type: new FormControl('markdown'),
  attributes: new FormGroup({
    value: new FormControl('## Motivation \n description', Validators.required),
  }),
});

export const filled = () => ({
  props: {
    formGroup: filledForm,
  },
});
