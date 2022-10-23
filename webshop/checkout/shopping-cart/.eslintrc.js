// eslint merges config files from parent directories (https://eslint.org/docs/user-guide/configuring/configuration-files)
// we need this one to make sure we have same results when:
// * running from OCComponents dir
// * running from specific component dir
module.exports = {
  parserOptions: {
    project: ['./tsconfig.json'],
    tsconfigRootDir: __dirname
  },
  rules: {
    "react/prop-types": "off",
    "@typescript-eslint/restrict-template-expressions": "off"
  }
};
