import { pathsToModuleNameMapper } from 'ts-jest';
import { createRequire } from 'module';

const required = createRequire(import.meta.url);
const { compilerOptions } = required('./tsconfig.json');

const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/setup-test.ts'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  collectCoverageFrom: [
    'src/renderer/src/**/*.{js,jsx,ts,tsx}',
    '!src/preload/**',
    '!src/main/**',
    '!src/**/*.d.ts',
    '!src/**/*.{spec,test}.{js,jsx,ts,tsx}',
    '!**/node_modules/**',
    '!**/vendor/**',
    '!**/dist/**',
    '!**/build/**',
    '!vite.config.ts',
    '!**/coverage/**',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'setup-tests.ts',
    'vite-env.d.ts',
  ],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};

export default config;
