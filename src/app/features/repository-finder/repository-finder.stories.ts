import { moduleMetadata } from '@storybook/angular';
import { Meta } from '@storybook/angular/types-6-0';
import { RepositoryFinderComponent, RepositoryFinderModule } from './repository-finder.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Components/Repository Finder',
  component: RepositoryFinderComponent,
  decorators: [
    moduleMetadata({
      imports: [RepositoryFinderModule, HttpClientModule],
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

const invalidForm = new FormGroup({
  name: new FormControl(null, Validators.required),
});
invalidForm.markAllAsTouched();
export const invalid = () => ({
  props: {
    form: invalidForm,
  },
});
