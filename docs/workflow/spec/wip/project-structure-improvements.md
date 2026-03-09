# Functional Specification: Project Structure Improvements

## What to Build

### Core Changes
Refactor project structure and build system based on user feedback from initial deployment.

### Functional Requirements

#### FR-1: Project Structure Reorganization
- **Requirement**: Move source code under organized directory structure
- **Target**: Use `/src` directory for source code organization
- **Rationale**: Current root-level placement reduces discoverability
- **Acceptance**: Clean separation between source, build output, and config

#### FR-2: Build Output Completeness
- **Requirement**: Ensure dist/ contains all necessary files for Chrome extension
- **Current Issue**: Only content.js exists; manifest.json and icons missing
- **Required Files**:
  - manifest.json
  - icons/icon16.png
  - icons/icon48.png
  - icons/icon128.png
  - content.js (compiled)
- **Acceptance**: Extension loads without manual file placement

#### FR-3: Public Assets Management
- **Requirement**: Create public/ directory for static assets
- **Contents**: manifest.json, icons/
- **Build Process**: Copy public/ contents to dist/ during build
- **Acceptance**: `npm run build` produces complete dist/ folder

#### FR-4: Package Manager Migration
- **Requirement**: Switch from npm to bun
- **Rationale**: User preference for bun
- **Tasks**:
  - Remove package-lock.json
  - Add bun.lockb
  - Update documentation to use bun commands
- **Acceptance**: All commands work with `bun` prefix

#### FR-5: Naming Convention Update
- **Requirement**: Change "Blocker" terminology to "Overlay"
- **Scope**:
  - Code comments
  - Console logs
  - Extension name/description
  - Variable names where applicable
- **Rationale**: Better reflects functionality
- **Acceptance**: No "Blocker" references remain in user-facing content

#### FR-6: CSS Separation
- **Requirement**: Extract inline CSS from content.ts to separate file
- **Rationale**: Improve readability and maintainability
- **Approach**: Create src/styles/overlay.css
- **Implementation**: Import CSS as string in TypeScript
- **Acceptance**: CSS managed in dedicated file, imported into content.ts

### Project Structure (Target)
```
/
├── src/
│   ├── content.ts
│   └── styles/
│       └── overlay.css
├── public/
│   ├── manifest.json
│   └── icons/
│       ├── icon16.png
│       ├── icon48.png
│       └── icon128.png
├── dist/              # Build output
│   ├── content.js
│   ├── manifest.json
│   └── icons/
├── docs/
├── package.json
├── bun.lockb
├── tsconfig.json
└── vite.config.ts
```

### Non-Functional Requirements

#### NFR-1: Build Automation
- Single command builds complete extension
- No manual file copying required

#### NFR-2: Development Experience
- Hot reload during development (where applicable)
- Clear build output structure

#### NFR-3: Maintainability
- Separation of concerns (code, styles, assets)
- Clear directory purpose

### Out of Scope
- Functional behavior changes to blocking logic
- New features beyond structure improvements
- Icon design/creation (placeholders acceptable)
