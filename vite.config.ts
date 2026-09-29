import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Route components are already React.lazy'd in App.tsx. What remained in
      // the entry chunk was React itself plus the content corpus, so this only
      // handles those two.
      //
      // The object form of manualChunks matches a package's *entry* module.
      // main.tsx imports "react-dom/client", which is a different module from
      // "react-dom", so an object rule left all ~130 KB of React DOM in the app
      // chunk. Matching on the resolved path catches every submodule.
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('node_modules/react-dom') ||
                id.includes('node_modules/react/') ||
                id.includes('node_modules/scheduler')
              ) {
                return 'vendor-react';
              }
              if (id.includes('node_modules/lucide-react')) {
                return 'vendor-icons';
              }
              return undefined;
            }
            // constants.ts is ~350 KB of blog/route content. Keeping it out of
            // the app chunk means editing a component does not invalidate the
            // content for returning visitors, and vice versa.
            if (id.includes('src/constants')) {
              return 'content-data';
            }
            return undefined;
          },
        },
      },
      // Surface regressions instead of silently shipping another large bundle.
      chunkSizeWarningLimit: 250,
      cssCodeSplit: true,
    },
    server: {
      allowedHosts: ['.e2b.app'],
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
