---
entity: ReAct
aliases: [Reasoning + Acting]
category: clusters/05-agent-patterns
source: source/source/_posts/ailearn/daily/23.md
date: 2026-03-24
---

# ReAct（Reasoning + Acting）

> 让大模型"边想边做"——先思考再行动，循环往复，直到把事搞定。像侦探破案：看到线索→动脑子→采取行动获取
> 新线索→再分析。

## 核心定义
三词循环：**思考（Thought）**分析当前情况 → **行动（Action）**调用工具 → **观察（Observation）**
拿到结果作为下一次思考依据。

## 关键要点
- 实现核心：一个 while 循环，不断让模型"想→做→观察"直到拿到最终答案（Final Answer）
- 提示词设计是关键：需明确约束 Thought/Action/Action Input/Final Answer 的输出格式
- 必须设最大循环次数防止死循环；工具返回结果要清晰，否则模型会搞不清状况
- 出自 2022 年 Google Research 论文；LangChain 的 `AgentExecutor` 底层就是 ReAct 模式封装
- 可与 Function Calling 结合，让模型输出结构化调用指令而非纯文本解析

## 关联概念
- 依赖：[Function Calling](./14-function-calling.md)
- 对照：[Reflection](./24-reflection.md)（ReAct 是过程优化"边想边做"，Reflection 是结果优化"做完再想"）
- 应用产品：[Claude Code](./22-claude-code.md)
- 所属聚类：[AI Agent 与设计模式](../clusters/05-agent-patterns.md)

## 来源
- `daily/23.md` 《5分钟AI，每天搞懂一个知识点 - ReAct》（2026-03-24）
