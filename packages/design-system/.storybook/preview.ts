import { globalStyles } from '../src/utils/stitches';
import type { Preview } from '@storybook/react';

// apply global styles for Storybook
globalStyles();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
  },
};

export default preview;
