# Spec: Obsidian Brand Icon

## ADDED Requirements

### Requirement: Display recognizable Obsidian brand icon
The system SHALL display an icon that clearly represents the Obsidian brand using a crystalline "O" letter design.

#### Scenario: Icon appears in n8n node palette
- **WHEN** a user views the n8n node browser
- **THEN** the Obsidian node icon SHALL display a crystalline "O" shape
- **AND** the icon SHALL use Obsidian's purple color palette
- **AND** the design SHALL be consistent with Obsidian's crystal/stone aesthetic

### Requirement: Maintain icon clarity across themes
The icon SHALL be clearly visible in both light and dark n8n themes.

#### Scenario: Icon in light theme
- **WHEN** the n8n interface uses light theme
- **THEN** the icon SHALL use light mode color variant
- **AND** the "O" shape SHALL be clearly visible

#### Scenario: Icon in dark theme
- **WHEN** the n8n interface uses dark theme
- **THEN** the icon SHALL use dark mode color variant
- **AND** the "O" shape SHALL be clearly visible

### Requirement: Use minimal crystalline geometry
The icon SHALL use a simplified crystal design with 4 facets and 2 color shades.

#### Scenario: Icon structure
- **WHEN** the icon SVG is rendered
- **THEN** it SHALL consist of exactly 4 polygon facets
- **AND** facets SHALL be arranged in a ring formation
- **AND** the center SHALL be transparent (negative space forming the "O")

#### Scenario: Icon color palette
- **WHEN** the icon is displayed in light mode
- **THEN** it SHALL use 2 shades of purple (#7c3aed and #5b21b6)
- **AND** the top and side facets SHALL use the lighter shade
- **AND** the bottom facet SHALL use the darker shade for shadow

### Requirement: Maintain n8n container standards
The icon SHALL use n8n's standard rounded square container.

#### Scenario: Icon container
- **WHEN** the icon is displayed
- **THEN** it SHALL have a rounded square background (rx="15")
- **AND** the container SHALL be 100x100 viewBox
- **AND** the crystal "O" SHALL be centered within the container

### Requirement: Scale appropriately across sizes
The icon SHALL remain clearly recognizable at various display sizes.

#### Scenario: Small icon display
- **WHEN** the icon is displayed at 24x24 or 32x32 pixels
- **THEN** the "O" shape SHALL remain legible
- **AND** facet edges SHALL remain visible

#### Scenario: Large icon display
- **WHEN** the icon is displayed at 100x100 pixels or larger
- **THEN** the design SHALL not appear pixelated
- **AND** facet geometry SHALL remain crisp
