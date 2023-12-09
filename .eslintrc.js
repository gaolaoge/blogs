const base = require("@gaoges/lint-config/eslintrc");

module.exports = Object.assign({}, base, {
  parserOptions: {
    ecmaVersion: 6
  }
});
