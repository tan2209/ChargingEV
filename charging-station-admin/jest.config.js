module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript files
      '^.+\\.(js|jsx)$': 'babel-jest', // Transform JavaScript files
    },
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!axios)'], // Allow axios to be transformed
  };
  