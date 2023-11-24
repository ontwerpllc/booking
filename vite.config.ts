import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
  resolve: {
    alias: [{ find: '~', replacement: '/src' }],
  },
  define: {
    'import.meta.env.PACKAGE_VERSION': JSON.stringify(
      process.env.npm_package_version,
    ),
  },
});
