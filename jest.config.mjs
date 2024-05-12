/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    "./src/core/test",
    "./src/redux/test/",
    "./src/utils/test/"
  ],
  transform: {
    "^.+\\.tsx?$": [
      "ts-jest",
      {
        diagnostics: false,
      },
    ],
  },
  moduleNameMapper: {
    "^@raiz/react-simple-store$": "<rootDir>/src/core/",
    "^@raiz/react-simple-store/(.*)$": "<rootDir>/src/$1"
  }
};

