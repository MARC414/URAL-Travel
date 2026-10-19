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
      // Ship source maps. Lighthouse's "Missing source maps for large
      // first-party JavaScript" is unscored, but it is the difference between
      // a production stack trace you can read and a column offset into a
      // minified chunk. This repo is public on GitHub, so a map exposes
      // nothing that is not already published — and maps are only downloaded
      // when DevTools is open, so there is no user-facing cost.
      sourcemap: true,
      // Route components are React.lazy'd in App.tsx, and the full content
      // corpus is imported only when a data-backed route is requested. Keep its
      // stable chunk name for route-only HTML preloads; the homepage should not
      // have it in the static module graph.
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
            // constants.ts contains route records; App reaches it only via a
            // dynamic import on content-backed routes. Keeping a stable chunk
            // name lets prerender.ts preload it on those routes, never on `/`.
            if (id.includes('src/constants')) {
              return 'content-data';
            }
            // Dynamically imported from App.tsx on blog routes only. Naming it here
            // keeps the chunk findable in the build manifest across refactors.
            if (id.includes('src/data/blogContent')) {
              return 'blog-content';
            }
            // Tiqets attraction data is imported by AttractionDetailPage (React.lazy).
            // Stable name lets prerender.ts preload it on /attractions routes.
            if (id.includes('src/data/tiqetsAttractionsData')) {
              return 'attraction-data';
            }
            return undefined;
          },
        },
      },
      // Surface regressions instead of silently shipping another large bundle.
      chunkSizeWarningLimit: 250,
      cssCodeSplit: true,
      // The prerender pass reads this to emit a <link rel="modulepreload"> for the
      // lazily imported blog-body chunk, so a cold article load starts fetching it
      // during HTML parse instead of waiting for React to mount. It is deleted from
      // dist right after prerendering (see scripts/prerender.ts).
      manifest: true,
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
