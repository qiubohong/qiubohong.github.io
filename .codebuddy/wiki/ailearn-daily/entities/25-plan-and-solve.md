---
entity: Plan-and-Solve
aliases: [规划再执行]
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/25.md
date: 2026-03-27
---

# Plan-and-Solve

> 让 AI 先想清楚完整步骤，再按部就班执行，而不是走一步看一步。类比出门旅游先规划完整行程再出发，
> 而非到哪算哪。

## 核心定义
两阶段流程：**规划（Plan）**将复杂任务拆解为有序的子任务列表 → **执行（Solve）**按顺序逐一完成
每个子任务，通常不再动态调整计划。

## 关键要点
- 与ReAct 的核心区别：ReAct 每步都重新思考"下一步做什么"（灵活但可能跑偏），Plan-and-Solve 一次性规划全部
  步骤（可控但缺乏灵活性）
- 是 Chain-of-Thought（CoT）的升级版：CoT 是"想清楚再答一次"，Plan-and-Solve 是"想清楚再分步做"
- 适用场景：任务结构清晰、可预先拆解的复杂任务（如数据分析报告、多步骤代码重构）
- 常见变体：Plan-and-Solve+（带自我修正的规划）——执行中遇到失败可局部重新规划而非全盘推翻

## 关联概念
- 对照：[ReAct](./23-react.md)（灵活探索 vs 预先规划）
- 组件基础：[Parallelization](./26-parallelization.md)（规划出的子任务若相互独立可并行执行）
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)

## 来源
- `daily/25.md` 《5分钟AI，每天搞懂一个知识点(25) - Plan-and-Solve》（2026-03-27）
