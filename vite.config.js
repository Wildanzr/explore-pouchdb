import { defineConfig } from 'vite'
import { resolve } from 'path'
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import cjs from '@rollup/plugin-commonjs'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  return {
    server: {
      https: false,
      port: 3000,
      fs: {
        allow: ['../']
      }
    },
    // envDir: "./env_web",
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        injectRegister: 'auto',
        devOptions: {
          enabled: true
        },
        includeAssets: ['vite.svg'],
        generateSW: {
          swDest: 'dist/sw.js',
          skipWaiting: true,
          clientsClaim: true,
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-stylesheets'
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com/,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                cacheableResponse: {
                  statuses: [0, 200]
                },
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                  maxEntries: 30
                }
              }
            },
            {
              urlPattern: /^https:\/\/sm\.wildanzr\.my.id/,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                networkTimeoutSeconds: 5,
                expiration: {
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                  maxEntries: 30
                }
              }
            }
          ]
        },
        manifest: {
          name: 'My Vite PWA',
          short_name: 'PWA',
          description: 'My Vite PWA Apps',
          theme_color: '#ffffff',
          icons: [
            {
              src: 'vite.svg',
              sizes: '512x512',
              type: 'image/svg+xml'
            }
          ]
        }
      })
    ],
    build: {
      // minify: false,
      // target: "es2015",
      outDir: 'dist_web',
      sourcemap: true,
      commonjsOptions: { include: [] },
      rollupOptions: {
        plugins: [
          // Enable rollup polyfills plugin
          // used during production bundling
          nodePolyfills({
            include: ['node_modules/**/*.js', '../../node_modules/**/*.js']
          }),
          cjs()
        ]
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        process: 'rollup-plugin-node-polyfills/polyfills/process-es6',
        buffer: 'rollup-plugin-node-polyfills/polyfills/buffer-es6',
        events: 'rollup-plugin-node-polyfills/polyfills/events',
        util: 'rollup-plugin-node-polyfills/polyfills/util',
        sys: 'util',
        stream: 'rollup-plugin-node-polyfills/polyfills/stream',
        _stream_duplex:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/duplex',
        _stream_passthrough:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/passthrough',
        _stream_readable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/readable',
        _stream_writable:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/writable',
        _stream_transform:
          'rollup-plugin-node-polyfills/polyfills/readable-stream/transform'
      }
    },
    optimizeDeps: {
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        },
        // Enable esbuild polyfill plugins
        plugins: [
          NodeGlobalsPolyfillPlugin({
            process: true
          }),
          NodeModulesPolyfillPlugin()
        ]
      }
    }
  }
})
