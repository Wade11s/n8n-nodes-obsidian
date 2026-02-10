## Why

The n8n Obsidian node currently has minimal test coverage (only 7 tests for `encodePath`). All operation handlers (17 functions across 4 modules) lack tests, making regressions likely during future changes. Integration tests against a real Obsidian instance will validate the complete request/response cycle and ensure compatibility with the Obsidian Local REST API.

## What Changes

- Add integration test suite using real HTTP calls to Obsidian Local REST API
- Create test helpers for vault cleanup and setup
- Test all 17 operation handlers with real API calls
- Configure tests to use dedicated "test" vault with fixed Bearer token
- Add Jest setup/teardown for test isolation

## Capabilities

### New Capabilities
- `integration-testing`: Integration test infrastructure and test cases for all Obsidian operations

### Modified Capabilities
- None (this is a testing-only change, no spec-level behavior changes)

## Impact

- **Test infrastructure**: New `__tests__/integration/` directory with test suites
- **Dependencies**: No new runtime dependencies; may add dev dependencies for test utilities
- **CI/CD**: Tests require running Obsidian instance with Local REST API plugin
- **Developer workflow**: Tests must be run against local Obsidian instance
