import type { Preview } from "@storybook/react";

import '../src/app/globals.css';

import { withThemeByClassName } from '@storybook/addon-themes';
import type { ReactRenderer } from '@storybook/react';
import React from "react";
import { SharedDefaults } from '../src/components/SharedDefaults';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [withThemeByClassName<ReactRenderer>({
    themes: {
      light: '',
      dark: 'dark'
    },

    defaultTheme: 'light'
  }),
  (Story) => (
    <SharedDefaults>
      <Story />
    </SharedDefaults>
  ),
],

  tags: ['autodocs']
};

export default preview;
