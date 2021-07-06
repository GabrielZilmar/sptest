export default {
  bail: true,
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.test.ts?(x)',
  ],
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
};
