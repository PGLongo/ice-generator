// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // TypeScript strict rules
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }],

      // Vue strict rules
      'vue/multi-word-component-names': ['error', {
        ignores: ['index', 'preview', 'default']
      }],
      'vue/no-unused-components': 'error',
      'vue/no-v-html': 'warn',
      'vue/require-default-prop': 'warn',

      // General code quality
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'no-debugger': 'error',
      'prefer-const': 'error',
      'no-var': 'error',
      'eqeqeq': ['error', 'always'],

      // Disable stylistic rules (handled by formatter)
      '@stylistic/quote-props': 'off',
      '@stylistic/arrow-parens': 'off',
      '@stylistic/multiline-ternary': 'off',
      '@stylistic/operator-linebreak': 'off',
      '@stylistic/indent': 'off',
      'vue/singleline-html-element-content-newline': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/html-closing-bracket-spacing': 'off',
      'vue/attributes-order': 'off',

      // Nuxt/Vue best practices
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never'
        }
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
      'vue/prop-name-casing': ['error', 'camelCase']
    }
  }
)
