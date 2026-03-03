# Technical Architecture: Chrome Extension Design

## How to Build

### Architecture Overview
Content script-based Chrome extension using CSS injection pattern.

### Component Structure

#### Manifest V3 Configuration
- **manifest.json**: Extension metadata and permissions
- **Permissions**: `activeTab` or host permission for `*://*.youtube.com/*`
- **Content scripts**: Inject into YouTube pages

#### Content Script Strategy
- **Entry point**: Single TypeScript content script file
- **Injection timing**: `document_idle` or `document_end`
- **Execution**: Runs on all youtube.com pages
- **Responsibility**: CSS injection and DOM manipulation
- **Language**: TypeScript for type safety and maintainability

### CSS Injection Approach

#### Method Selection
**Decision**: Use `<style>` tag injection over inline styles
- **Rationale**:
  - Single injection point
  - Easy to maintain selectors
  - Lower overhead than per-element styling
  - Can use CSS specificity for targeting

#### Target Selectors
Primary targets (subject to YouTube DOM inspection):
- `ytd-thumbnail` - Video thumbnails
- `video` - Video elements
- `.ytp-play-button` - Play buttons
- `#movie_player` - Main player

#### Blocking Technique
```css
pointer-events: none;
cursor: not-allowed;
user-select: none;
```

Optional visual feedback:
```css
opacity: 0.5;
filter: grayscale(50%);
```

### Extension File Structure
```
/
├── src/
│   └── content.ts
├── dist/
│   ├── manifest.json
│   └── content.js (compiled)
├── manifest.json
├── package.json
├── tsconfig.json
└── vite.config.ts (or webpack/esbuild config)
```

### Technical Decisions

#### TD-1: Language
- **Choice**: TypeScript
- **Reason**: Type safety, better IDE support, maintainability
- **Build**: Vite or esbuild for fast compilation

#### TD-2: Manifest Version
- **Choice**: Manifest V3
- **Reason**: Current Chrome standard, future-proof

#### TD-3: Script Injection
- **Choice**: Declarative content script in manifest
- **Reason**: Simplicity, automatic injection, no background script needed

#### TD-4: CSS Management
- **Choice**: Embedded CSS in content script
- **Reason**: Single file simplicity for Phase 1
- **Alternative**: Separate CSS file loaded via manifest (future enhancement)

#### TD-5: Selector Strategy
- **Choice**: YouTube component selectors (ytd-*)
- **Reason**: More stable than deeply nested DOM selectors
- **Fallback**: Multiple selector approaches for resilience

#### TD-6: Build Tool
- **Choice**: Vite
- **Reason**: Fast, modern, excellent TypeScript support, simple config
- **Alternative**: esbuild for ultra-minimal setup

### Error Handling
- Graceful failure if selectors not found
- No console errors exposed to user
- Silent fallback if YouTube DOM changes

### Performance Considerations
- Minimal DOM observation (avoid MutationObserver in Phase 1)
- Single style injection
- No event listeners (rely on CSS only)
- Lazy execution after DOM ready

### Security Considerations
- Minimal permissions (only youtube.com host)
- No data collection
- No external network requests
- No persistent storage
