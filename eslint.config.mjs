// @ts-check
import eslint from '@eslint/js';
import jestPlugin from 'eslint-plugin-jest'; // Importamos el plugin de Jest
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['eslint.config.mjs', 'scripts/**/*.js'],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: 'commonjs',
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-floating-promises': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
  /* REGLAS ESPECÍFICAS PARA TESTS */
  {
    files: ['**/*.spec.ts', '**/*.test.ts'],
    plugins: {
      jest: jestPlugin,
    },
    rules: {
      // Reglas de TypeScript-ESLint (Flexibilidad para mocks)
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/unbound-method': 'off', // Necesario para jest.spyOn

      // Reglas de Jest (Calidad del test)
      'jest/no-disabled-tests': 'warn', // Avisa si dejas un 'it.skip'
      'jest/no-focused-tests': 'error', // Error si dejas un 'it.only' (evita subir tests aislados)
      'jest/no-identical-title': 'error', // Títulos de test duplicados
      'jest/prefer-to-have-length': 'warn', // Sugiere expect(..).toHaveLength()
      'jest/valid-expect': 'error', // Asegura que el expect esté bien escrito
      'jest/expect-expect': 'warn', // Avisa si un test no tiene ninguna aserción
      'jest/no-conditional-expect': 'error', // Evita expect() dentro de ifs o loops
    },
  },
);
