# Tasks: Code Cleanup and Documentation Improvements

## Task 1: Clean up vault.operations.ts
**Status**: pending
**Effort**: ~5 min

**Description**:
删除 `nodes/Obsidian/operations/vault.operations.ts` 文件末尾的多余空行。

**Acceptance Criteria**:
- [ ] 文件末尾最多保留 1 个空行
- [ ] 文件以换行符结尾

---

## Task 2: Unify encodePath usage in command.operations.ts
**Status**: pending
**Effort**: ~10 min

**Description**:
统一使用 `encodePath` 函数替代 `encodeURIComponent`。

**Changes Required**:
1. 修改导入语句：`import { makeRequest, encodePath } from '../helpers/api.helper';`
2. 修改第 29 行：`const encodedCommandId = encodePath(commandId);`

**Acceptance Criteria**:
- [ ] 导入语句包含 `encodePath`
- [ ] `handleExecuteCommand` 使用 `encodePath` 而非 `encodeURIComponent`
- [ ] 单元测试和集成测试通过

---

## Task 3: Add comments to note.operations.ts
**Status**: pending
**Effort**: ~20 min

**Description**:
为 Obsidian API 的特殊行为添加详细注释。

**Changes Required**:
1. `handleCopyNote`: 添加关于 `X-Destination` header 的注释
2. `handleAppendToNote`: 添加关于 `X-Append` header 的注释
3. `handleCreateNote`: 添加关于 `overwrite` query parameter 的注释

**Acceptance Criteria**:
- [ ] 每个操作都有描述其功能的三斜杠注释
- [ ] Obsidian API 特殊 header 和参数有说明

---

## Task 4: Add comments to periodic.operations.ts
**Status**: pending
**Effort**: ~10 min

**Description**:
为 URL 构造逻辑添加注释。

**Changes Required**:
- 说明 `date` 参数为空时 API 使用当前日期
- 说明 URL 模式：`/periodic/${period}/` 或 `/periodic/${period}/${date}/`

**Acceptance Criteria**:
- [ ] URL 构造逻辑有清晰注释

---

## Task 5: Rewrite README.md
**Status**: pending
**Effort**: ~30 min

**Description**:
将模板 README 替换为完整的项目文档。

**Sections Required**:
1. **Header**: 项目名称和简短描述
2. **Installation**: 社区节点安装链接
3. **Operations**: 完整操作列表（11个操作）
   - Note Operations (6个)
   - Vault Operations (1个)
   - Periodic Notes (2个)
   - Command Operations (2个)
4. **Credentials**:
   - Obsidian Local REST API 插件安装
   - API Key 获取步骤
   - Base URL 说明（HTTPS 27124 / HTTP 27123）
   - SSL 证书处理
5. **Usage**: 简单使用示例
6. **Testing**: 保留现有测试说明

**Acceptance Criteria**:
- [ ] 所有 11 个操作都有简要描述
- [ ] 凭证配置步骤清晰可执行
- [ ] 无模板占位符文本（如 "_app/service name_"）

---

## Verification Tasks

### Task 6: Run lint
```bash
npm run lint
```

### Task 7: Run build
```bash
npm run build
```

### Task 8: Run unit tests
```bash
npm test
```
