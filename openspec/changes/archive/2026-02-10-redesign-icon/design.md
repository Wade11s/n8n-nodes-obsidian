# Design: Redesign Obsidian Node Icon

## Context

**Current State**: The Obsidian node icon uses an abstract design with flowing curves on a purple rounded square background. While visually pleasing, it doesn't clearly communicate "Obsidian" brand identity.

**Target State**: A crystalline "O" letter that reflects Obsidian's crystal/stone aesthetic, making the node instantly recognizable in n8n's node palette.

**Constraints**:
- Must work in both light and dark n8n themes
- Must maintain rounded square container (n8n standard)
- Must scale well at icon sizes (typically 40x40 to 100x100 pixels)
- Simple SVG structure for maintainability

## Goals / Non-Goals

**Goals:**
- Create a distinctive "O" letter using crystal facet geometry
- Use Obsidian's purple color palette
- Keep design minimal (4 facets, 2 colors)
- Ensure clarity at small sizes
- Maintain visual consistency with n8n node ecosystem

**Non-Goals:**
- Complex 3D rendering or realistic crystal effects
- Gradients or advanced SVG filters
- Animated or interactive elements
- Deviating from n8n's rounded square container

## Decisions

### Geometry: 4-Facet Crystal Ring

**Decision**: Use 4 polygons arranged in a ring formation with transparent center

**Rationale**:
- Simplest crystalline form that reads as "O"
- 4 facets = minimal complexity while maintaining crystal aesthetic
- Negative space center = cleanest letter representation

**Alternatives Considered**:
- Hexagon with stroke "O" - Too geometric, less crystal-like
- 6-8 facet design - Unnecessarily complex for icon size
- Solid "O" with crystal texture - Loses negative space clarity

### Color Palette: Two Purple Shades

**Decision**:
- Light facets: `#7c3aed` (Obsidian purple)
- Shadow facets: `#5b21b6` (Darker purple)

**Rationale**:
- Matches Obsidian's brand colors
- 2 shades provide depth without complexity
- Works on both light and dark backgrounds

**Dark Mode Variant**:
- Light facets: `#a78bfa` (Lighter purple for contrast)
- Shadow facets: `#7c3aed` (Mid purple)

### Facet Layout

```
    ╱╲              ← Top triangle (light)
   ╱  ╲
  │    │           ← Left/Right side facets (light)
  │    │           ← Center transparent = the "O"
  │    │
   ╲  ╱
    ╲╱              ← Bottom triangle (dark/shadow)
```

**Polygon Structure**:
1. Top facet: Triangle with apex pointing up
2. Left facet: Quadrilateral (slight trapezoid)
3. Right facet: Quadrilateral (slight trapezoid)
4. Bottom facet: Triangle with apex pointing down

**Coordinates** (100x100 viewBox):
- Center: (50, 50)
- Outer radius: ~35px
- Inner radius (hole): ~20px

### Container: Rounded Square

**Decision**: Keep existing rounded square background (`rx="15"`) with purple fill

**Rationale**:
- Maintains n8n node icon consistency
- Provides good contrast for the crystal "O"
- Familiar visual language for n8n users

## Risks / Trade-offs

**Risk**: Icon may not read as "O" at very small sizes
- **Mitigation**: Test at 24x24, 32x32, 40x40 scales; adjust inner hole size if needed

**Trade-off**: Simplified crystal may feel less "premium" than Obsidian's actual branding
- **Mitigation**: Focus on clarity over complexity; iconography should be recognizable first

**Risk**: May not align with Obsidian's future brand evolution
- **Mitigation**: Design is intentionally minimal; easier to evolve than complex illustration

## Implementation Notes

**SVG Structure**:
```svg
<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <!-- Background container -->
  <rect width="100" height="100" rx="15" fill="#7c3aed"/>

  <!-- Crystal "O" - 4 facets -->
  <polygon points="..." fill="#a78bfa"/> <!-- top -->
  <polygon points="..." fill="#a78bfa"/> <!-- left -->
  <polygon points="..." fill="#a78bfa"/> <!-- right -->
  <polygon points="..." fill="#5b21b6"/> <!-- bottom shadow -->
</svg>
```

**File Updates**:
- `nodes/Obsidian/obsidian.svg` - Light mode
- `nodes/Obsidian/obsidian.dark.svg` - Dark mode
- Build will generate `dist/` versions automatically

## Open Questions

None - design is fully specified and ready for implementation
