---
entity: Claude Code
aliases: []
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/22.md
date: 无日期
---

# Claude Code

> Anthropic 推出的面向开发者的 AI 编程 Agent，以命令行工具形式运行在本地终端，能够读写文件、执行命令、
> 调用工具、自主完成复杂编程任务，是真正意义上的"AI 程序员"。

## 核心定义
与传统 AI 助手区别：传统助手"你问它给代码，你自己粘贴执行"；Claude Code"你告诉它目标，它自主规划并
执行直到完成"。

## 关键要点
- 架构：大语言模型（Claude 3.5/3.7 Sonnet）+ 工具集（Tool Use）+ Agent 循环（感知→思考→行动→观察）+ 安全机制
- 核心工具能力：文件操作、命令执行、代码搜索、网络请求、版本控制
- 工作模式遵循 ReAct（Reasoning+Acting）模式
- 支持 MCP 扩展工具集、子 Agent 并行执行、200K Token 超大上下文窗口
- 在 AI 编程生态中处于"终端 Agent"层级：比代码补全更强大（能自主执行），比云端 Agent 更可控（本地全程可见）

## 关联概念
- 上级：[Code Agent](./21-code-agent.md)
- 依赖：[Agent Skill](./16-agent-skill.md)、[MCP协议](./15-mcp.md)
- 工作模式：[ReAct](./23-react.md)
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)

## 来源
- `daily/22.md` 《5分钟AI，每天搞懂一个知识点(22) - Claude Code》（原文frontmatter 缺失 date 字段）
