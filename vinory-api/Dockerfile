# syntax=docker/dockerfile:1
#
# Home Assistant Supervisor add-on wrapper.
#
# Builds on top of the already-published production image (../../Dockerfile,
# tagged ghcr.io/sebbalex/vinory-api) instead of duplicating that multi-stage
# build — this layer only adds what Supervisor needs: the required io.hass.*
# labels, and an entrypoint that turns Supervisor's /data/options.json into
# the env vars the app already expects.
#
# Build (from repo root — needs run.js in the build context):
#   docker buildx build --platform linux/arm64 \
#     -f homeassistant-addon/vinory-api/Dockerfile \
#     --build-arg VINORY_API_IMAGE=ghcr.io/sebbalex/vinory-api:1.0.0 \
#     --build-arg BUILD_VERSION=1.0.0 \
#     -t ghcr.io/sebbalex/aarch64-addon-vinory-api:1.0.0 .

ARG VINORY_API_IMAGE
FROM ${VINORY_API_IMAGE}

ARG BUILD_VERSION=dev
LABEL io.hass.name="Vinory API" \
      io.hass.description="Vinory wine cellar REST API (Fastify + Drizzle + PostgreSQL)" \
      io.hass.type="addon" \
      io.hass.version="${BUILD_VERSION}" \
      io.hass.arch="aarch64"

COPY homeassistant-addon/vinory-api/run.js /app/run.js

CMD ["node", "/app/run.js"]
