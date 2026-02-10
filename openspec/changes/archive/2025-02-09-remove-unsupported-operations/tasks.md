# Tasks: Remove Unsupported Operations

## Phase 1: Remove Operation Handlers

### Task 1: Remove handlePatchNote
- [x] Remove `handlePatchNote` from `operations/note.operations.ts`
- [x] Remove function export
- [x] Verify no other code references this handler

### Task 2: Remove Unsupported Vault Operations
- [x] Remove `handleSearchNotes` from `operations/vault.operations.ts`
- [x] Remove `handleListTags` from `operations/vault.operations.ts`
- [x] Remove `handleCreateFolder` from `operations/vault.operations.ts`
- [x] Remove `handleDeleteFolder` from `operations/vault.operations.ts`
- [x] Verify no other code references these handlers

## Phase 2: Update Node Description

### Task 3: Remove Operation Options
- [x] Open `nodes/Obsidian/Obsidian.node.ts`
- [x] Locate `operation.options` array
- [x] Remove option with value `patchNote`
- [x] Remove option with value `searchNotes`
- [x] Remove option with value `listTags`
- [x] Remove option with value `createFolder`
- [x] Remove option with value `deleteFolder`
- [x] Verify only 9 operations remain

### Task 4: Update Operation Descriptions
- [x] Review `operation.displayOptions` for removed operations
- [x] Remove any parameter sets referencing removed operations
- [x] Clean up any orphaned display descriptions

## Phase 3: Update Operation Registry

### Task 5: Update imports
- [x] Open `nodes/Obsidian/operations/index.ts`
- [x] Remove import of `handlePatchNote`
- [x] Remove import of `handleSearchNotes`
- [x] Remove import of `handleListTags`
- [x] Remove import of `handleCreateFolder`
- [x] Remove import of `handleDeleteFolder`

### Task 6: Update exports object
- [x] Remove `patchNote: handlePatchNote` from operations object
- [x] Remove `searchNotes: handleSearchNotes` from operations object
- [x] Remove `listTags: handleListTags` from operations object
- [x] Remove `createFolder: handleCreateFolder` from operations object
- [x] Remove `deleteFolder: handleDeleteFolder` from operations object
- [x] Verify operations object has exactly 9 entries

## Phase 4: Clean Up Tests

### Task 7: Remove Skipped Test Suites
- [x] Remove `describe('handlePatchNote', ...)` from `note.operations.test.ts`
- [x] Remove `describe('handleSearchNotes', ...)` from `vault.operations.test.ts`
- [x] Remove `describe('handleListTags', ...)` from `vault.operations.test.ts`
- [x] Remove `describe('handleCreateFolder', ...)` from `vault.operations.test.ts`
- [x] Remove `describe('handleDeleteFolder', ...)` from `vault.operations.test.ts`

### Task 8: Update Imports in Tests
- [x] Verify no imports reference removed handlers
- [x] Clean up any unused imports in test files

### Task 9: Remove Unused Helper Imports
- [x] Check if `handlePatchNote` was imported in any test files
- [x] Check if removed vault handlers were imported
- [x] Remove unused imports

## Phase 5: Verification

### Task 10: Build Verification
- [x] Run `npm run build`
- [x] Verify no TypeScript errors
- [x] Verify build output contains only 9 operations
- [x] Check console for no warnings about missing exports

### Task 11: Test Verification
- [x] Run `npm test`
- [x] Verify all 9 remaining tests pass
- [x] Verify 0 skipped tests (previously 13)
- [x] Verify no test failures

### Task 12: Manual Verification
- [x] Count operations in node description (should be 9)
- [x] List remaining operations:
  - Note: get, create, update, delete, append, copy (6)
  - Vault: list (1)
  - Command: list, execute (2)
  - Periodic: get, create (2) - require plugin
- [x] Total: 11 operations (9 working + 2 periodic with plugin)

## Summary

**Operations Removed (5)**:
1. patchNote
2. searchNotes
3. listTags
4. createFolder
5. deleteFolder

**Operations Remaining (9)**:
1. getNote
2. createNote
3. updateNote
4. deleteNote
5. copyNote
6. appendToNote
7. listNotes
8. listCommands
9. executeCommand

**Expected Test Results**:
- Before: 11 passed, 13 skipped
- After: 9 passed, 0 skipped
