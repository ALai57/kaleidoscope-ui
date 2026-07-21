import { defineConfig } from 'vite';
import type { ProxyOptions } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'fs';

const pkg = JSON.parse(readFileSync(path.resolve(__dirname, 'package.json'), 'utf-8')) as {
  version: string;
};

// Forward to the local backend verbatim (no path rewriting) with the tenant
// host header the backend uses to resolve andrewslai.com locally. Shared by
// the /api/v1 namespace and the self-versioned root routes.
const backendProxy: ProxyOptions = {
  target: 'http://localhost:5000',
  changeOrigin: true,
  configure: (proxy) => {
    proxy.on('proxyReq', (proxyReq) => {
      proxyReq.setHeader('host', 'andrewslai.com.localhost');
    });
  },
};

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react()],
  publicDir: 'resources/kaleidoscope.client',
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    proxy: {
      // Versioned API namespace — backend serves /api/v1/* verbatim
      // (dual-mounted during the migration).
      '/api/v1': backendProxy,
      // Self-versioned backend routes that bypass the /api/v1 base.
      '/v2': backendProxy,
      '/v1': backendProxy,
      '/check-domain': backendProxy,
    },
  },
  build: {
    outDir: 'resources/kaleidoscope.client/static/dist',
    emptyOutDir: true,
    copyPublicDir: false,
    // 'hidden' emits .map files without a sourceMappingURL comment, so they are
    // never referenced publicly. The deploy script uploads them to Bugsnag and
    // then strips them before syncing to S3.
    sourcemap: 'hidden',
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    globals: true,
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
  },
});
