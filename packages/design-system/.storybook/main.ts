import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(viteConfig) {
    // try to resolve Storybook package base dir to map deep/internal imports
    try {
      // resolve the package.json of @storybook/react and compute base
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const pkgPath = require.resolve('@storybook/react/package.json');
      const baseDir = pkgPath.replace(/package.json$/, '');
      const storybookAliases = [
        { find: '@storybook/react/dist/', replacement: `${baseDir}dist/` },
        { find: '@storybook/react/dist', replacement: `${baseDir}dist/index.js` },
      ];

      viteConfig.resolve = viteConfig.resolve || {};
      const existingAlias = viteConfig.resolve.alias;
      if (Array.isArray(existingAlias)) {
        viteConfig.resolve.alias = [...storybookAliases, ...existingAlias];
      } else if (existingAlias && typeof existingAlias === 'object') {
        // object form: { find: replacement }
        const obj = Object.assign({}, existingAlias as Record<string, string>);
        for (const a of storybookAliases) obj[a.find] = a.replacement;
        viteConfig.resolve.alias = obj as any;
      } else {
        viteConfig.resolve.alias = storybookAliases as any;
      }

      // Help Vite avoid duplicate React resolves inside pnpm workspaces
      viteConfig.resolve.dedupe = Array.isArray(viteConfig.resolve.dedupe)
        ? Array.from(
            new Set([...viteConfig.resolve.dedupe, 'react', 'react-dom', '@stitches/react']),
          )
        : ['react', 'react-dom', '@stitches/react'];

      viteConfig.optimizeDeps = viteConfig.optimizeDeps || {};
      viteConfig.optimizeDeps.include = Array.isArray(viteConfig.optimizeDeps.include)
        ? Array.from(
            new Set([
              ...viteConfig.optimizeDeps.include,
              '@storybook/react-vite',
              '@storybook/addon-essentials',
              '@stitches/react',
              'react',
              'react-dom',
            ]),
          )
        : [
            '@storybook/react-vite',
            '@storybook/addon-essentials',
            '@stitches/react',
            'react',
            'react-dom',
          ];

      viteConfig.ssr = viteConfig.ssr || {};
      // normalize ssr.noExternal into array form
      const noExt = viteConfig.ssr.noExternal;
      const baseNoExt = Array.isArray(noExt) ? noExt : noExt ? [noExt] : [];
      viteConfig.ssr.noExternal = Array.from(
        new Set(
          [...baseNoExt, /^@storybook\//, 'react', 'react-dom', '@stitches/react'].filter(
            (v) => typeof v !== 'boolean',
          ),
        ),
      );
    } catch (e) {
      // ignore resolution failures — Storybook will log its own errors
      // eslint-disable-next-line no-console
      console.warn('storybook aliasing fallback failed', e && e.message);
    }

    return viteConfig;
  },
};

export default config;
