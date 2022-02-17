const path = require("path");
const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");
const withPWA = require("next-pwa");
const runtimeCaching = require("next-pwa/cache");

const settings = (phase) => ({
experimental: { scrollRestoration: true },
  pwa: {
    dest: "public",
    runtimeCaching,
  },
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
});

module.exports =
  process.env.NODE_ENV === "development" ? settings : withPWA(settings);
