import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import tseslint from "typescript-eslint";


/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{ts,tsx}"],
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
    languageOptions: { 
      globals: globals.browser, 
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      }
    }
    
  },
  // ESLint recommended config
  pluginJs.configs.recommended,
  
  // TypeScript recommended config
  ...tseslint.configs.recommended,

  // React recommended config in flat format
  pluginReact.configs.flat.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off', 
    }
  },

  

// Configuração para ordenação de imports
  {
    plugins: {
      'simple-import-sort': simpleImportSort
    },
    rules: {
      'simple-import-sort/imports': 'error'
    }
  }
];