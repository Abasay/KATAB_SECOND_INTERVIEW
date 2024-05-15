import type { Config } from "jest";

const config: Config = {
  clearMocks: true,
  collectCoverage: true,
  preset: "ts-jest",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  moduleFileExtensions: [
    "js",
    "mjs",
    "cjs",
    "jsx",
    "ts",
    "tsx",
    "json",
    "node",
  ],
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  transformIgnorePatterns: ["\\\\node_modules\\\\", "\\.pnp\\.[^\\\\]+$"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  // setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
};

export default config;
