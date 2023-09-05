module.exports = {
    extends: [
        'plugin:@next/next/recommended',
        'prettier',
        'plugin:@typescript-eslint/recommended',
        'airbnb-typescript',
    ],
    parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 2021,
        parser: '@typescript-eslint/parser',
    },
    plugins: ['import', 'react', 'react-hooks', 'simple-import-sort', 'unused-imports', 'css-modules'],
    rules: {
        'arrow-parens': [2, 'always'],
        'dirnames/match-kebab-case': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
        'import/no-unresolved': 'off',
        'import/no-useless-path-segments': 'off',
        'jsx-a11y/click-events-have-key-events': 'off',
        'jsx-a11y/no-static-element-interactions': 'off',
        'jsx-quotes': [2, 'prefer-single'],
        'max-len': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        'no-underscore-dangle': 'off',
        'no-unused-expressions': 'off',
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            {
                vars: 'all',
                varsIgnorePattern: '^_',
                args: 'after-used',
                argsIgnorePattern: '^_',
            },
        ],
        'padding-line-between-statements': [
            2,
            { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
        ],
        'react/destructuring-assignment': 'off',
        'react/jsx-child-element-spacing': 'off',
        'react/jsx-curly-spacing': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-fragments': 'off',
        'react/jsx-one-expression-per-line': 'off',
        'react/jsx-key': ['error', { checkFragmentShorthand: true }],
        'react/jsx-props-no-spreading': 'off',
        'react/jsx-wrap-multilines': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/no-array-index-key': 'warn',
        'react/state-in-constructor': [2, 'never'],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'simple-import-sort/sort': 'off',
        'simple-import-sort/imports': [
            'warn',
            {
                groups: [
                    // Node.js builtins. You could also generate this regex if you use a `.js` config.
                    // For example: `^(${require("module").builtinModules.join("|")})(/|$)`
                    [
                        '^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)',
                    ],
                    // Packages. `next` and `react` related packages come first.
                    ['^next', '^react', '^redux'],
                    // Other packages
                    ['^@alfalab', '^\\w'],
                    // Root path for project
                    ['^@', '^#'],
                    // Parent imports. Put `..` last.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    // Style imports.
                    ['^.+\\.s?css$'],
                ],
            },
        ],
        'unicorn/filename-case': 'off',
        '@typescript-eslint/class-name-casing': 'off',
        '@typescript-eslint/comma-dangle': 'off',
        '@typescript-eslint/indent': 'off',
        '@typescript-eslint/no-angle-bracket-type-assertion': 'off',
        '@typescript-eslint/no-shadow': 'off',
        '@typescript-eslint/no-throw-literal': 'off',
        '@typescript-eslint/no-unused-expressions': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-explicit-any': 'warn',
    },
};
