# Vinory Embedding

CLIP ViT-B/32 embedding service (fastembed/ONNX, CPU-only) that powers the
Vinory API's **visual scan signal** and the meal-pairing semantic layer.

## Setup

1. Install and start this add-on. First boot loads the bundled models
   (no network needed) — allow ~20 s before the first request.
2. Optionally set an **API Key** in Configuration; anything on your network
   can use the service otherwise.
3. In the **Vinory API** add-on configuration set:
   - `embedding_api_url`: `http://<home-assistant-ip>:8801`
   - `embedding_api_key`: the same key, if you set one
   - `embedding_dim`: `512` (default)
4. Restart the Vinory API add-on and check its log for
   `visual signal: embedding service enabled`.

## One-time catalog index

The visual signal searches precomputed vectors of the catalog's label
images. Populate them once (and after catalog re-imports) by running, from
the repo:

    yarn embed:labels

with `EMBEDDING_API_URL` pointing at this service (or at the same image run
locally on a faster machine — same model, same vectors).

## Endpoint

- `POST /` with `{ "imageBase64", "mimeType" }` or `{ "text" }` →
  `{ "embedding": [512 floats] }` (L2-normalised)
- `GET /health` — liveness, never authenticated
