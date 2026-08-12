---
cluster: LLM 工具生态
members: [Function Calling, MCP协议, Agent Skill, RAG]
sources: [daily/14, daily/15, daily/16, daily/18]
---

# LLM 工具生态

四篇文章讲的是"LLM 如何突破自身局限、连接外部世界"，是从 [LLM 核心](./03-transformer-llm.md)
通往 [AI Agent](./05-agent-patterns.md) 的必经桥梁。原文（`daily/16`）明确点出了三者的关系：

> "MCP 是连接大模型与世界的桥梁，而 Agent Skill 是大模型操作的世界的手"

## 四个概念的能力边界对比

| 维度 | [Function Calling](../entities/14-function-calling.md) | [MCP 协议](../entities/15-mcp.md) | [Agent Skill](../entities/16-agent-skill.md) | [RAG](../entities/18-rag.md) |
|---|---|---|---|---|
| 解决什么问题 | 单次调用一个具体函数 | 标准化连接海量外部工具/数据源 | 复用一整套工作流程知识 | 突破知识时效性/专业性局限 |
| 是否需要执行代码 | 否（只生成调用指令） | 否（模型只调用，Server 执行） | 是（可执行 scripts） | 否（检索+拼接上下文） |
| 规则来源 | 开发者手写 `tools` 定义 | 标准化协议（JSON-RPC 2.0） | 文件系统里的 SKILL.md | 向量数据库检索结果 |
| 可复用性 | 低（每次对话内定义） | 中（Server 可被多Host 复用） | 高（可跨对话按需加载） | 高（知识库持续更新） |

## 关系脉络

- Function Calling 是最基础的"工具调用"能力，MCP 是它的**标准化、协议化升级版**（daily/16 称
  Function Calling 为"基础版"，MCP 为"企业级工具箱协议"）
- Agent Skill 与 MCP 是互补关系而非竞争关系：MCP 解决"连接工具"，Skill 解决"复用工作流知识"
- RAG 可以看作一种特殊的 Function Calling ——"函数"就是"检索知识库"（daily/18 原文观点），
  两者常结合使用：Function Calling 决定何时检索，RAG 执行检索和生成

## 关联聚类

- 上游：[Transformer 与 LLM 核心](./03-transformer-llm.md)
- 下游：[AI Agent 与设计模式](./05-agent-patterns.md)（[ReAct](../entities/23-react.md) 等模式
  正是围绕"何时调用这些工具"设计的思考框架）
