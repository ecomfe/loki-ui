module.exports = {
    extends: [
        require.resolve('@reskript/config-lint/config/eslint'),
    ],
    rules: {
        'comma-dangle': 'off',
        'no-trailing-spaces': 'off',
        '@typescript-eslint/no-unused-vars': 'warn',
        '@typescript-eslint/no-useless-constructor': 'warn',
        'no-console': 'warn',
        '@babel/object-curly-spacing': ['error', 'never']
    },
};
