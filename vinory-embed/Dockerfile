# syntax=docker/dockerfile:1
#
# Home Assistant Supervisor add-on wrapper for the Vinory embedding service.
# Layers only the io.hass.* labels and the options.json -> env entrypoint on
# top of the already-built service image (services/embedding/Dockerfile) —
# same pattern as vinory-api's wrapper.
#
# Build (from repo root — needs run.py in the build context):
#   docker buildx build --platform linux/arm64 \
#     -f homeassistant-addon/vinory-embed/Dockerfile \
#     --build-arg VINORY_EMBED_IMAGE=ghcr.io/sebbalex/vinory-embed:1.0.0 \
#     --build-arg BUILD_VERSION=1.0.0 \
#     -t ghcr.io/sebbalex/aarch64-addon-vinory-embed:1.0.0 .

ARG VINORY_EMBED_IMAGE
FROM ${VINORY_EMBED_IMAGE}

ARG BUILD_VERSION=dev
LABEL io.hass.name="Vinory Embedding" \
      io.hass.description="CLIP label/text embedding service for the Vinory API" \
      io.hass.type="addon" \
      io.hass.version="${BUILD_VERSION}" \
      io.hass.arch="aarch64"

COPY homeassistant-addon/vinory-embed/run.py /srv/run.py

CMD ["python", "/srv/run.py"]
