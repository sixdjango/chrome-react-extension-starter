import { defineConfig } from 'vite'
import { isDev, r } from './scripts/utils'
import packageJson from './package.json'
import { sharedConfig } from './vite.config'
import prefixer from 'postcss-prefix-selector'
import autoprefixer from 'autoprefixer'

// bundling the content script using Vite
export default defineConfig({
  ...sharedConfig,
  define: {
    __DEV__: isDev,
    __NAME__: JSON.stringify(packageJson.name),
    // https://github.com/vitejs/vite/issues/9320
    // https://github.com/vitejs/vite/issues/9186
    'process.env.NODE_ENV': JSON.stringify(isDev ? 'development' : 'production')
  },

  css: {
    postcss: {
      plugins: [
        prefixer({
          prefix: '.nw-plugin',
          transform(prefix, selector, prefixedSelector, filePath, rule) {
            if (selector.match(/^(html|body)/)) {
              return selector.replace(/^([^\s]*)/, `$1 ${prefix}`)
            }

            if (filePath.match(/node_modules/)) {
              return selector // Do not prefix styles imported from node_modules
            }

            const annotation = rule.prev()
            if (annotation?.type === 'comment' && annotation.text.trim() === 'no-prefix') {
              return selector // Do not prefix style rules that are preceded by: /* no-prefix */
            }

            return prefixedSelector
          }
        }),

        autoprefixer({})
      ]
    }
  },

  build: {
    watch: isDev ? {} : undefined,
    outDir: r('extension/dist/contentScripts'),
    cssCodeSplit: false,
    emptyOutDir: false,
    sourcemap: isDev ? 'inline' : false,
    lib: {
      entry: r('src/contentScripts/index.ts'),
      name: packageJson.name,
      formats: ['iife']
    },
    rollupOptions: {
      output: {
        entryFileNames: 'index.global.js',
        extend: true
      }
    }
  }
})
