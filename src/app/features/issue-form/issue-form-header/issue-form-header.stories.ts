import { moduleMetadata } from '@storybook/angular';
import { Meta } from '@storybook/angular/types-6-0';
import { IssueFormHeaderComponent, IssueFormHeaderModule } from './issue-form-header.component';
import { HttpClientModule } from '@angular/common/http';

export default {
  title: 'Components/Issue Form/Header',
  component: IssueFormHeaderComponent,
  decorators: [
    moduleMetadata({
      imports: [IssueFormHeaderModule, HttpClientModule],
    }),
  ],
} as Meta;

export const header = () => ({
  props: {},
});
