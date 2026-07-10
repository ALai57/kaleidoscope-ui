import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

// Design-system gate: no hardcoded color literals in components/pages. Colors
// must come from the theme (theme.palette.* / theme.tokens.*); new colors are
// defined once in src/theme/tokens.ts. See docs/design-system-usage.md.
const noHardcodedColors = [
  'error',
  {
    selector: 'Literal[value=/#[0-9a-fA-F]{3,8}\\b/]',
    message:
      'Hardcoded hex color. Use theme.palette.* / theme.tokens.* (add new colors to src/theme/tokens.ts).',
  },
  {
    selector: 'Literal[value=/rgba?\\(/]',
    message: 'Hardcoded rgb(a) color. Use theme.palette.* / theme.tokens.* instead.',
  },
  {
    selector: 'Literal[value=/hsla?\\(/]',
    message: 'Hardcoded hsl(a) color. Use theme.palette.* / theme.tokens.* instead.',
  },
  {
    selector: 'TemplateElement[value.raw=/(rgba?\\(|hsla?\\(|#[0-9a-fA-F]{3,8}\\b)/]',
    message: 'Hardcoded color in a template literal. Use theme.palette.* / theme.tokens.* instead.',
  },
];

export default [
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // The codebase intentionally populates local form state from props on
      // open/change (AgentEditorDialog, TaskForm, WorkflowEditorPage) and syncs
      // the auth token in an effect. Keep this rule visible as a warning rather
      // than blocking CI on an accepted pattern.
      'react-hooks/set-state-in-effect': 'warn',
      'no-restricted-syntax': noHardcodedColors,
    },
  },
  {
    // Places that legitimately define/manipulate raw colors: the token layer
    // itself, the color-picker tooling, tests, and stories (mock data).
    files: [
      'src/theme/**/*.{ts,tsx}',
      'src/components/colors/**/*.{ts,tsx}',
      'src/**/*.test.{ts,tsx}',
      'src/**/*.stories.tsx',
    ],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
];
