module.exports = {
    root: true,
    env: {
        node: true,
    },
    extends: [
        'plugin:vue/vue3-essential',
    ],
    parserOptions: {
        parser: '@babel/eslint-parser',
    },
    rules: {
        'indent': ['error', 4],
        'arrow-parens': ['error', 'always'],
        'semi': ['error', 'always'],
        'no-constant-condition': 'off',
        'no-empty': 'off',
        'object-shorthand': ['error'],
        'comma-dangle': ['error', 'always-multiline'],
        'eol-last': ['error', 'always'],
        'object-curly-spacing': ['error', 'always'],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
};
