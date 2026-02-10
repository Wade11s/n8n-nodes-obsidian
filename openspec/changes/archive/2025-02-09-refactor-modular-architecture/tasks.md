## 1. Setup Directory Structure

- [x] 1.1 Create `nodes/Obsidian/operations/` directory
- [x] 1.2 Create `nodes/Obsidian/helpers/` directory
- [x] 1.3 Create `nodes/Obsidian/__tests__/` directory

## 2. Extract Shared Utilities

- [x] 2.1 Create `helpers/types.ts` with shared type definitions (ObsidianCredentials, OperationHandler)
- [x] 2.2 Create `helpers/api.helper.ts` with `encodePath` function
- [x] 2.3 Create `helpers/api.helper.ts` with `makeRequest` function (refactored to accept credentials parameter)

## 3. Implement Note Operations

- [x] 3.1 Create `operations/note.operations.ts` with `handleGetNote` function
- [x] 3.2 Implement `handleCreateNote` with overwrite support
- [x] 3.3 Implement `handleUpdateNote` function
- [x] 3.4 Implement `handlePatchNote` with targetHeading support
- [x] 3.5 Implement `handleDeleteNote` function
- [x] 3.6 Implement `handleCopyNote` function (NEW - previously missing)
- [x] 3.7 Implement `handleAppendToNote` function (NEW - previously missing)

## 4. Implement Vault Operations

- [x] 4.1 Create `operations/vault.operations.ts` with `handleListNotes` function
- [x] 4.2 Implement `handleSearchNotes` with query and limit support
- [x] 4.3 Implement `handleListTags` function
- [x] 4.4 Implement `handleCreateFolder` function (NEW - previously missing)
- [x] 4.5 Implement `handleDeleteFolder` function (NEW - previously missing)

## 5. Implement Periodic Operations

- [x] 5.1 Create `operations/periodic.operations.ts` with `handleGetPeriodicNote` function
- [x] 5.2 Implement `handleCreatePeriodicNote` function

## 6. Implement Command Operations

- [x] 6.1 Create `operations/command.operations.ts` with `handleListCommands` function
- [x] 6.2 Implement `handleExecuteCommand` function

## 7. Create Operation Registry

- [x] 7.1 Create `operations/index.ts` with operation registry mapping operation names to handlers
- [x] 7.2 Export all operation handlers from `operations/index.ts`

## 8. Refactor Main Node File

- [x] 8.1 Update `Obsidian.node.ts` to import types from helpers
- [x] 8.2 Replace helper closures with imports from helpers/api.helper
- [x] 8.3 Replace switch statement with operation registry lookup
- [x] 8.4 Remove all embedded operation handler closures (now imported from operations/)
- [x] 8.5 Verify all 16 operations are properly registered and routed

## 9. Add UI Parameters for Missing Operations

- [x] 9.1 Add `sourcePath` parameter for `copyNote` operation in node description
- [x] 9.2 Add `destinationPath` parameter for `copyNote` operation
- [x] 9.3 Verify `appendToNote` has required parameters (path, content)
- [x] 9.4 Verify `createFolder` and `deleteFolder` have folder path parameter

## 10. Testing

- [x] 10.1 Create `__tests__/helpers/api.helper.test.ts` with tests for `encodePath`
- [x] 10.2 Create tests for `makeRequest` with mocked HTTP calls
- [x] 10.3 Create `__tests__/operations/note.operations.test.ts` with tests for each note operation
- [x] 10.4 Create `__tests__/operations/vault.operations.test.ts` with tests for vault operations
- [x] 10.5 Create `__tests__/operations/periodic.operations.test.ts` with tests for periodic operations
- [x] 10.6 Create `__tests__/operations/command.operations.test.ts` with tests for command operations
- [x] 10.7 Update `jest.config.js` to include `nodes/**/__tests__/*.test.ts` pattern

## 11. Verification

- [x] 11.1 Run `npm run build` and verify no TypeScript errors
- [x] 11.2 Run `npm run lint` and verify no linting errors
- [x] 11.3 Run `npm test` and verify all tests pass
- [x] 11.4 Verify dist output contains all new files
- [x] 11.5 Manually verify each of the 16 operations has correct UI parameters

## 12. Documentation

- [x] 12.1 Update README.md with new file structure overview (optional)
- [x] 12.2 Add JSDoc comments to all exported functions
- [x] 12.3 Verify all new operations have proper descriptions in node metadata
