/// <reference types="vitest" />

import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Enable production mode optimizations
          hoistStatic: true,
          cacheHandlers: true,
        },
      },
    }),
    // Only target modern browsers to reduce bundle size
    legacy({
      targets: ['defaults', 'not IE 11'],
      modernPolyfills: true,
      renderLegacyChunks: false, // Don't generate legacy chunks
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: 'esnext',
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2,
      },
      format: {
        comments: false, // Remove comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split vendor chunks for better caching and smaller chunks
          if (id.includes('node_modules')) {
            // Split Ionic Core into smaller chunks by component groups
            if (id.includes('@ionic/core')) {
              // Split by component directories for better chunking
              if (id.includes('@ionic/core/components')) {
                // Extract component name and group similar components
                const match = id.match(/@ionic\/core\/components\/([^/]+)/);
                if (match) {
                  const component = match[1];
                  // Group form-related components
                  if (['input', 'textarea', 'select', 'checkbox', 'radio', 'toggle', 'range'].includes(component)) {
                    return 'ionic-forms';
                  }
                  // Group navigation components
                  if (['nav', 'router', 'tabs', 'menu', 'back-button'].includes(component)) {
                    return 'ionic-nav';
                  }
                  // Group overlay components
                  if (['modal', 'popover', 'toast', 'loading', 'alert', 'action-sheet'].includes(component)) {
                    return 'ionic-overlays';
                  }
                  // Group list components
                  if (['list', 'item', 'item-sliding', 'virtual-scroll'].includes(component)) {
                    return 'ionic-lists';
                  }
                }
              }
              // Remaining ionic core
              return 'ionic-core';
            }

            // Ionic Vue wrapper in separate chunk
            if (id.includes('@ionic/vue')) {
              return 'ionic-vue';
            }

            // Split ionicons into smaller chunks
            if (id.includes('ionicons')) {
              // Ionicons can be large, but keep it as one chunk for now
              return 'ionicons';
            }

            // Vue core - split by library
            if (id.includes('vue-router')) {
              return 'vue-router';
            }
            if (id.includes('pinia')) {
              return 'pinia';
            }
            if (id.includes('vue') && !id.includes('vue-router') && !id.includes('@vueuse')) {
              return 'vue';
            }

            // i18n libraries
            if (id.includes('i18next')) {
              return 'i18n';
            }

            // VueUse libraries
            if (id.includes('@vueuse')) {
              return 'vueuse';
            }

            // Axios for API calls
            if (id.includes('axios')) {
              return 'axios';
            }

            // Other vendor libraries
            return 'vendor';
          }
        },
        // Optimize chunk naming for better caching
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
      },
    },
    // Increase chunk size warning limit for Ionic apps (they're naturally larger)
    // This is acceptable as we're using code splitting and lazy loading
    chunkSizeWarningLimit: 800,
    // Enable source maps only for errors (smaller files)
    sourcemap: false,
    // Improve build performance
    reportCompressedSize: false,
  },
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      '@ionic/vue',
      '@ionic/vue-router',
    ],
    exclude: ['@ionic/core'],
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
