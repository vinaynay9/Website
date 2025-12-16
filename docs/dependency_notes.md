# Dependency Notes

- `autoprefixer` is pinned to `10.4.20` (no caret) to match the known published version and avoid Windows npm `ETARGET` errors introduced by the previously requested `^10.4.25`.
- `@headlessui/react` is pinned to `1.7.19` exactly so we keep the v1 API surface that works with the existing Tailwind + React stack and avoid npm resolution failures.

These exact version pins keep `npm install` deterministic on Windows environments without shifting the rest of the app architecture.

