## Context

The n8n Obsidian node currently consists of a single 654-line TypeScript file containing:
- Node description with 16 operation definitions and 25+ UI properties (334 lines)
- 12 operation handler closures embedded in the execute method (180 lines)
- A large switch statement routing operations (85 lines)
- Error handling and response formatting (55 lines)

Four operations (`appendToNote`, `copyNote`, `createFolder`, `deleteFolder`) are defined in the UI but have no implementation in the execute method, causing runtime errors.

All helper functions are closures inside `execute()`, making them impossible to unit test independently.

## Goals / Non-Goals

**Goals:**
- Split the monolithic file into focused modules by domain (note, vault, periodic, command)
- Implement the 4 missing operations that currently cause runtime errors
- Extract reusable utilities (HTTP client, path encoding, types) for testability
- Replace the large switch statement with a maintainable operation registry pattern
- Establish test infrastructure with unit tests for operations and helpers
- Maintain 100% backward compatibility for existing workflows

**Non-Goals:**
- No changes to the Obsidian Local REST API integration (same endpoints)
- No new n8n node features beyond the missing operation implementations
- No changes to credential configuration
- No performance optimization (focus is on maintainability)
- No breaking changes to operation names, parameters, or return formats

## Decisions

### 1. Module Organization by Domain
**Decision**: Organize operations into domain-based files: `note.operations.ts`, `vault.operations.ts`, `periodic.operations.ts`, `command.operations.ts`.

**Rationale**: Each domain has cohesive functionality. Notes have CRUD + copy/append; Vault has listing/search/tags/folders; Periodic and Command are independent subsystems. This aligns with n8n community node conventions and makes navigation intuitive.

**Alternative considered**: Organize by operation type (read vs write) - rejected because it splits related functionality and doesn't match how users think about Obsidian features.

### 2. Operation Registry Pattern
**Decision**: Replace switch statement with an operation registry mapping operation names to handler functions.

```typescript
// operations/index.ts
export const operations: Record<string, OperationHandler> = {
  getNote: handleGetNote,
  createNote: handleCreateNote,
  // ... etc
};
```

**Rationale**: Eliminates the 85-line switch, enables O(1) lookup, makes adding operations a single line change, and allows compile-time checking that all operations are handled.

### 3. Handler Function Signature
**Decision**: Standardize all handlers to:
```typescript
type OperationHandler = (
  this: IExecuteFunctions,
  itemIndex: number,
  credentials: ObsidianCredentials
) => Promise<IDataObject>;
```

**Rationale**: Provides consistent interface for all operations. `this` context gives access to n8n helpers. `itemIndex` enables parameter retrieval. `credentials` contains API configuration. Return type matches n8n's expected JSON structure.

### 4. Helper Extraction Strategy
**Decision**: Extract `makeRequest` and `encodePath` to `helpers/api.helper.ts`, types to `helpers/types.ts`.

**Rationale**: Makes utilities testable and reusable. Keeps operation files focused on business logic. `makeRequest` needs credentials and n8n's `httpRequest` helper - extracting it requires passing credentials as parameter rather than closure capture.

### 5. Test File Location
**Decision**: Co-locate tests in `__tests__/` directory within the node folder.

**Rationale**: Jest is already configured with `roots: ['<rootDir>/test']`, but n8n node convention typically places tests near source. Will update jest.config.js to include `nodes/**/__tests__/*.test.ts` pattern for better discoverability.

### 6. Missing Operation Implementations
**Decision**: Implement all 4 missing operations using Obsidian Local REST API endpoints:

| Operation | API Endpoint | Method |
|-----------|-------------|--------|
| appendToNote | `/vault/${path}` with append header | POST |
| copyNote | `/vault/${sourcePath}` with destination header | PUT |
| createFolder | `/vault/${folderPath}/` | MKCOL |
| deleteFolder | `/vault/${folderPath}/` | DELETE |

**Rationale**: These endpoints are documented in the Obsidian Local REST API. Using standard WebDAV-style methods (MKCOL for create folder) aligns with the API design.

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Regression in existing operations | Comprehensive test coverage before merge; manual verification of each operation; maintain exact same return formats |
| Import path issues after file move | Verify all relative imports; ensure `tsconfig.json` includes new paths; test build output |
| n8n node registration fails | Keep `Obsidian.node.ts` as entry point with same exports; verify `package.json` n8n.nodes path |
| Bundle size increase | Tree-shaking should eliminate unused code; monitor `dist/` output size |
| Merge conflicts with in-flight changes | Coordinate timing; this refactor should merge quickly once started |

### Trade-offs

**More files vs. Single file**: Accepting increased file count for better maintainability and testability. Modern editors handle multi-file navigation well.

**Registry lookup vs. Switch**: Slight overhead of object property lookup vs. switch statement - negligible performance impact for typical n8n workflow execution.

## Migration Plan

This is a code-only refactoring with no migration needed for users. Deployment steps:

1. **Pre-deployment**: Run full test suite, verify build passes
2. **Deployment**: Standard npm publish (no special steps)
3. **Rollback**: Revert to previous package version if issues detected

## Open Questions

1. Should we add integration tests that mock the Obsidian API, or rely on unit tests with mocked HTTP responses?
2. Do we need to update the README with the new file structure, or keep it user-focused?
