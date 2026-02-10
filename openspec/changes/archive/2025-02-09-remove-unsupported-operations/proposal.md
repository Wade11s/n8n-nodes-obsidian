# Proposal: Remove Unsupported Operations

## Overview
Remove 5 operations that are not supported by the Obsidian Local REST API v3.4.3, keeping only the 11 verified working operations.

## Background
During integration testing, we discovered that several operations implemented in the Obsidian node are not actually supported by the Obsidian Local REST API:

1. **listTags** - The `/tags/` endpoint returns 404
2. **createFolder** - The MKCOL HTTP method returns 404
3. **deleteFolder** - Depends on createFolder (also unsupported)
4. **patchNote** - The PATCH method returns 404
5. **searchNotes** - Requires special Content-Type header (`application/vnd.olrapi.search+json`)

## Problem Statement
Keeping unsupported operations in the codebase creates several issues:

- **User confusion**: Users can select operations that will fail at runtime
- **Maintenance burden**: Dead code that must be maintained but never works
- **Test complexity**: 13 skipped tests cluttering the test suite
- **Documentation mismatch**: Features listed but not functional

## Proposed Solution
Remove the 5 unsupported operations entirely from the codebase:

### Operations to Remove
| Operation | Handler | Reason |
|-----------|---------|--------|
| `listTags` | `handleListTags` | `/tags/` endpoint returns 404 |
| `createFolder` | `handleCreateFolder` | MKCOL method returns 404 |
| `deleteFolder` | `handleDeleteFolder` | Depends on unsupported createFolder |
| `patchNote` | `handlePatchNote` | PATCH method returns 404 |
| `searchNotes` | `handleSearchNotes` | Requires non-standard Content-Type header |

### Operations to Keep (11 total)
| Resource | Operations |
|----------|------------|
| Note | get, create, update, delete, append, copy |
| Vault | list |
| Command | list, execute |

## Scope
- **In scope**:
  - Remove operation handlers from `operations/` files
  - Remove operation options from node description
  - Remove integration tests for unsupported operations
  - Update documentation

- **Out of scope**:
  - Adding new operations
  - Changing API of supported operations
  - Re-implementation of search with special Content-Type (can be added later if needed)

## Success Criteria
1. All 5 unsupported operations removed from node description
2. Corresponding handlers removed from operation files
3. All integration tests pass (no skipped tests)
4. Build succeeds with no errors
5. Node only exposes 11 working operations

## Alternatives Considered
### Option A: Keep operations with better error messages
- **Pros**: Preserves API surface, might work in future Obsidian versions
- **Cons**: Dead code, ongoing maintenance burden, confusing for users
- **Decision**: Rejected in favor of removal

### Option B: Keep search with Content-Type fix
- **Pros**: Adds useful search functionality
- **Cons**: Requires special header handling not consistent with other operations
- **Decision**: Can be added later as a separate enhancement

## Timeline
- Implementation: ~30 minutes
- Testing: ~10 minutes
- Total: ~40 minutes

## Risks
- **Low risk**: Removing unused code cannot break existing workflows that work
- **Potential issue**: If users have workflows using these operations, they will need to update
  - Mitigation: These operations never worked, so no working workflows will break
