#!/usr/bin/env node
// Home Assistant add-on entrypoint.
//
// Supervisor writes the user's Configuration-tab values to /data/options.json
// (keys matching config.yaml's `options`/`schema`). apps/api/src/env.ts reads
// plain env vars, so this maps one to the other, then hands off to the
// existing production entry point unchanged.
"use strict";

const fs = require("fs");

const OPTIONS_PATH = "/data/options.json";

// option key (config.yaml) -> env var (apps/api/src/env.ts)
const ENV_MAP = {
  database_url: "DATABASE_URL",
  jwt_secret: "JWT_SECRET",
  jwt_expiry: "JWT_EXPIRY",
  bcrypt_salt_rounds: "BCRYPT_SALT_ROUNDS",
  llm_api_key: "LLM_API_KEY",
  llm_model: "LLM_MODEL",
  pairing_cache_ttl_seconds: "PAIRING_CACHE_TTL_SECONDS",
  redis_url: "REDIS_URL",
  embedding_api_url: "EMBEDDING_API_URL",
  embedding_api_key: "EMBEDDING_API_KEY",
  embedding_dim: "EMBEDDING_DIM",
};

const options = JSON.parse(fs.readFileSync(OPTIONS_PATH, "utf8"));

for (const [optionKey, envVar] of Object.entries(ENV_MAP)) {
  const value = options[optionKey];
  // Optional fields absent from options.json are left unset (env.ts falls
  // back to its own defaults / treats the signal as inactive).
  if (value !== undefined && value !== null && value !== "") {
    process.env[envVar] = String(value);
  }
}

process.env.NODE_ENV = "production";
process.env.HOST = "0.0.0.0";
process.env.PORT = process.env.PORT || "3000";

require("/app/apps/api/dist/index.js");
