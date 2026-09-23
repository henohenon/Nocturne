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
- **`!important`**: required throughout — content scripts must override YouTube's inline styles
- **Grouping**: related selectors on separate lines; section header comment before each group

## Logging

All `console.*` calls use the `[YT Overlay]` prefix:
```ts
console.log('[YT Overlay] ...');
console.error('[YT Overlay] ...');
```

## Style Injection

Inject CSS via a `<style>` tag with a fixed `id`. Check for the id before inserting to avoid duplicates:
```ts
if (document.getElementById('yt-overlay-styles')) return;
```

## File Structure

- One concern per file: `content.ts` (logic), `overlay.css` (styles)
- Configuration constants at the top of `content.ts`
- WXT entrypoints: runtime code (`chrome.*`, DOM) only inside `main()` — the module is evaluated at build time
- No splitting into multiple files unless the file becomes unmanageable
