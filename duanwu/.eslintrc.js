module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    indent: ['off', 2],
    'space-in-parens': 'off',
    'space-before-function-paren': 'off',
    // "max-len": ["error", {"code": 100}],
    /* 'vue/no-parsing-error': [2, {
      'x-invalid-end-tag': false
    }], */
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
