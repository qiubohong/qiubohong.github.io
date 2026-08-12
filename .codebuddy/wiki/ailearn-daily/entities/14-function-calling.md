---
entity: Function Calling
aliases: [函数调用, AI函数调用]
category: clusters/04-llm-tools
source: source/source/_posts/ailearn/daily/14.md
date: 2025-12-16
---

# Function Calling（函数调用）

> 大模型在对话过程中，根据用户需求调用外部函数或工具的一种能力，让大模型从"能说会道的参谋"变成
> "能动手做事的助手"。

## 核心定义
模型本身不直接执行函数，只负责生成调用的"指令"，真正的执行工作由程序完成。核心价值：将大模型的语言理解能力
与外部工具执行能力相结合，突破知识截止日期、无法访问网络等固有局限。

## 关键要点
- 流程本质：大模型至少被调用两次——第一次分析意图决定调用哪个函数，第二次将执行结果整合为自然语言回复
- 典型场景：天气查询、股票查询、并行查询（`parallel_tool_calls=True`）
- 关键参数：`tools`（定义可用函数列表）、`tool_choice`（控制调用行为：auto/强制/none）
- 与 MCP 关系：Function Calling 是"基础版"工具调用技术，MCP 是更标准化的"企业级工具箱协议"，二者互补而非替代

## 关联概念
- 依赖：[LLM大模型](./11-llm.md)
- 升级版：[MCP协议](./15-mcp.md)
- 应用于：[ReAct](./23-react.md) 等 Agent 设计模式的"行动"环节
- 所属聚类：[LLM 工具生态](../clusters/04-llm-tools.md)

## 来源
- `daily/14.md` 《5分钟AI，每天搞懂一个知识点(14) - Function Calling》（2025-12-16）
