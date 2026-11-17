import { defineConfig } from "cypress";
import codeCoverageTask from "@cypress/code-coverage/task";

export default defineConfig({
  expose: {
    codeCoverage: {
      checkCoverage: false,
    },
  },
  e2e: {
    baseUrl: "http://127.0.0.1:4178",
    setupNodeEvents(on, config) {
      codeCoverageTask(on, config);
      return config;
    },
  },
});
