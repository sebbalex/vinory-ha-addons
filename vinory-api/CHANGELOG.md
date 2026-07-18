# Changelog

## 1.0.5

- feat(api): GET /api/wines/catalog/:wineId/vintages — per-wine vintage enumeration

## 1.0.4

- perf(api): two-phase catalog queries — KNN text search, HNSW-first embedding, pre-ranked meal
- perf(db): restore missing SQL-only DDL + GiST KNN trigram index (migration 0007)

## 1.0.3

- feat(api): NV catalog-vintage lookup via /vintages/nv sibling route
- feat(schemas): accept null vintage in WineSchema for non-vintage (NV) wines

## 1.0.2

- fix(docker): ship `@vinory/notification-engine` in the runtime image —
  1.0.1 crashed on start with `MODULE_NOT_FOUND` because the runner stage
  never copied the package's `dist/`, leaving its `node_modules` symlink
  dangling.

## 1.0.1

Backend changes shipped since 1.0.0 (previously published under the same
image tag, so Supervisor never offered them as an update):

- fix(mobile): validate login input on-device — no more raw "HTTP 400"
- feat(api): guided shelf-scan food mode uses the meal-search pipeline
- feat(api): catalog-wide meal recommendations — shop mode
- feat(pairing): semantic dish-to-category layer (embeddings + LLM proposal)
- feat(pairing-engine): generalize meal engine to score any wine source
- test(pairing-engine): cover meal-first LLM surface + api hygiene
- feat(api): GET /api/notifications (compute-on-read, premium-gated)
- feat(notification-engine): structure-aware high-risk check
- feat(api): expose structure and peak offsets on catalog candidates
- test(aging-engine): cover estimate-market-value and untested risk-score branches
- feat(aging-engine): expand grape vulnerability coverage (+26 varieties)
- feat(aging-engine): add getAgingAdvice with phase/urgency/advice codes
- feat(aging-engine): add toStructureInput helper
- fix: build problems and shrink image
- fix: immutable build breaking

## 1.0.0

- Initial Home Assistant Supervisor add-on, wrapping the existing
  `vinory-api` Docker image.
