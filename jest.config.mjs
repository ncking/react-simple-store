/** @type {import('ts-jest').JestConfigWithTsJest} */

export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  roots: [
    "./test",
    "./redux/test/",
    "./utils/test/"
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
    "^@raiz/react-simple-store$": "<rootDir>/src/",
    "^@raiz/react-simple-store/(.*)$": "<rootDir>/$1"
  }
};

