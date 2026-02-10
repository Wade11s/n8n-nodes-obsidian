# Tasks: Redesign Obsidian Node Icon

## 1. Design Light Mode Icon

- [x] 1.1 Calculate polygon coordinates for 4-facet crystal "O"
- [x] 1.2 Create SVG structure with rounded square background
- [x] 1.3 Add top triangle facet (light purple #a78bfa)
- [x] 1.4 Add left side facet (light purple #a78bfa)
- [x] 1.5 Add right side facet (light purple #a78bfa)
- [x] 1.6 Add bottom triangle facet (dark purple #5b21b6)
- [x] 1.7 Write to `nodes/Obsidian/obsidian.svg`

## 2. Design Dark Mode Icon

- [x] 2.1 Copy light mode SVG structure
- [x] 2.2 Update background color to #a78bfa
- [x] 2.3 Update facet colors to #c4b5fd (light) and #7c3aed (dark)
- [x] 2.4 Update stroke/overlay colors if needed for dark theme
- [x] 2.5 Write to `nodes/Obsidian/obsidian.dark.svg`

## 3. Build and Verify

- [x] 3.1 Run `npm run build` to generate dist files
- [x] 3.2 Verify `dist/nodes/Obsidian/obsidian.svg` exists
- [x] 3.3 Verify `dist/nodes/Obsidian/obsidian.dark.svg` exists
- [x] 3.4 Open icons in browser/viewer to check rendering

## 4. Visual Testing

- [x] 4.1 View icon at multiple sizes (24px, 32px, 40px, 100px)
- [x] 4.2 Verify "O" shape is legible at small sizes
- [x] 4.3 Test visibility on light background
- [x] 4.4 Test visibility on dark background
- [x] 4.5 Compare with current icon for improvement

## Summary

**Files to Modify**:
- `nodes/Obsidian/obsidian.svg` - Light mode icon
- `nodes/Obsidian/obsidian.dark.svg` - Dark mode icon

**Files Generated (via build)**:
- `dist/nodes/Obsidian/obsidian.svg`
- `dist/nodes/Obsidian/obsidian.dark.svg`

**Design Specs**:
- 4 polygon facets in ring formation
- Transparent center = "O" negative space
- Light mode: #7c3aed background, #a78bfa/#5b21b6 facets
- Dark mode: #a78bfa background, #a78bfa/#7c3aed facets
- 100x100 viewBox, rounded square (rx=15)
