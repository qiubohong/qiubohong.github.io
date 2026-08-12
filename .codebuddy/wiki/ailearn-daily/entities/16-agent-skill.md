---
entity: Agent Skill
aliases: [Skill, 智能体技能]
category: clusters/04-llm-tools
source: source/source/_posts/ailearn/daily/16.md
date: 2026-01-07
---

# Agent Skill

> 可复用的知识包，Anthropic 在 Claude 内部使用的规范，基于文件系统的可重用资源，为Agent 提供特定领域的
> 专业知识：工作流程、上下文和最佳实践，可将通用代理转变为专家。

## 核心定义
与提示词（一次性对话级指令）不同，Skill 按需加载：当 Agent 识别任务与某Skill 描述匹配时，自动加载并运用
其中知识，无需每次重新解释工作流程。

## 关键要点
- 组成部分：`SKILL.md`（元数据+指令）、`scripts/`（可执行脚本）、`references/`（参考资料）
- 触发机制：90% 取决于 `SKILL.md` 顶部 YAML frontmatter 的 `description` 字段是否清晰说明"做什么"和"何时触发"
- 三种技能位置：个人技能（`~/.claude/skills/`）、项目技能（`./.claude/skills/`）、插件技能
- 核心区别于提示词：具备脚本执行能力，能让 Claude"动手"运行代码而非仅"动口"生成建议
- 与 MCP 关系：MCP 是连接大模型与世界的桥梁，Agent Skill 是大模型操作世界的手

## 关联概念
- 互补：[MCP协议](./15-mcp.md)
- 应用产品：[Claude Code](./22-claude-code.md)
- 所属聚类：[LLM 工具生态](../clusters/04-llm-tools.md)

## 来源
- `daily/16.md` 《5分钟AI，每天搞懂一个知识点(16) - Agent Skill》（2026-01-07）
