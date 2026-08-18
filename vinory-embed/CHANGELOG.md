# Changelog

## 1.0.1

- Shrink the service image 959 MB → 737 MB (linux/arm64). Multi-stage build so
  pip and the build toolchain never reach the runtime, plus a site-packages
  prune (pip/setuptools/wheel, `hf_xet`, bytecode, vendored test suites):
  959 → 908 MB with bit-identical vectors. The CLIP vision tower is then
  narrowed to fp16 at build time (352 → 181 MB): 908 → 737 MB.
- No re-embed required. The fp16 vision tower scores 0.9999926 self-cosine
  against fp32 and an fp16 query still ranks the correct fp32 catalog vector
  first, so existing `wine_label_embeddings` stay valid. The text tower is
  unchanged and its vectors are bit-identical. Request latency is unchanged.

## 1.0.0

- Initial release: CLIP ViT-B/32 image + text embedding service
  (fastembed/ONNX, CPU-only), models baked into the image, optional bearer
  auth, `/health` endpoint. Serves the Vinory API `visual` scan signal and
  the meal-pairing semantic resolver.
