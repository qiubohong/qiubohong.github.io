---
entity: MCP协议
aliases: [Model Context Protocol, MCP]
category: clusters/04-llm-tools
source: source/source/_posts/ailearn/daily/15.md
date: 2025-12-17
---

# MCP 协议（Model Context Protocol）

> Anthropic 推出的开源协议，为大型语言模型与外部数据源、工具之间建立安全、标准化、双向的连接通道，
> 如同 AI 世界的"USB-C接口"。

## 核心定义
遵循客户端-服务器架构：MCP Host（AI 应用，如 Cursor/Claude Desktop）、MCP Client（内嵌翻译官）、
MCP Server（暴露 Tool/Resource/Prompt 三种能力）、MCP Protocol（基于 JSON-RPC 2.0）。

## 关键要点
- Server 三种核心能力：工具Tool（可执行函数）、资源 Resource（只读数据源）、提示模板 Prompt（预定义工作流）
- 传输方式：Stdio（本地）、HTTP（远程）
- 灵感来源：语言服务器协议 LSP（统一 IDE 对语言的支持 → MCP 统一 AI 对工具/数据的访问）
- 权限设计：工具由模型控制调用，资源访问权完全由用户控制，Server 无需暴露 API 密钥给 LLM 提供商

## 关联概念
- 基础版：[Function Calling](./14-function-calling.md)
- 互补：[Agent Skill](./16-agent-skill.md)（"MCP 是桥梁，Skill 是手"）
- 依赖对象：[LLM大模型](./11-llm.md)
- 所属聚类：[LLM 工具生态](../clusters/04-llm-tools.md)

## 来源
- `daily/15.md` 《5分钟AI，每天搞懂一个知识点(15) - MCP协议》（2025-12-17）
