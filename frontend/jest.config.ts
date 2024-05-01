import type { Config } from "jest";

const config: Config = {
  collectCoverageFrom: [
    "**/*.{js,jsx}",
    "!**/node_modules/**",
    "!**/vendor/**",
  ],
  verbose: true,
};

export default config;
