# Spec: Vault Operations (Refactored)

## Overview
Vault operations for listing notes in the Obsidian vault.

## Operations

### listNotes
List all notes in the vault, optionally filtered by folder.

**Endpoint**: `GET /vault/{folder}/`

**Parameters**:
| Name | Type | Required | Description |
|------|------|----------|-------------|
| folder | string | No | Folder path to filter notes (empty for all notes) |

**Returns**: Object with `results` array containing note metadata

**Example**:
```typescript
const result = await handleListNotes.call(mockExec, 0, credentials);
// { results: [{ path: 'note1.md' }, { path: 'note2.md' }] }
```

**Error Handling**:
- Throws on HTTP errors from Obsidian API
- Returns empty results array if no notes found

## Removed Operations

The following operations are NOT supported by Obsidian Local REST API v3.4.3:

### searchNotes
- **Status**: REMOVED
- **Reason**: Requires `Content-Type: application/vnd.olrapi.search+json` header
- **API Response**: 400 Bad Request

### listTags
- **Status**: REMOVED
- **Reason**: `/tags/` endpoint returns 404
- **API Response**: 404 Not Found

### createFolder
- **Status**: REMOVED
- **Reason**: MKCOL HTTP method returns 404
- **API Response**: 404 Not Found

### deleteFolder
- **Status**: REMOVED
- **Reason**: Depends on unsupported createFolder
- **API Response**: 404 Not Found

## Implementation

```typescript
export const handleListNotes: OperationHandler = async function (
  this: IExecuteFunctions,
  itemIndex: number,
  credentials: ObsidianCredentials,
): Promise<IDataObject> {
  const folder = this.getNodeParameter('folder', itemIndex) as string;
  const encodedPath = encodePath(folder);

  const response = await makeRequest.call(this, credentials, {
    method: 'GET',
    url: `/vault/${encodedPath}/`,
  });

  return response as IDataObject;
};
```

## Dependencies
- `makeRequest` from `../helpers/api.helper`
- `encodePath` from `../helpers/api.helper`
- `OperationHandler` type from `../helpers/types`
