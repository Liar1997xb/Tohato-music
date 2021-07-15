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
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-multiple-empty-lines': [0, {
      max: 100
    }],
    indent: ['off', 2],
    'space-before-function-paren': 0,
    semi: 0,
    'no-unused-vars': 0,
    "quotes": [1, "single"]
    // 'prefer-const': 'off'
  }
}
