---
entity: AI Agent
aliases: [智能代理]
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/17.md
date: 无日期
---

# AI Agent

> 能够自主感知环境、制定目标、采取行动的智能系统，不仅仅是回答问题，而是能够主动完成任务的"数字助手"。

## 核心定义
与传统 AI 模型的最大区别：传统 AI 被动响应根据输入生成输出，AI Agent 主动规划为实现目标而行动。

## 关键要点
- 四大核心模块：感知（理解环境/用户需求）→ 规划（制定策略）→ 行动（工具调用）→ 学习（经验优化）
- 工作循环：环境感知→目标解析→任务分解→工具选择→行动执行→结果评估→经验学习
- 按自主程度分类：反应型、目标导向型、效用型、学习型
- 知名产品：Codebuddy/QwenCode（代码助手）、AutoGPT（高度自主）、LangChain Agents（灵活框架）

## 关联概念
- 依赖：[Function Calling](./14-function-calling.md)、[MCP协议](./15-mcp.md)
- 具体化：[Code Agent](./21-code-agent.md)
- 设计模式：[ReAct](./23-react.md)、[Reflection](./24-reflection.md) 等7 种模式均是本实体的具体实现方案
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)

## 来源
- `daily/17.md` 《5分钟AI，每天搞懂一个知识点(17) - AI Agent》（原文frontmatter 缺失 date 字段）
