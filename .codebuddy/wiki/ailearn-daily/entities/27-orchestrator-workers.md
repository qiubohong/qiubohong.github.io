---
entity: Orchestrator-Workers
aliases: [编排器-工作者模式]
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/27.md
date: 2026-03-28
---

# Orchestrator-Workers（编排器-工作者模式）

> 一个中心化的"编排器" Agent 负责动态拆解任务、调度多个"工作者" Agent 执行，并处理子任务间的依赖关系，
> 是Parallelization 的进阶升级版。

## 核心定义
角色分工：**Orchestrator**（分析整体任务、动态决定拆解方式、分配给合适的 Worker、处理依赖与失败重试）+
**Workers**（各自专注执行分配到的子任务，互不感知彼此存在）。

## 关键要点
- 与 Parallelization 的核心区别：Parallelization拆分方式预先固定且假设子任务无依赖；
  Orchestrator-Workers 支持**动态**拆分与**有依赖关系**的子任务调度（如子任务 B 需等A 完成后才能开始）
- Orchestrator 需要具备：任务分解能力、Worker 能力匹配、结果整合能力、异常处理与重试逻辑
- 典型场景：复杂软件开发任务（先设计接口→再并行开发多个模块→最后集成测试）
- 风险点：Orchestrator 本身是单点瓶颈，其调度质量直接决定整体效果上限

## 关联概念
- 上级/对比：[Parallelization](./26-parallelization.md)（纯并行 vs 中心化动态调度）
- 相关：[Router](./28-router.md)（Router 侧重"分发入口"，Orchestrator 侧重"过程中持续调度"）
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)

## 来源
- `daily/27.md` 《5分钟AI，每天搞懂一个知识点(27) - Orchestrator-Workers》（2026-03-28 21:00）
