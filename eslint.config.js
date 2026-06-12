import nodePlugin from 'eslint-plugin-n';

export default [
  {
    plugins: {
      n: nodePlugin,
    },
    rules: {
      'n/no-unsupported-features/es-syntax': [
        'error',
        {
          ignores: ['modules', 'error-cause'],
        },
      ],
      'n/no-process-exit': 'off',
      'no-unused-vars': ['error', { argsIgnorePattern: '^next$' }],
    },
  },
];
