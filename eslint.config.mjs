import antfu from '@antfu/eslint-config'
import pluginOxlint from 'eslint-plugin-oxlint'

export default antfu({
  unocss: true,
  ignores: ['dist', 'public', '.vscode'],
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    html: true,
  },
  rules: {
    'no-console': 'off',
  },
}, ...pluginOxlint.configs['flat/recommended'])
