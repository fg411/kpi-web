module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    "comma-dangle": [1, "never"],//对象字面量项尾不能有逗号
    "space-before-function-paren": ["error", "never"],
    "no-lonely-if": 1, // 禁止else语句内只有if语句
  },
};
