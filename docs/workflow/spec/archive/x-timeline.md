# Spec: X Timeline Seal

## Sealed
- Home (`/home`, both tabs) and Explore (`/explore…`): the main column is replaced by a gray sealed panel with the mark
- Right sidebar (trends, who to follow, etc.): hidden on every page

## Free
- Everything else: notifications, messages, profiles, individual posts (anyone's), search, bookmarks, settings
- Compose: the post dialog opens over the page; routes like `/compose/…` keep the underlying page's state (a dialog over the home timeline keeps it sealed)

## State
- Same shared record as YouTube: manual disable, night schedule, night seal apply to both sites

## Acceptance
- Visiting /home or /explore shows the panel, including after in-app navigation (no reload)
- Other routes show normally; sidebar never shows
- Disable / night mode lifts the seal on X too
