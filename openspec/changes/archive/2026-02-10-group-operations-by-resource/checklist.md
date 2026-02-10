# Implementation Checklist

## Artifacts Completed
- [x] proposal.md - Resource-Operation 分组重构提案
- [x] design.md - 详细设计文档（架构、文件结构、迁移策略）
- [x] tasks.md - 19个实施任务
- [x] test-plans.md - 10个测试计划
- [x] specs/resource-operation-pattern.md - Resource-Operation 模式变更规格

## Ready for Implementation
All artifacts created. Run `/opsx:apply` to start implementing.

## Key Implementation Notes
- 4 个资源组：Note (6), Vault (1), Periodic Note (2), Command (2)
- Breaking change：workflow JSON 结构变化
- 建议添加 backward compatibility 层
- 预计工作量：~3 小时
