# Tasks: Group Operations by Resource

## 1. Create Resource Description Files

- [x] 1.1 Create `nodes/Obsidian/resources/note.ts`
  - Define Note resource with 6 operations
  - Use `displayOptions: { show: { resource: ['note'] } }`
  - Operation values: `get`, `create`, `update`, `delete`, `copy`, `append`

- [x] 1.2 Create `nodes/Obsidian/resources/vault.ts`
  - Define Vault resource with 1 operation
  - Operation value: `listNotes`

- [x] 1.3 Create `nodes/Obsidian/resources/periodic.ts`
  - Define Periodic Note resource with 2 operations
  - Include `period` and `date` parameters
  - Operation values: `get`, `create`

- [x] 1.4 Create `nodes/Obsidian/resources/command.ts`
  - Define Command resource with 2 operations
  - Operation values: `listCommands`, `execute`

- [x] 1.5 Create `nodes/Obsidian/resources/index.ts`
  - Export all resource descriptions

## 2. Refactor Obsidian.node.ts

- [x] 2.1 Add Resource selector property
  - displayName: 'Resource'
  - name: 'resource'
  - type: 'options'
  - options: Note, Vault, Periodic Note, Command

- [x] 2.2 Replace flat operation options with resource imports
  - Remove current flat `operation` property
  - Import and spread resource descriptions

- [x] 2.3 Update subtitle expression
  - Current: `'={{$parameter["operation"]}}'`
  - New: `'={{$parameter["resource"] + ": " + $parameter["operation"]}}'`

- [x] 2.4 Refactor execute() method
  - Read `resource` and `operation` parameters
  - Create `resource.operation` handler key mapping
  - Route to existing operation handlers

- [x] 2.5 Add backward compatibility layer (optional but recommended)
  - If `resource` is empty, infer from legacy `operation` value
  - Map old operation names to new resource.operation pairs

## 3. Update Operation Handlers

- [x] 3.1 Update operations/index.ts
  - Export handlers with new naming if needed
  - Ensure all handlers are accessible

## 4. Update Tests

- [x] 4.1 Update integration tests
  - Tests call handlers directly, no changes needed
  - Handlers unchanged, only routing modified

- [x] 4.2 Update helper functions
  - No changes needed, handlers work the same way

## 5. Build and Verify

- [x] 5.1 Run `npm run build`
- [x] 5.2 Run `npm run lint` (4 pre-existing errors in test helpers)
- [x] 5.3 Run `npm test`
- [ ] 5.4 Run integration tests (if Obsidian is available)

## 6. Update Documentation

- [x] 6.1 Update README.md
  - Add Resource-Operation mapping table
  - Update usage examples
  - Add version history entry

- [x] 6.2 Update CHANGELOG.md (if exists)
  - No CHANGELOG.md file exists (documented in README instead)

## Task Summary

| Phase | Tasks | Est. Time |
|-------|-------|-----------|
| 1. Resource Files | 5 | ~45 min |
| 2. Refactor Node | 5 | ~60 min |
| 3. Handlers | 1 | ~15 min |
| 4. Tests | 2 | ~30 min |
| 5. Build/Verify | 4 | ~20 min |
| 6. Docs | 2 | ~20 min |
| **Total** | **19** | **~3 hours** |

## Files to Modify/Created

### Modified
- `nodes/Obsidian/Obsidian.node.ts`
- `nodes/Obsidian/operations/index.ts` (maybe)
- `nodes/Obsidian/__tests__/integration/*.test.ts`
- `README.md`

### Created
- `nodes/Obsidian/resources/note.ts`
- `nodes/Obsidian/resources/vault.ts`
- `nodes/Obsidian/resources/periodic.ts`
- `nodes/Obsidian/resources/command.ts`
- `nodes/Obsidian/resources/index.ts`
