import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Meta } from '@storybook/angular/types-6-0';
import { IssuePreviewComponent, IssuePreviewModule } from './issue-preview.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export default {
  title: 'Components/Issue Preview/Container',
  component: IssuePreviewComponent,
  decorators: [
    moduleMetadata({
      imports: [IssuePreviewModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null, Validators.required),
      body: new FormArray([]),
    }),
  },
});

export const filled = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl('Bug report', Validators.required),
      description: new FormControl('template for bug report', Validators.required),
      title: new FormControl('[Bug]: ', Validators.required),
      body: new FormArray([]),
    }),
  },
});

export const labels = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl('Bug report', Validators.required),
      description: new FormControl('template for bug report', Validators.required),
      title: new FormControl('[Bug]: ', Validators.required),
      labels: new FormControl(['bug', 'triage']),
      body: new FormArray([]),
    }),
  },
});

export const assignees = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl('Bug report', Validators.required),
      description: new FormControl('template for bug report', Validators.required),
      title: new FormControl('[Bug]: ', Validators.required),
      assignees: new FormControl(['geromegrignon']),
      body: new FormArray([]),
    }),
  },
});
