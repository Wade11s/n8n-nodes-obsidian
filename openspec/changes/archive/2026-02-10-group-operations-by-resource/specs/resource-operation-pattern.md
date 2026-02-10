# Delta Spec: Resource-Operation Pattern

## Related Capabilities
- Note Operations
- Vault Operations
- Periodic Operations
- Command Operations

## Changes

### ADDED: Resource-Level Organization

**Requirement**: Operations SHALL be organized by resource type

**Before**:
- Single `operation` field with 11 flat options
- No grouping mechanism

**After**:
- Two-level selection: `resource` → `operation`
- Operations grouped by target entity

### MODIFIED: Operation Access Pattern

**Changes by Resource**:

#### Note Resource (6 operations)
| Old Operation Value | New Resource | New Operation |
|---------------------|--------------|---------------|
| `getNote` | `note` | `get` |
| `createNote` | `note` | `create` |
| `updateNote` | `note` | `update` |
| `deleteNote` | `note` | `delete` |
| `copyNote` | `note` | `copy` |
| `appendToNote` | `note` | `append` |

#### Vault Resource (1 operation)
| Old Operation Value | New Resource | New Operation |
|---------------------|--------------|---------------|
| `listNotes` | `vault` | `listNotes` |

#### Periodic Note Resource (2 operations)
| Old Operation Value | New Resource | New Operation |
|---------------------|--------------|---------------|
| `getPeriodicNote` | `periodicNote` | `get` |
| `createPeriodicNote` | `periodicNote` | `create` |

#### Command Resource (2 operations)
| Old Operation Value | New Resource | New Operation |
|---------------------|--------------|---------------|
| `listCommands` | `command` | `listCommands` |
| `executeCommand` | `command` | `execute` |

### ADDED: Conditional Display

**Requirement**: Operation field SHALL only show relevant operations based on selected resource

**Implementation**:
```typescript
displayOptions: {
  show: {
    resource: ['note'] // or 'vault', 'periodicNote', 'command'
  }
}
```

### MODIFIED: Node Subtitle

**Before**: `'={{$parameter["operation"]}}'`
**After**: `'={{$parameter["resource"] + ": " + $parameter["operation"]}}'`

## UI Impact

### Node Configuration Panel
```
Before:                    After:
┌──────────────────┐      ┌──────────────────┐
│ Operation  [▼]   │      │ Resource   [▼]   │
│ ├─ Append to Note│      │ ├─ Note          │
│ ├─ Copy Note     │      │ ├─ Vault         │
│ ├─ Create Note   │      │ ├─ Periodic Note │
│ ├─ ... (11 items)│      │ └─ Command       │
└──────────────────┘      ├──────────────────┤
                          │ Operation  [▼]   │
                          │ ├─ Get           │
                          │ ├─ Create        │
                          │ ├─ ... (6 items) │
                          └──────────────────┘
```

## Migration Path

### Breaking Change
- Workflow JSON structure changes
- Old: `{ operation: "getNote" }`
- New: `{ resource: "note", operation: "get" }`

### Backward Compatibility
Recommended: Add mapping layer in execute() to handle legacy operation values
