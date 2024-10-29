import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    {
      languageOptions:
          {
            globals: globals.node,
            ecmaVersion: 'latest',
            parserOptions: {
              ecmaFeatures: {
                jsx: true,
              },
            },
            sourceType: 'module',
          },
      files: ["src/**/*.ts"],
      rules: {
        "semi-style": ["error", "last"],
        "no-unused-vars": "warn",
        "no-undef": "error",
        "@typescript-eslint/no-explicit-any": "off",
        '@typescript-eslint/no-unused-vars': 'off',
        'no-param-reassign': 'off',
        '@typescript-eslint/consistent-type-definitions': 'off',
        '@typescript-eslint/no-misused-promises': 'off',
        'no-underscore-dangle': 'off',
        'class-methods-use-this': 'off',
        'import/prefer-default-export': 'off',
        camelcase: 'off',
        '@typescript-eslint/camelcase': 'off',
        // ...typescriptEslint.rules
      },
      ignores: ["node_modules/**/*", "build/**/*", "dist/**/*"],
    }
);
