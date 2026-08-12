---
entity: 多智能体协作
aliases: [Multi-agent Collaboration]
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/29.md
date: 2026-03-30
---

# 多智能体协作（Multi-agent Collaboration）

> 多个专业化Agent 通过共享内存/消息机制协同工作，共同完成单一 Agent 难以胜任的复杂任务，
> 是整合了前六种设计模式思想的"集大成"模式。

## 核心定义
每个 Agent 专注自己的专业领域（如"研究员Agent"负责调研、"写手 Agent"负责成文、"审阅 Agent"负责校对），
通过共享上下文/黑板机制交换中间结果，形成流水线式或网状协作。

## 关键要点
- 与 Orchestrator-Workers 的差异：Orchestrator-Workers 强调"中心化调度"，多智能体协作更强调
  "平等专家间的协作与信息共享"，可以没有单一中心节点
- 常见协作结构：流水线式（顺序传递）、辩论式（多 Agent 互相质疑达成共识）、
  层级式（Router 分发+专家协作+汇总）
- 关键挑战：上下文/记忆共享机制设计、Agent 间通信协议、避免"三个和尚没水吃"的责任真空
- 是当前 Agent 系统研究的前沿方向（如 AutoGen、CrewAI 等框架的核心设计理念）

## 关联概念
- 整合：[ReAct](./23-react.md)、[Reflection](./24-reflection.md)、[Plan-and-Solve](./25-plan-and-solve.md)、
  [Parallelization](./26-parallelization.md)、[Orchestrator-Workers](./27-orchestrator-workers.md)、
  [Router](./28-router.md)
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)（本聚类收官页）

## 来源
- `daily/29.md` 《5分钟AI，每天搞懂一个知识点(29) - 多智能体协作》（2026-03-30 08:00）
