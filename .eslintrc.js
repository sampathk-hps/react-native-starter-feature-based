module.exports = {
  root: true,
  extends: ['@react-native', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  overrides: [
    {
      files: ['**/__tests__/**/*.ts?(x)', '**/?(*.)+(spec|test).ts?(x)'],
      env: {
        'jest/globals': true,
      },
    },
  ],
  rules: {
    // *** GENERAL ***

    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    // Enforce curly braces for all control structures
    curly: ['error', 'all'],
    // Enforce brace style and require new line for statements
    'brace-style': ['error', '1tbs', { allowSingleLine: false }],
    // Enforces spaces inside curly braces
    'object-curly-spacing': ['error', 'always', { arraysInObjects: false }],
    // Enforce === and !== usage
    eqeqeq: ['error', 'always'],
    // Enforce dot notation wherever possible
    'dot-notation': ['error', { allowKeywords: true }],
    // Enforce a maximum of 3 parameters in function definitions
    'max-params': ['error', 3],
    // Require constructor names to begin with a capital letter
    'new-cap': ['error', { newIsCap: true, capIsNew: false }],

    // Disable the base 'no-shadow' rule provided by ESLint
    'no-shadow': 'off',
    // Use TypeScript's `no-shadow` rule to avoid issues with enums
    '@typescript-eslint/no-shadow': ['error', { ignoreTypeValueShadow: true }],

    // Require let or const instead of var
    'no-var': 'error',
    // Require const declarations for variables that are never reassigned
    'prefer-const': [
      'error',
      {
        destructuring: 'all', // This enforces const for all destructured variables
        ignoreReadBeforeAssign: true, // Ignore variables that are only read before they are assigned
      },
    ],

    // Disable the base rule (no-unused-vars)
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        vars: 'all', // Check all variables
        args: 'after-used', // Only warn if the arguments are not used
        ignoreRestSiblings: true, // Ignore unused variables when using rest properties
        varsIgnorePattern: '^_|styles|error', // Ignore variables starting with _ or containing "styles"
        argsIgnorePattern: '^_|styles|error', // Ignore function arguments starting with _ or containing "styles"
        caughtErrorsIgnorePattern: '^_|error', // Ignore caught errors starting with _ or containing "error"
      },
    ],

    // *** REACT ***

    // Disable the rule requiring React in scope for JSX
    'react/react-in-jsx-scope': 'off',
    // Inline styles are not allowed
    'react-native/no-inline-styles': 'warn',
    // Enforce avoiding unstable nested components to prevent performance issues and unexpected re-renders.
    'react/no-unstable-nested-components': ['error', { allowAsProps: true }],
    // Disable dependency check for useEffect
    'react-hooks/exhaustive-deps': 'off',
    // Enable unused styles rule
    'react-native/no-unused-styles': 'warn',
  },
};
