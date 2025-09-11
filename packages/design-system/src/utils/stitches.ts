import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, theme, getCssText, keyframes } = createStitches({
  theme: {
    colors: {
      primary: '#0ea5e9',
      text: '#0f172a',
      background: '#ffffff',
    },
    fonts: {
      body: 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue"',
    },
  },
});

export const globalStyles = globalCss({
  '*': { boxSizing: 'border-box' },
  html: { height: '100%' },
  body: {
    margin: 0,
    minHeight: '100%',
    fontFamily: '$fonts$body',
    color: '$colors$text',
    background: '$colors$background',
    WebkitFontSmoothing: 'antialiased',
    MozOsxFontSmoothing: 'grayscale',
  },
  'img, picture, video': { maxWidth: '100%', display: 'block' },
  a: { color: 'inherit', textDecoration: 'none' },
});
