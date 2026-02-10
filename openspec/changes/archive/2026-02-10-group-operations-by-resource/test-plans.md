# Test Plans: Group Operations by Resource

## Test Plan 1: Resource Selector UI

**Objective**: Verify Resource dropdown displays correctly

**Steps**:
1. Add Obsidian node to workflow
2. Open node configuration
3. Verify first field is "Resource" dropdown
4. Click dropdown and verify 4 options:
   - Note
   - Vault
   - Periodic Note
   - Command

**Expected Result**:
- Resource selector is first field
- All 4 resources are listed
- Default selection is "Note"

---

## Test Plan 2: Conditional Operation Display

**Objective**: Verify operations change based on resource selection

**Steps**:
1. Select "Note" resource
2. Verify Operation dropdown shows: Get, Create, Update, Delete, Copy, Append
3. Select "Vault" resource
4. Verify Operation dropdown shows: List Notes
5. Select "Periodic Note" resource
6. Verify Operation dropdown shows: Get, Create
7. Select "Command" resource
8. Verify Operation dropdown shows: List Commands, Execute

**Expected Result**:
- Only operations relevant to selected resource are shown
- No operations from other resources appear

---

## Test Plan 3: Note Operations Functionality

**Objective**: Verify all Note operations work correctly

**Test Cases**:
- [ ] Resource: Note, Operation: Get → Get Note executes correctly
- [ ] Resource: Note, Operation: Create → Create Note executes correctly
- [ ] Resource: Note, Operation: Update → Update Note executes correctly
- [ ] Resource: Note, Operation: Delete → Delete Note executes correctly
- [ ] Resource: Note, Operation: Copy → Copy Note executes correctly
- [ ] Resource: Note, Operation: Append → Append to Note executes correctly

---

## Test Plan 4: Vault Operations Functionality

**Objective**: Verify Vault operations work correctly

**Test Cases**:
- [ ] Resource: Vault, Operation: List Notes → List Notes executes correctly

---

## Test Plan 5: Periodic Note Operations Functionality

**Objective**: Verify Periodic Note operations work correctly

**Test Cases**:
- [ ] Resource: Periodic Note, Operation: Get → Get Periodic Note executes correctly
- [ ] Resource: Periodic Note, Operation: Create → Create Periodic Note executes correctly

---

## Test Plan 6: Command Operations Functionality

**Objective**: Verify Command operations work correctly

**Test Cases**:
- [ ] Resource: Command, Operation: List Commands → List Commands executes correctly
- [ ] Resource: Command, Operation: Execute → Execute Command executes correctly

---

## Test Plan 7: Backward Compatibility

**Objective**: Verify backward compatibility layer works (if implemented)

**Steps**:
1. Import old workflow with legacy operation format
2. Verify node still executes correctly
3. Verify operation is mapped to correct resource.operation pair

**Expected Result**:
- Legacy workflows continue to work
- No manual reconfiguration needed

---

## Test Plan 8: Node Subtitle Display

**Objective**: Verify subtitle shows resource and operation

**Steps**:
1. Configure node with Resource: Note, Operation: Get
2. Collapse node
3. Verify subtitle shows "Note: Get"

**Expected Result**:
- Subtitle format is "Resource: Operation"

---

## Test Plan 9: Build and Lint

**Test Commands**:
```bash
npm run lint
npm run build
npm test
```

**Expected Result**:
- Lint passes with no errors
- Build succeeds
- Unit tests pass

---

## Test Plan 10: Integration Tests

**Prerequisites**:
- Obsidian running with Local REST API
- Integration test environment configured

**Test Commands**:
```bash
npm run test:integration
```

**Expected Result**:
- All integration tests pass
- Each resource.operation combination tested
