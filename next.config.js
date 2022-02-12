const path = require("path");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
module.exports = (phase) => {
  return {
    webpack: (config) => {
      config.plugins = config.plugins || [];

      config.optimization.providedExports = true;

      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "./"),
      };

      return config;
    },
    env: {
      DEV: phase === PHASE_DEVELOPMENT_SERVER,
      PROD: phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1",
    },
  };
};
