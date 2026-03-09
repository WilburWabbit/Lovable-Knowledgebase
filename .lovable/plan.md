

## Problem

The `activeCollection` lookup in `Index.tsx` (line 24) only searches top-level collections: `collections.find((c) => c.id === activeCollectionId)`. Child collections nested under parents (e.g. APIs under "eBay") are never found, so the main content area stays on the welcome view.

Additionally, when a parent system (like "eBay") is selected, `CollectionOverview` shows its own endpoints (which is empty for parents) rather than listing its child collections.

## Plan

### 1. Add recursive collection finder in `Index.tsx`

Add a helper function `findCollection(collections, id)` that recursively searches through `children` arrays. Use it on line 24 instead of the flat `.find()`.

### 2. Handle parent vs leaf collections in main content

Update the rendering logic in `Index.tsx` (lines 84-112) to detect when `activeCollection` is a parent (has `children.length > 0`). For parents, render a new view (or adapt `CollectionOverview`) that lists the child collections as clickable cards, similar to how `WelcomeView` lists top-level collections.

For leaf collections (no children, has endpoints), continue showing `CollectionOverview` as-is.

### 3. Files to change

- **`src/pages/Index.tsx`**: Add `findCollection` helper; update conditional rendering for parent vs leaf collections. Show child collections as clickable cards when a parent is selected.

No database or schema changes needed.

