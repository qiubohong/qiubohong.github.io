---
cluster: AI Agent 与设计模式
members: [AI Agent, Code Agent, Claude Code, ReAct, Reflection, Plan-and-Solve, Parallelization, Orchestrator-Workers, Router, 多智能体协作]
sources: [daily/17, daily/21, daily/22, daily/23, daily/24, daily/25, daily/26, daily/27, daily/28, daily/29]
---

# AI Agent 与设计模式

系列中体量最大的聚类（10 篇原文），也是"应用脉络"的核心。可分为三个层次：

1. **概念层**：[AI Agent](../entities/17-ai-agent.md)（daily/17）—— 定义什么是 Agent
2. **产品层**：[Code Agent](../entities/21-code-agent.md) → [Claude Code](../entities/22-claude-code.md)
   （daily/21,22）—— Agent 概念在编程领域的具体落地
3. **设计模式层**：daily/23~29 共7 种可组合的 Agent 设计模式（对应 Anthropic《Building Effective Agents》
   一文提出的模式分类思想）

## 七种设计模式一览表

| 模式 | 一句话核心 | 适用场景 | 与其他模式关系 |
|---|---|---|---|
| [ReAct](../entities/23-react.md) | 边想边做，思考→行动→观察循环 | 需要探索、简单工具调用任务 | 过程优化，是 Reflection 的对照组 |
| [Reflection](../entities/24-reflection.md) | 做完再想，生成→反思→优化循环 | 需要打磨输出质量的任务 | 结果优化，常与ReAct 结合 |
| [Plan-and-Solve](../entities/25-plan-and-solve.md) | 先想清楚再做，规划完整步骤再执行 | 复杂、可拆解的任务 | 是 CoT 的升级版；比 ReAct 更"死板"但更可控 |
| [Parallelization](../entities/26-parallelization.md) | 分而治之，子任务并行处理 | 子任务相互独立的场景 | AI 版MapReduce；是 Orchestrator-Workers 的简化版 |
| [Orchestrator-Workers](../entities/27-orchestrator-workers.md) | 中心化编排+动态调度 | 子任务有依赖关系的场景 | Parallelization 的升级版（支持依赖处理与动态调整） |
| [Router](../entities/28-router.md) | 按意图分发给专用Agent | 多领域、需要专业化分工 | 是多Agent 系统的"入口层" |
| [多智能体协作](../entities/29-multi-agent-collaboration.md) | 多专家 Agent 协同+共享内存 | 需要多角色配合的复杂产出 | 集大成模式，整合了前六种模式的思想 |

## 选择决策树（综合原文各篇"冷知识"与"最佳实践"提炼）

- 任务能否拆分成独立子任务？→ 能→ [Parallelization](../entities/26-parallelization.md)；
  子任务有依赖 → [Orchestrator-Workers](../entities/27-orchestrator-workers.md)
- 任务需要探索试错？→ [ReAct](../entities/23-react.md)；任务路径明确、想避免跑偏 →
  [Plan-and-Solve](../entities/25-plan-and-solve.md)
- 输出质量要求高、允许多轮打磨？→ [Reflection](../entities/24-reflection.md)
- 面对多领域、多种问题类型？→ [Router](../entities/28-router.md) 做前置分发
- 需要多个专业角色紧密配合产出一份成果？→ [多智能体协作](../entities/29-multi-agent-collaboration.md)

## 关联聚类

- 上游：[LLM 工具生态](./04-llm-tools.md)（所有模式都建立在 Function Calling/MCP 的工具调用能力之上）
- 与 [模型微调技术](./06-fine-tuning.md) 是平行的两条"让 AI 更好用"的路径：一个靠"训练"，一个靠"编排"
