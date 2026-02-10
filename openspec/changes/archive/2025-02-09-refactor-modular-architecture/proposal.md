## Why

The current n8n Obsidian node is a single 654-line file that violates single responsibility principles and has become difficult to maintain. Four UI-defined operations (`appendToNote`, `copyNote`, `createFolder`, `deleteFolder`) have no implementation, causing runtime errors. Zero test coverage makes changes risky. Modularizing the architecture will improve maintainability, enable testing, and fix the missing implementations.

## What Changes

- **Split monolithic node** (`Obsidian.node.ts` 654 lines) into focused modules by operation domain
- **Implement 4 missing operations** that currently exist in UI but throw "Unknown operation" errors:
  - `appendToNote`: Append content to end of existing note
  - `copyNote`: Copy a note to new location
  - `createFolder`: Create new folder in vault
  - `deleteFolder`: Delete folder from vault
- **Extract shared utilities** (HTTP client, path encoding, types) into reusable helpers
- **Add operation registration pattern** replacing large switch statement with operation registry
- **Establish test infrastructure** with unit tests for operations and helpers
- **Maintain backward compatibility**: All existing operation names, parameters, and return formats preserved

## Capabilities

### New Capabilities
- `note-operations`: CRUD operations on Obsidian notes (get, create, update, patch, delete, copy, append)
- `vault-operations`: Vault-level operations (list notes, search, list tags, create folder, delete folder)
- `periodic-operations`: Periodic note management (daily, weekly, monthly, quarterly, yearly)
- `command-operations`: Obsidian command execution (list, execute)

### Modified Capabilities
- None (this is a pure refactoring with no spec-level behavior changes)

## Impact

- **Code structure**: New directory hierarchy under `nodes/Obsidian/`
- **Build output**: No changes to dist structure or package exports
- **User-facing behavior**: No breaking changes; 4 previously broken operations will work
- **Dependencies**: No new runtime dependencies
- **Testing**: New dev dependencies for test infrastructure (jest already configured)
