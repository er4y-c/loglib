import eslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
    {
        files: ['**/*.ts'],
        ignores: ['examples/**/*.ts'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: './tsconfig.json'
            }
        },
        plugins: {
            '@typescript-eslint': eslint
        },
        rules: {
            // TypeScript specific rules
            '@typescript-eslint/no-explicit-any': 'error',
            '@typescript-eslint/explicit-function-return-type': 'error',
            '@typescript-eslint/no-unused-vars': 'error',
            '@typescript-eslint/no-non-null-assertion': 'error',
            '@typescript-eslint/no-empty-interface': 'error',
            '@typescript-eslint/consistent-type-definitions': ['error', 'interface'],
            '@typescript-eslint/prefer-optional-chain': 'error',
            '@typescript-eslint/no-empty-function': 'error',
            '@typescript-eslint/no-inferrable-types': 'error',
            
            // General ESLint rules
            'no-console': 'warn',
            'no-duplicate-imports': 'error',
            'no-unused-expressions': 'error',
            'no-unused-private-class-members': 'error',
            'no-var': 'error',
            'prefer-const': 'error',
            'prefer-template': 'error',
            'require-await': 'error',
            'eqeqeq': ['error', 'always'],
            
            // Code style rules
            'semi': ['error', 'always'],
            'quotes': ['error', 'single'],
            'indent': ['error', 2],
            'comma-dangle': ['error', 'always-multiline'],
            'arrow-parens': ['error', 'always'],
            'max-len': ['error', { 'code': 100 }]
        },
        settings: {
            'import/resolver': {
                typescript: true,
                node: true
            }
        }
    },
    {
        files: ['**/*.ts'],
        rules: {
            ...eslintConfigPrettier.rules
        }
    }
];