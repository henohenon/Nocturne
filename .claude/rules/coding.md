# Coding Conventions

Conventions derived from the existing codebase. Follow these when reading or writing any source file.

## TypeScript

- **Constants**: `SCREAMING_SNAKE_CASE` for module-level constants; group them at the top of the file
- **Functions/variables**: `camelCase`
- **Return types**: explicit on all functions (e.g., `: void`, `: boolean`)
- **JSDoc**: one-line `/** description */` above every function
- **Error handling**: `try/catch` for all DOM operations that can throw; log errors with `console.error`
- **Guard clauses**: use early returns for idempotency checks before doing work

## CSS

- **Selectors**: YouTube custom element names (`ytd-*`, `yt-*`, `ytm-*`) and their view-model classes; no generic HTML tags as targets
- **Visibility pattern**: default = hidden/blocked; allowlist via `:not(:has(...))` in CSS, written once (nesting) — no JS-side judgment
- **Exception — route level**: when the decision depends on the URL (CSS cannot see it), JS only sets a flag attribute on `<html>`; the stylesheet still does all hiding under that flag (see X)
- **`!important`**: required throughout — content scripts must override YouTube's inline styles
- **Grouping**: related selectors on separate lines; section header comment before each group

## Logging

All `console.*` calls use the `[Nocturne]` prefix:
```ts
console.log('[Nocturne] ...');
console.error('[Nocturne] ...');
```

## Style Injection

Inject CSS via a `<style>` tag with a fixed `id`. Check for the id before inserting to avoid duplicates:
```ts
if (document.getElementById('nocturne-styles')) return;
```

## File Structure

- One concern per file: per-site content script (logic) + per-site stylesheet (styles); shared lifecycle in `overlay.ts`
- Configuration constants in `config.ts` (site-specific ones at the top of that site's script)
- WXT entrypoints: runtime code (`chrome.*`, DOM) only inside `main()` — the module is evaluated at build time
- No splitting into multiple files unless the file becomes unmanageable
