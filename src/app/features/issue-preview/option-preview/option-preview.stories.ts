import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular/types-6-0';
import { OptionPreviewComponent, OptionPreviewModule } from './option-preview.component';

export default {
  title: 'Components/Issue Preview/Option',
  component: OptionPreviewComponent,
  decorators: [
    moduleMetadata({
      imports: [OptionPreviewModule, BrowserAnimationsModule],
    }),
  ],
} as Meta;

export const emptyList = () => ({
  props: {
    label: 'Labels',
    optionList: [],
  },
});

export const labels = () => ({
  props: {
    label: 'Labels',
    optionList: ['bug', 'triage', 'good first issue', 'enhancement'],
  },
});

export const assignees = () => ({
  props: {
    label: 'Assignees',
    optionList: ['geromegrignon'],
  },
});
