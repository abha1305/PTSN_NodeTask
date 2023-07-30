import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  moduleDirectories: ['node_modules', 'src'],
  transform: {
    '^.+\\.html?$': 'html-loader-jest',
  },
  testPathIgnorePatterns: ['src/__tests__/testReport/*'],
  testMatch: ['**/?(*.)+(spec|test).ts?(x)']
};
export default config;
