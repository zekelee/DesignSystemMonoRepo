import { createStitches } from '@stitches/react';

export const { styled, css, globalCss, theme, getCssText, keyframes, createTheme } = createStitches(
  {
    theme: {
      colors: {
        primary: '#0ea5e9',
        text: '#0f172a',
        background: '#ffffff',
        // derived / semantic tokens
        textOnPrimary: '#ffffff',
        surface: '#f8fafc',
        muted: '#64748b',
        border: '#e6eef8',
      },
      fonts: {
        // Prefer Pretendard from CDN; fall back to system fonts
        body: 'Pretendard, Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue"',
      },
      radii: {
        1: '4px',
        2: '6px',
        3: '8px',
      },
    },
  },
);

export const globalStyles = globalCss({
  '*, *:before, *:after': { boxSizing: 'border-box' },
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

// -- Theme helpers (light / dark)
// Create a dark theme that overrides the default tokens above.
// `createTheme` returns a class name string that you can add to <html> or <body>.
export const darkTheme = createTheme('ds-dark', {
  colors: {
    primary: '#38bdf8',
    text: '#e6eef8',
    background: '#0b1220',
    surface: '#0f172a',
    muted: '#94a3b8',
    border: '#1f2a44',
  },
});

/**
 * Set theme on the document root.
 * - On the client, call `setTheme('dark')` or `setTheme('light')` once at startup or when toggling.
 * - For SSR, include `getCssText()` output in the server-rendered <head> (see comment below) so initial paint has correct styles.
 */
export function setTheme(mode?: 'light' | 'dark') {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;

  // remove any previous ds- theme classes we created
  Array.from(root.classList).forEach((c) => {
    if (c.startsWith('ds-')) root.classList.remove(c);
  });

  if (mode === 'dark') root.classList.add(darkTheme);
  // light -> no class (uses default tokens)
}

/*
SSR note (Next.js):
 - In `_document.tsx`, after server render, inject stitches CSS so the initial HTML includes styles and avoids FOUC:

  // pages/_document.tsx (sketch)
  // import { getCssText } from 'path/to/stitches'
  // ...
  // <Head>
  //   <style id="stitches" dangerouslySetInnerHTML={{ __html: getCssText() }} />
  // </Head>

 - On the client, call `globalStyles()` (and optionally `setTheme('dark')`) in `_app.tsx` to ensure runtime registry matches server CSS.
*/
