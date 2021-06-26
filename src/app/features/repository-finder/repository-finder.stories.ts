import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { Meta } from '@storybook/angular/types-6-0';
import { RepositoryFinderComponent, RepositoryFinderModule } from './repository-finder.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export default {
  title: 'Components/Repository Finder',
  component: RepositoryFinderComponent,
  decorators: [
    moduleMetadata({
      imports: [RepositoryFinderModule, BrowserAnimationsModule],
      providers: [{ provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } }],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    form: new FormGroup({
      name: new FormControl(null, Validators.required),
    }),
  },
});
