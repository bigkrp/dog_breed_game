import globals from "globals";
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginSvelte from 'eslint-plugin-svelte';
import svelteParser from "svelte-eslint-parser";
import tsParser from '@typescript-eslint/parser'

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs['flat/recommended'],
    {
        files: ["**/*.svelte"],
        languageOptions: {
            globals: {
                ...globals.browser
            },
            ecmaVersion: 2022,
            sourceType: "module",
            parser: svelteParser,
            parserOptions: {
                parser: tsParser,
                extraFileExtensions: [".svelte"],
            },
        },
    },
);