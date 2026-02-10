# Design: Group Operations by Resource

## Current State Analysis

### 现有结构
```typescript
// Obsidian.node.ts - 当前扁平结构
properties: [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    options: [
      { name: 'Append to Note', value: 'appendToNote', ... },
      { name: 'Copy Note', value: 'copyNote', ... },
      // ... 11 items total
    ]
  }
]
```

### 问题
- 11 个操作无分组，视觉混乱
- 用户需要阅读所有选项才能找到目标
- 不符合 n8n 标准节点设计模式

## Target State Design

### 目标结构
```typescript
// Obsidian.node.ts - 目标分组结构
properties: [
  {
    displayName: 'Resource',
    name: 'resource',
    type: 'options',
    options: [
      { name: 'Note', value: 'note' },
      { name: 'Vault', value: 'vault' },
      { name: 'Periodic Note', value: 'periodicNote' },
      { name: 'Command', value: 'command' },
    ]
  },
  // 各资源的 operation 定义（使用 displayOptions 控制显示）
  ...noteResourceDescription,
  ...vaultResourceDescription,
  ...periodicResourceDescription,
  ...commandResourceDescription,
]
```

## Resource Definitions

### 1. Note Resource
**文件**: `resources/note.ts`

```typescript
export const noteResourceDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: { show: { resource: ['note'] } },
    options: [
      { name: 'Get', value: 'get', action: 'Get a note' },
      { name: 'Create', value: 'create', action: 'Create a note' },
      { name: 'Update', value: 'update', action: 'Update a note' },
      { name: 'Delete', value: 'delete', action: 'Delete a note' },
      { name: 'Copy', value: 'copy', action: 'Copy a note' },
      { name: 'Append', value: 'append', action: 'Append to a note' },
    ]
  },
  // Note 特定的参数...
]
```

### 2. Vault Resource
**文件**: `resources/vault.ts`

```typescript
export const vaultResourceDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: { show: { resource: ['vault'] } },
    options: [
      { name: 'List Notes', value: 'listNotes', action: 'List notes' },
    ]
  },
  // Vault 特定的参数...
]
```

### 3. Periodic Note Resource
**文件**: `resources/periodic.ts`

```typescript
export const periodicResourceDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: { show: { resource: ['periodicNote'] } },
    options: [
      { name: 'Get', value: 'get', action: 'Get a periodic note' },
      { name: 'Create', value: 'create', action: 'Create a periodic note' },
    ]
  },
  // Periodic 特定的参数（period, date）...
]
```

### 4. Command Resource
**文件**: `resources/command.ts`

```typescript
export const commandResourceDescription: INodeProperties[] = [
  {
    displayName: 'Operation',
    name: 'operation',
    type: 'options',
    displayOptions: { show: { resource: ['command'] } },
    options: [
      { name: 'List Commands', value: 'listCommands', action: 'List commands' },
      { name: 'Execute', value: 'execute', action: 'Execute a command' },
    ]
  },
  // Command 特定的参数...
]
```

## Execute Function 修改

### Operation 路由映射

```typescript
// 新的路由逻辑
const resource = this.getNodeParameter('resource', 0) as string;
const operation = this.getNodeParameter('operation', 0) as string;

// 组合 resource + operation 确定执行哪个 handler
const handlerKey = `${resource}.${operation}`;

const handlers: Record<string, OperationHandler> = {
  'note.get': handleGetNote,
  'note.create': handleCreateNote,
  'note.update': handleUpdateNote,
  'note.delete': handleDeleteNote,
  'note.copy': handleCopyNote,
  'note.append': handleAppendToNote,
  'vault.listNotes': handleListNotes,
  'periodicNote.get': handleGetPeriodicNote,
  'periodicNote.create': handleCreatePeriodicNote,
  'command.listCommands': handleListCommands,
  'command.execute': handleExecuteCommand,
};
```

## Implementation Order

1. **Create resource description files**
   - `resources/note.ts`
   - `resources/vault.ts`
   - `resources/periodic.ts`
   - `resources/command.ts`
   - `resources/index.ts` (统一导出)

2. **Refactor Obsidian.node.ts**
   - 添加 Resource 选择器
   - 替换 flat operation 为 resource-specific operations
   - 更新 execute 方法的路由逻辑

3. **Update operation handlers (if needed)**
   - 检查 handlers 是否需要修改
   - 保持现有逻辑，只改变调用方式

4. **Update tests**
   - 修改集成测试以适应新结构
   - 添加 resource 参数到测试用例

5. **Update documentation**
   - 更新 README 中的操作说明
   - 添加 Resource-Operation 对应表

## Migration Strategy

### Breaking Change Handling

旧 workflow JSON:
```json
{
  "parameters": {
    "operation": "getNote"
  }
}
```

新 workflow JSON:
```json
{
  "parameters": {
    "resource": "note",
    "operation": "get"
  }
}
```

**方案 A**: 提供 migration script（推荐）
- 遍历旧 workflows，将 `operation` 值映射为 `resource` + `operation`

**方案 B**: 在 execute 中兼容旧格式
- 如果 `resource` 为空，根据 `operation` 值推断 resource
- 临时兼容， deprecate 后移除

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Breaking change for existing users | High | 提供 migration guide 或兼容层 |
| Operation value naming conflict | Medium | 使用更简洁的 operation 值（去掉前缀）|
| UI 测试需要重写 | Low | 更新测试用例，覆盖 Resource + Operation 选择 |

## Open Questions

1. **Operation 值命名**:
   - 选项 A: `get`, `create` (简洁，依赖 resource 上下文)
   - 选项 B: `getNote`, `createNote` (完整，避免冲突)
   - **推荐 A**，保持简洁

2. **Backward compatibility**:
   - 选项 A: 纯 breaking change，major version bump
   - 选项 B: 添加兼容层，在 execute 中处理旧格式
   - **推荐 B**，减少用户迁移成本
