import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Meta } from '@storybook/angular/types-6-0';
import { TopLevelPreviewComponent, TopLevelPreviewModule } from './top-level-preview.component';

export default {
  title: 'Components/Issue Preview/Top Level',
  component: TopLevelPreviewComponent,
  decorators: [
    moduleMetadata({
      imports: [TopLevelPreviewModule, BrowserAnimationsModule],
    }),
  ],
} as Meta;

export const basic = () => ({
  props: {},
});

export const filled = () => ({
  props: {
    name: 'Bug report',
    description: 'template for bug report',
    title: '[Bug]: ',
  },
});
