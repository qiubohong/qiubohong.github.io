---
entity: Router
aliases: [动态路由模式]
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/28.md
date: 2026-03-29
---

# Router（动态路由模式）

> 根据用户请求的意图/类型，将请求动态分发给最合适的专用 Agent 或处理流程，如同呼叫中心的智能话务分配台。

## 核心定义
核心两步：**意图识别**（分类模型或LLM 判断请求属于哪个类别）→**动态分发**（按分类结果路由到对应的
专用 Agent/工作流处理）。

## 关键要点
- 与其他模式的定位差异：Router 是多Agent 系统的"入口层"，解决"这个请求该给谁处理"的问题，
  自身通常不直接完成任务
- 实现方式：可用轻量分类模型（速度快、成本低）或直接让 LLM 输出路由决策（更灵活但成本higher）
- 典型场景：客服系统按问题类型分发（技术支持/账单/退换货各由专用 Agent 处理）、
  多领域助手（代码问题→Code Agent，写作问题→Writing Agent）
- 常与 [多智能体协作](./29-multi-agent-collaboration.md) 配合：Router 做前置分发，后续多个专家 Agent 协同产出

## 关联概念
- 相关：[Orchestrator-Workers](./27-orchestrator-workers.md)
- 下游：[多智能体协作](./29-multi-agent-collaboration.md)
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)

## 来源
- `daily/28.md` 《5分钟AI，每天搞懂一个知识点(28) - Router》（2026-03-29）
