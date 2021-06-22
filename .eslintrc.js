module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint", "simple-import-sort"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
};
