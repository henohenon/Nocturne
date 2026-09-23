# Business: Re-implement Hiding for Current YouTube DOM

## Why
- YouTube migrated class names (BEM → camelCase) and unified video items; badge detection and text hiding silently stopped working
- The extension's value (remove distracting recommendations, keep intentional listening) is lost when selectors drift unnoticed

## Goals
- Restore hiding on current YouTube
- Make the next DOM drift cheap to fix (one place to edit)

## Non-goals
- Detecting "music" videos (not exposed in current DOM)
- Popup / cooldown loophole fixes (separate task)
