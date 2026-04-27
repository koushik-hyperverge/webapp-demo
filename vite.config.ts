import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'node:path';

// Webapp Vite config. Kept thin — most defaults come from scaffold packages.
// (In production, this would be: `export default defineConfig(scaffoldVitePreset())`)
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: { port: 5173, host: true },
  build: { sourcemap: true, target: 'es2020' },
});
