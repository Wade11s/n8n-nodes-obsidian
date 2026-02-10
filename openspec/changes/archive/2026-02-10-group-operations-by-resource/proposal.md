# Proposal: Group Operations by Resource

## Summary
重构 Obsidian 节点的操作选择界面，从扁平列表改为 Resource-Operation 两级分组结构，提升用户体验和节点可维护性。

## Why

当前问题：
- 11 个操作平铺显示，用户需要滚动查找
- 操作之间没有逻辑分组，新用户难以理解
- 不符合 n8n 生态系统中其他高级节点的标准模式

改进目标：
- 按照操作对象（Note/Vault/Periodic/Command）分组
- 减少单次选择的认知负荷
- 与 GitHub、Slack 等官方节点保持一致的体验

## What Changes

### UI 结构变更
- 添加 **Resource** 下拉选择器（第一级）
- **Operation** 选择器根据 Resource 动态显示（第二级）
- 使用 `displayOptions: { show: { resource: ['xxx'] } }` 实现条件显示

### 资源分组

| Resource | Operations | Description |
|----------|-----------|-------------|
| **Note** | Get, Create, Update, Delete, Copy, Append | 单文件笔记的 CRUD 操作 |
| **Vault** | List Notes | Vault 级别的浏览操作 |
| **Periodic Note** | Get, Create | 周期性笔记（日/周/月/季/年）|
| **Command** | List Commands, Execute Command | Obsidian 应用命令 |

## Capabilities

### New Capabilities
- `resource-selection`: 资源分组选择能力
- `conditional-operation-display`: 基于资源的操作条件显示

### Modified Capabilities
- `note-operations`: 操作入口从扁平改为分组
- `vault-operations`: 操作入口从扁平改为分组
- `periodic-operations`: 操作入口从扁平改为分组
- `command-operations`: 操作入口从扁平改为分组

## Impact

### Files Modified
- `nodes/Obsidian/Obsidian.node.ts` - 重构 properties 数组

### Files Created
- `nodes/Obsidian/resources/note.ts` - Note 资源描述
- `nodes/Obsidian/resources/vault.ts` - Vault 资源描述
- `nodes/Obsidian/resources/periodic.ts` - Periodic 资源描述
- `nodes/Obsidian/resources/command.ts` - Command 资源描述
- `nodes/Obsidian/resources/index.ts` - 资源导出

### Backward Compatibility
- **Breaking Change**: workflow JSON 中会新增 `resource` 字段
- 旧 workflows 在打开时会显示 "Resource: [empty]"，需要用户重新选择
- 建议 major version bump 或提供 migration guide

## Success Criteria
- [ ] UI 显示 Resource → Operation 两级选择
- [ ] 选择 Resource 后只显示相关的 Operations
- [ ] 所有 11 个操作功能保持正常
- [ ] 新结构通过 lint 和 build
- [ ] 更新 README 截图和说明
