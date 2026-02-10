## 1. Test Infrastructure Setup

- [x] 1.1 Create `__tests__/integration/` directory structure
- [x] 1.2 Create `__tests__/integration/setup.ts` with test credentials and health check
- [x] 1.3 Create `__tests__/integration/helpers.ts` with vault cleanup utilities
- [x] 1.4 Update `jest.config.js` to include integration test pattern
- [x] 1.5 Add npm script `test:integration` for running integration tests

## 2. Note Operations Integration Tests

- [x] 2.1 Create `__tests__/integration/note.operations.test.ts`
- [x] 2.2 Test `handleGetNote` - get existing note from test vault
- [x] 2.3 Test `handleCreateNote` - create new note
- [x] 2.4 Test `handleCreateNote` with overwrite=true
- [x] 2.5 Test `handleCreateNote` with overwrite=false (should fail if exists)
- [x] 2.6 Test `handleUpdateNote` - replace note content
- [x] 2.7 Test `handlePatchNote` without targetHeading
- [x] 2.8 Test `handlePatchNote` with targetHeading
- [x] 2.9 Test `handleDeleteNote` - delete note and verify
- [x] 2.10 Test `handleCopyNote` - copy note to new location
- [x] 2.11 Test `handleAppendToNote` - append content to note

## 3. Vault Operations Integration Tests

- [x] 3.1 Create `__tests__/integration/vault.operations.test.ts`
- [x] 3.2 Test `handleListNotes` - list all notes in test vault
- [x] 3.3 Test `handleListNotes` with folder filter
- [x] 3.4 Test `handleSearchNotes` - search for notes
- [x] 3.5 Test `handleListTags` - list all tags
- [x] 3.6 Test `handleCreateFolder` - create new folder
- [x] 3.7 Test `handleCreateFolder` - create nested folders
- [x] 3.8 Test `handleDeleteFolder` - delete empty folder

## 4. Periodic Note Operations Integration Tests

- [x] 4.1 Create `__tests__/integration/periodic.operations.test.ts`
- [x] 4.2 Test `handleGetPeriodicNote` with specific date
- [x] 4.3 Test `handleGetPeriodicNote` without date (current date)
- [x] 4.4 Test `handleCreatePeriodicNote` with date
- [x] 4.5 Test `handleCreatePeriodicNote` without date

## 5. Command Operations Integration Tests

- [x] 5.1 Create `__tests__/integration/command.operations.test.ts`
- [x] 5.2 Test `handleListCommands` - list all available commands
- [x] 5.3 Test `handleExecuteCommand` with valid command ID

## 6. Test Verification

- [x] 6.1 Run all integration tests locally with Obsidian running
- [x] 6.2 Verify all tests pass
- [x] 6.3 Document test environment setup in README
- [x] 6.4 Verify test isolation (no cross-test contamination)
