/**
 * Library build — produces ESM + .d.ts in dist-lib/.
 * Used by `npm run build:lib` (and `prepublishOnly`).
 *
 * The docs-site build (vite.config.ts) is unaffected.
 */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import dts from 'vite-plugin-dts';
import path from 'node:path';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      entryRoot: 'src',
      include: [
        'src/index.ts',
        'src/components/**/*.{ts,tsx}',
        'src/hooks/**/*.{ts,tsx}',
        'src/utils/**/*.{ts,tsx}',
        'src/patterns/**/*.{ts,tsx}',
      ],
      exclude: [
        'src/docs/**',
        'src/showcase/**',
        'src/App.tsx',
        'src/main.tsx',
        '**/*.test.*',
        '**/*.stories.*',
      ],
      outDir: 'dist-lib',
      tsconfigPath: 'tsconfig.app.json',
      rollupTypes: true, // bundle every .d.ts into one index.d.ts
      insertTypesEntry: true,
    }),
  ],
  // Don't copy public/fonts and other app assets into the library output
  publicDir: false,
  build: {
    outDir: 'dist-lib',
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
      cssFileName: 'styles',
    },
    rollupOptions: {
      // Anything in peerDependencies + everything starting with @radix-ui must be external.
      external: (id) =>
        id === 'react' ||
        id === 'react-dom' ||
        id.startsWith('react/') ||
        id.startsWith('react-dom/') ||
        id.startsWith('@radix-ui/') ||
        id === '@floating-ui/react' ||
        id === 'class-variance-authority' ||
        id === 'clsx' ||
        id === 'lucide-react' ||
        id === 'tailwind-merge',
      output: {
        // Keep imports clean — don't crush the file structure.
        preserveModules: false,
        exports: 'named',
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
