# Spec: Note Operations (Refactored)

## Overview
Note operations for creating, reading, updating, and deleting notes in Obsidian.

## Operations

### getNote
Retrieve the content of a note by path.

**Endpoint**: `GET /vault/{path}`

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| path | string | Yes | File path relative to vault root |

**Returns**: Raw note content as string

**Example**:
```typescript
const content = await handleGetNote.call(mockExec, 0, credentials);
// "# My Note\n\nContent here"
```

### createNote
Create a new note with content.

**Endpoint**: `PUT /vault/{path}`

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| path | string | Yes | File path for new note |
| content | string | Yes | Note content |
| overwrite | boolean | No | Allow overwriting existing notes (default: false) |

**Returns**: Created note metadata

### updateNote
Replace entire note content.

**Endpoint**: `PUT /vault/{path}`

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| path | string | Yes | File path to update |
| content | string | Yes | New note content |

**Returns**: Updated note metadata

### deleteNote
Delete a note from the vault.

**Endpoint**: `DELETE /vault/{path}`

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| path | string | Yes | File path to delete |

**Returns**: Success confirmation object

### copyNote
Copy a note to a new location.

**Endpoint**: `PUT /vault/{sourcePath}` with `X-Destination` header

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| sourcePath | string | Yes | Source file path |
| destinationPath | string | Yes | Destination file path |

**Returns**: Success confirmation object

### appendToNote
Append content to an existing note.

**Endpoint**: `POST /vault/{path}` (with content in request body)

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| path | string | Yes | File path to append to |
| content | string | Yes | Content to append |

**Returns**: Success confirmation object

## Removed Operations

### patchNote
- **Status**: REMOVED
- **Reason**: PATCH method returns 404
- **API Response**: 404 Not Found
- **Previous behavior**: Attempted to insert content under headings

## Implementation Pattern

All note operations follow this pattern:
1. Extract parameters via `getNodeParameter`
2. Encode file paths using `encodePath`
3. Make HTTP request via `makeRequest`
4. Return typed response

## Dependencies
- `makeRequest` from `../helpers/api.helper`
- `encodePath` from `../helpers/api.helper`
- `OperationHandler` type from `../helpers/types`
