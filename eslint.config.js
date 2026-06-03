// eslint.config.js
import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Indicar que los archivos se ejecutan en un entorno Node.js moderno
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },
  // Utiliza las reglas recomendadas por defecto de ESLint
  pluginJs.configs.recommended,

  // Desactiva las reglas de ESLint que entren en conflicto con Prettier
  eslintConfigPrettier,

  // Tus reglas personalizadas
  {
    rules: {
      'no-unused-vars': 'warn', // Cambia a advertencia los imports/variables sin usar
      'no-console': 'off' // Permite console.log ya que es un script de consola
    }
  }
];
