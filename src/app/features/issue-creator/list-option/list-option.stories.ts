import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular/types-6-0';
import { ListOptionComponent, ListOptionModule } from './list-option.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export default {
  title: 'Components/Issue Creator/Checkbox option',
  component: ListOptionComponent,
  decorators: [
    moduleMetadata({
      imports: [ListOptionModule, BrowserAnimationsModule],
    }),
  ],
} as Meta;

export const pristine = () => ({
  props: {
    form: new FormGroup({
      label: new FormControl(null, Validators.required),
      validations: new FormGroup({
        required: new FormControl(),
      }),
    }),
  },
});
