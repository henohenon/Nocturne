# Functional Specification: Badge Exclusion and Enhanced Overlay

## What to Build

### Core Feature
Dynamic detection of badged videos and selective overlay application with enhanced hiding.

### Functional Requirements

#### FR-1: Badge Detection
- **Requirement**: Detect video elements containing `.yt-badge-shape__icon`
- **Scope**: Any video element with badge as child element
- **Target Elements**:
  - ytd-thumbnail
  - ytd-video-preview
  - ytd-compact-video-renderer
  - ytd-grid-video-renderer
  - ytd-rich-item-renderer
  - ytd-reel-video-renderer
- **Acceptance**: Videos with badges remain fully interactive

#### FR-2: Dynamic Element Monitoring
- **Requirement**: Monitor DOM for new/updated video elements
- **Method**: MutationObserver watching YouTube content area
- **Trigger**: Process elements when added or modified
- **Acceptance**: Badge detection works on dynamically loaded content

#### FR-3: Exclusion Class Application
- **Requirement**: Add specific class to exclude badged videos from overlay
- **Class Name**: `yt-overlay-excluded`
- **Application**: Applied to parent video element containing badge
- **CSS**: Override overlay styles for this class
- **Acceptance**: Excluded videos remain clickable and visually normal

#### FR-4: Enhanced Overlay Strength
- **Requirement**: Make overlaid content completely unrecognizable
- **Current**: opacity 0.6, grayscale 40%
- **Enhanced**:
  - Heavy blur
  - Strong grayscale/desaturation
  - Extreme opacity reduction
  - Optional: solid color overlay
- **Rationale**: User wants complete content hiding
- **Acceptance**: Original content is not identifiable

### Technical Requirements

#### TR-1: Performance
- MutationObserver should be throttled/debounced
- Batch process multiple elements
- Avoid redundant processing

#### TR-2: Reliability
- Handle YouTube's dynamic content loading
- Work across different YouTube pages (home, search, watch)
- Graceful handling if badge selector changes

#### TR-3: Maintainability
- Clear separation between detection and styling logic
- Configurable badge selector
- Easy to adjust overlay strength

### Process Flow
```
1. Page Load → Initialize MutationObserver
2. New Element Added → Check for badge icon
3. Badge Found?
   → Yes: Add 'yt-overlay-excluded' class
   → No: Element receives overlay styles
4. Repeat for all mutations
```

### CSS Strategy
```css
/* Default: Strong overlay */
.video-element {
  opacity: 0.1;
  filter: blur(20px) grayscale(100%);
}

/* Exception: Badge videos visible */
.video-element.yt-overlay-excluded {
  opacity: 1;
  filter: none;
  pointer-events: auto;
  cursor: pointer;
}
```

### Out of Scope
- Manual badge toggle UI
- Configurable overlay strength (hardcoded for now)
- Different badge types (only `.yt-badge-shape__icon`)
- Performance metrics/monitoring

## Acceptance Criteria
1. Videos with `.yt-badge-shape__icon` are fully visible and clickable
2. Videos without badges are completely hidden (unrecognizable)
3. Works on dynamically loaded content
4. No noticeable performance degradation
5. Console logs show badge detection (dev mode)
