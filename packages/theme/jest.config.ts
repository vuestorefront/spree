import type {Config} from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)']
};
export default config;
