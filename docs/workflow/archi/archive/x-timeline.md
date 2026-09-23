# Archi: X Timeline Seal

## Decisions
- **One content script per site** — YouTube and X entrypoints share a small overlay module (inject/remove the style, follow shared state); each passes its own CSS
- **Route judgment in JS, look in CSS** — CSS cannot see the URL. The X script classifies the path and sets a flag attribute on `<html>`; the X stylesheet only acts under that flag. Exception to the "no JS-side judgment" rule, limited to route level
- **SPA navigation by polling** — X changes routes without reloads; checking the path on a short interval is simpler than hooking history from an isolated world
- **Anchors: `data-testid` columns** (`primaryColumn`, `sidebarColumn`) — locale-independent and stable across X redesigns so far

## Trade-offs
- Polling delay (sub-second) may flash the feed briefly after navigation — acceptable
- Hiding the whole sidebar also hides search filters on the search page — acceptable for simplicity

## Execution Record
- X's web app has been rebuilt (Tailwind classes, no `data-testid` on the logged-out page checked). Anchors switched to landmarks: `<main>` for the center column, `main ~ aside` for the right sidebar; old `data-testid` columns kept as a fallback
- YouTube entrypoint renamed to `youtube.content.ts`, stylesheet to `youtube.css`; lifecycle extracted to `overlay.ts`
- X script runs at `document_start` so the flag is set before the feed paints; route re-checked every 250 ms
- Copy generalized: popup note 「おすすめとタイムラインを封印中」, disable lead 「おすすめやタイムラインが」

## Verification
- `tsc --noEmit`, 12 unit tests (state + X routes, incl. compose inheriting the page state), `wxt build` pass; manifest has both content scripts and x.com / twitter.com host permissions
- Live x.com (logged out, 1280×800), stylesheet injected: right aside hidden; with the flag set, `<main>` children hidden and the gray panel with the mark shown
- Not verified: logged-in home / explore on the real extension (needs the user's session)

## Revision (after inspecting the logged-in page)
- The first version hid everything inside `<main>` and the whole sidebar — based on the logged-out page only. Logged-in users get the older app, where `<main>` wraps both columns, so the whole layout collapsed into one gray block
- Now targeted: on feed routes only the timeline list (`section[role=region]` in `primaryColumn`) becomes the panel; tabs, compose box, and column widths stay. Sidebar: the outermost element with 4+ children is the module list; every module except the search box and footer is hidden, the column stays
- Newer app: only timeline entries hidden on feed routes (logged-in view of the newer app not available to inspect)
- Verified in the user's logged-in Chrome (stylesheet injected; route flag from the installed extension): /home and /explore sealed with widths unchanged (primary 600, sidebar 350), sidebar shows only search + footer, /notifications untouched, flag follows in-app navigation
- A first load of /home froze the tab once (renderer unresponsive for 45 s+) while the extension was inactive (night); later loads were normal (DOMContentLoaded ~80–110 ms). Not reproduced, cause unknown
