import { globalStyles, setTheme } from '../src/utils/stitches';
import type { Preview, StoryFn } from '@storybook/react';
import React from 'react';

// apply global styles for Storybook (client)
globalStyles();

// Storybook globals: theme toolbar (light / dark)
export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: [
        { value: 'light', title: 'Light' },
        { value: 'dark', title: 'Dark' },
      ],
    },
  },
};

// Decorator to apply the selected theme
export const decorators = [
  (Story: StoryFn<any>, context: any) => {
    const theme = context.globals.theme as 'light' | 'dark';
    // apply theme class to document root
    if (typeof window !== 'undefined') setTheme(theme);
    const storyEl = Story(context.args, context);

    // Floating toggle overlay (renders in the canvas so the toggle is always visible)
    const ThemeToggleOverlay = () => {
      const [localTheme, setLocalTheme] = React.useState<'light' | 'dark'>(() => {
        try {
          return (localStorage.getItem('ds-theme') as 'light' | 'dark') || theme;
        } catch (e) {
          return theme;
        }
      });

      React.useEffect(() => {
        setTheme(localTheme);
        try {
          localStorage.setItem('ds-theme', localTheme);
        } catch (e) {
          // ignore
        }
      }, [localTheme]);

      const btnStyle: React.CSSProperties = {
        padding: '6px 10px',
        fontSize: 12,
        borderRadius: 6,
        border: '1px solid rgba(0,0,0,0.08)',
        background: 'rgba(255,255,255,0.9)',
        color: '#111',
        cursor: 'pointer',
      };

      const containerStyle: React.CSSProperties = {
        position: 'fixed',
        right: 12,
        bottom: 12,
        zIndex: 9999,
      };

      return React.createElement(
        'div',
        { style: containerStyle },
        React.createElement(
          'button',
          {
            style: btnStyle,
            onClick: () => setLocalTheme((t) => (t === 'light' ? 'dark' : 'light')),
            'aria-label': 'Toggle theme',
          },
          `Theme: ${localTheme}`,
        ),
      );
    };

    return React.createElement(
      React.Fragment,
      null,
      storyEl,
      React.createElement(ThemeToggleOverlay),
    );
  },
];

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: { expanded: true },
  },
};

export default preview;
