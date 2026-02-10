# Design: Remove Unsupported Operations

## Architecture Changes

### Current Structure
```
nodes/Obsidian/
├── operations/
│   ├── note.operations.ts      (7 handlers: get, create, update, delete, copy, append, patch)
│   ├── vault.operations.ts     (5 handlers: list, search, listTags, createFolder, deleteFolder)
│   ├── command.operations.ts   (2 handlers: list, execute)
│   └── periodic.operations.ts  (2 handlers: get, create)
├── Obsidian.node.ts            (Main node with 17 operations)
└── helpers/
```

### Target Structure
```
nodes/Obsidian/
├── operations/
│   ├── note.operations.ts      (6 handlers: get, create, update, delete, copy, append)
│   ├── vault.operations.ts     (1 handler: list)
│   └── command.operations.ts   (2 handlers: list, execute)
├── Obsidian.node.ts            (Main node with 9 operations)
└── handlers/
```

## Implementation Details

### 1. Remove Operation Handlers

#### note.operations.ts
Remove:
```typescript
export const handlePatchNote: OperationHandler = ...
```

#### vault.operations.ts
Remove:
```typescript
export const handleSearchNotes: OperationHandler = ...
export const handleListTags: OperationHandler = ...
export const handleCreateFolder: OperationHandler = ...
export const handleDeleteFolder: OperationHandler = ...
```

### 2. Update Node Description

Remove from `operation.options` in `Obsidian.node.ts`:
- `listTags` operation
- `createFolder` operation
- `deleteFolder` operation
- `patchNote` operation
- `searchNotes` operation

Remove corresponding display names and descriptions.

### 3. Update Operation Registry

Remove from `operations/index.ts`:
```typescript
// Remove these imports and exports
export { handlePatchNote } from './note.operations';
export { handleSearchNotes, handleListTags, handleCreateFolder, handleDeleteFolder } from './vault.operations';

// Remove from operations object
patchNote: handlePatchNote,
searchNotes: handleSearchNotes,
listTags: handleListTags,
createFolder: handleCreateFolder,
deleteFolder: handleDeleteFolder,
```

### 4. Clean Up Tests

Remove test suites from `__tests__/integration/`:
- `describe('handlePatchNote', ...)` from note.operations.test.ts
- `describe('handleSearchNotes', ...)` from vault.operations.test.ts
- `describe('handleListTags', ...)` from vault.operations.test.ts
- `describe('handleCreateFolder', ...)` from vault.operations.test.ts
- `describe('handleDeleteFolder', ...)` from vault.operations.test.ts

## Data Flow

### Before (17 operations)
```
User Input → Node → Operation Registry → 17 Handlers → Obsidian API
                                  └─→ 5 Unsupported (404 errors)
                                  └─→ 12 Supported
```

### After (9 operations)
```
User Input → Node → Operation Registry → 9 Handlers → Obsidian API
                                  └─→ All supported
```

## Error Handling

No changes needed - all remaining operations have working error handling.

## Testing Strategy

1. **Build Verification**: Ensure TypeScript compiles without errors
2. **Integration Tests**: Run all tests - expect 9 passes, 0 skips
3. **Manual Verification**: Ensure node shows only 9 operations in n8n UI

## Migration Notes

No migration needed - these operations never worked, so no existing workflows will break.

## Rollback Plan

If needed, restore from git:
- Handlers can be restored from git history
- Node description can be restored
- Operation registry can be restored
