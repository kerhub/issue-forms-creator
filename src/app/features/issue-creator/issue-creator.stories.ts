import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Meta } from '@storybook/angular/types-6-0';
import { IssueCreatorComponent, IssueCreatorModule } from './issue-creator.component';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

export default {
  title: 'Components/Issue Creator/Container',
  component: IssueCreatorComponent,
  decorators: [
    moduleMetadata({
      imports: [IssueCreatorModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null),
      body: new FormArray([]),
    }),
  },
});

export const input = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null),
      body: new FormArray([
        new FormGroup({
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
      ]),
    }),
  },
});

export const textarea = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null),
      body: new FormArray([
        new FormGroup({
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
      ]),
    }),
  },
});

export const markdown = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null),
      body: new FormArray([
        new FormGroup({
          type: new FormControl('markdown'),
          attributes: new FormGroup({
            value: new FormControl(null, Validators.required),
          }),
        }),
      ]),
    }),
  },
});

export const checkboxes = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null),
      body: new FormArray([
        new FormGroup({
          type: new FormControl('checkboxes'),
          id: new FormControl(),
          attributes: new FormGroup({
            label: new FormControl(null),
            description: new FormControl(),
            options: new FormArray([], Validators.required),
          }),
        }),
      ]),
    }),
  },
});

export const dropdown = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      title: new FormControl(null),
      body: new FormArray([
        new FormGroup({
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
      ]),
    }),
  },
});
