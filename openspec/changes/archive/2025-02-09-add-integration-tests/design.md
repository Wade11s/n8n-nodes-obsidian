## Context

The n8n Obsidian node has been refactored into a modular architecture with 17 operation handlers across 4 modules. Currently, only `encodePath` has unit tests (7 tests). All operation handlers lack test coverage, creating risk of regressions when modifying API integration code.

Integration tests will validate the complete flow: parameter extraction → HTTP request → API response → return value formatting.

## Goals / Non-Goals

**Goals:**
- Create integration test suite using real HTTP calls to Obsidian Local REST API
- Test all 17 operation handlers with actual API interactions
- Establish test isolation through vault cleanup between tests
- Document test environment requirements and setup

**Non-Goals:**
- No unit tests with mocked HTTP (this is explicitly integration testing)
- No changes to production code behavior
- No CI/CD integration (tests require running Obsidian instance)
- No performance or load testing

## Decisions

### 1. Test Protocol and Endpoint
**Decision**: Use HTTP on port 27123 (not HTTPS on 27124)

**Rationale**: Simpler test setup without SSL certificate handling. The Obsidian Local REST API supports both protocols.

### 2. Vault Naming Convention
**Decision**: All paths must start with `test/`

**Rationale**: Isolates test data from user's actual notes. The vault "test" is provided by the user specifically for testing.

Example paths:
- `test/note.md`
- `test/folder/subfolder/note.md`

### 3. Authentication
**Decision**: Use Bearer token from environment variable

```typescript
const TEST_CREDENTIALS = {
  apiKey: process.env.OBSIDIAN_TEST_API_KEY || '',
  baseUrl: process.env.OBSIDIAN_TEST_BASE_URL || 'http://localhost:27123',
  ignoreSslIssues: false, // HTTP doesn't need SSL skip
};
```

Note: The actual implementation requires `OBSIDIAN_TEST_API_KEY` to be set.

### 4. Test Isolation Strategy
**Decision**: Clean up test vault before each test

**Rationale**: Ensures tests don't interfere with each other. Each test starts with a clean state.

```typescript
beforeEach(async () => {
  await cleanupTestVault();
});
```

Cleanup approach:
1. List all files in `test/` folder
2. Delete each note
3. Delete each folder (bottom-up)

### 5. Test File Organization
**Decision**: Co-locate integration tests in `__tests__/integration/`

```
__tests__/
├── integration/
│   ├── setup.ts              # Global setup, credential config
│   ├── helpers.ts            # Test utilities, cleanup functions
│   ├── note.operations.test.ts
│   ├── vault.operations.test.ts
│   ├── periodic.operations.test.ts
│   └── command.operations.test.ts
└── helpers/
    └── api.helper.test.ts    # Existing unit tests
```

### 6. Test Execution Order
**Decision**: Group tests by operation type, run independently

Each test file will:
1. Import the operation handlers directly
2. Create minimal mock for `IExecuteFunctions` (only `getNodeParameter`)
3. Use real `makeRequest` with TEST_CREDENTIALS
4. Assert on actual API responses

## Risks / Trade-offs

| Risk | Mitigation |
|------|------------|
| Obsidian not running | Add pre-test health check with clear error message |
| Test vault contains important data | Document that `test/` vault is ephemeral |
| Tests are slow (network calls) | Keep test count manageable (~30-40 tests total) |
| API rate limiting | Obsidian Local API is local, no rate limits expected |
| Test flakiness | Add retry logic for transient failures |

## Migration Plan

No migration needed - this is a new test addition. To run tests:

1. Start Obsidian with Local REST API plugin enabled
2. Set environment variable: `export OBSIDIAN_TEST_API_KEY=your-api-key`
3. Ensure HTTP server is running on port 27123
4. Create or verify "test" vault exists
5. Run: `npm run test:integration`

## Open Questions

1. Should we skip integration tests in CI by default (since they require Obsidian)?
2. Should we add a separate npm script `test:integration` vs using the main `test`?
