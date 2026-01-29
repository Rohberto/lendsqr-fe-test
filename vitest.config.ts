import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    css: true,
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): boolean {
    if (log.includes('act(')) return false;
    return true;
  }

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
  },
});