import { moduleMetadata } from '@storybook/angular';
import { Meta } from '@storybook/angular/types-6-0';
import { ErrorMessageComponent, ErrorMessageModule } from './error-message.component';

export default {
  title: 'Components/Shared/Error message',
  component: ErrorMessageComponent,
  decorators: [
    moduleMetadata({
      imports: [ErrorMessageModule],
    }),
  ],
} as Meta;

export const basic = () => ({
  props: {},
});
