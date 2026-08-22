# STORY.md — 第 06 讲：Agent 智能体与 LangGraph 工作流（优化版）

## ① 用户意图对齐

- **目标受众**：已会编排与 RAG、想让 AI「从回答变成做事」的开发者（系列课程第 6 讲）。
- **核心目标**：让观众相信「Agent = 大脑 + 手 + 记忆」，记住「LLM 作推理引擎 + 工具执行 + 反馈闭环」这一心智锚点，课后能写出「Function Calling Agent」并理解 LangGraph 状态机。
- **PPT 长度**：14 页（封面 + 12 内容 + 结尾），Hero 页配额 3 页。
- **视觉调性**：深蓝理性、科技感、代码可信（延续系列视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲 Agent 定位、协同模式、思维链、记忆/工具/规划三能力、Function Calling、LangGraph 三要素与实战、持久化；不讲强化学习训练细节；Manus 仅作案例引入。

## ② 构建页面布局骨架

- **分章**：全篇 4 章：
  - 第 1 章「认识 Agent」（P2 定位 / P3 协同模式 / P4 思维链）→ 扉页 P2
  - 第 2 章「三大能力」（P5 记忆 / P6 工具 / P7 Function Calling）→ 扉页 P5
  - 第 3 章「实战与对比」（P8 龙虎榜 Agent / P9 类型对比）→ 扉页 P8
  - 第 4 章「LangGraph 工作流」（P10 为什么 / P11 三要素 / P12 计划执行反思 / P13 持久化 / P14 总结）→ 扉页 P10
- **Hero 页**：P1 封面、P8 实战①（代码主视觉）、P14 结尾页（3 页，21%）；任意两 Hero 间隔 ≥1 Supporting。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 valley → P5 valley → P6 valley → P7 valley → P8 peak → P9 valley → P10 valley → P11 valley → P12 valley → P13 valley → P14 peak。连续 valley 过长，靠 P8 代码 Hero、P14 收官打破；P4 思维链用流程卡增加节奏。
- **非对称版式**：P2 左标题右内容、P3 三模式演进、P7 时序图、P8 左代码右说明、P10 左右对照、P12 计划流程——非对称占比 ≥ 40%。
- **对称版式预算**：P5（三类记忆）、P6（工具+支持表）、P9（类型对比）、P11（三要素）用对称，全篇对称 ≤ 4 页。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | 字数30/留白40% | 禁止四卡预览 | 封面：Agent 让 AI 从回答变成做事（Manus 案例引入） |
| 02 | 02_what_is_agent.slide | content | supporting | valley | 左标题+右内容 | 五大局限卡 | 字数150/留白20% | 禁止等宽三卡 | Agent 是什么：LLM 推理引擎 + 行动 + 反馈闭环 |
| 03 | 03_collab_modes.slide | content | supporting | valley | 三模式演进 | 演进卡 | 字数140/留白22% | 禁止堆名词 | Embedding→Copilot→Agent 三种协同模式 |
| 04 | 04_reasoning_cot.slide | content | supporting | valley | 思维链流程卡 | 流程卡 | 字数150/留白22% | 禁止上下等分 | CoT/思维树/ReAct/Reflexion/Hindsight 激发推理 |
| 05 | 05_memory.slide | content | supporting | valley | 三类记忆横排 | 记忆卡 | 字数140/留白22% | 禁止等宽四卡 | 感觉/短期/长期记忆，Embedding 是记忆载体 |
| 06 | 06_tools.slide | content | supporting | valley | 左工具+右支持表 | 支持表 | 字数150/留白22% | 禁止表格堆砌 | Function Call/Plugin/模型内嵌，主流模型原生支持 |
| 07 | 07_function_calling.slide | content | supporting | valley | 时序图 | 时序条 | 字数140/留白25% | 禁止贴大段代码 | Function Calling 原理：两次调用闭环 |
| 08 | 08_agent_demo.slide | content | hero | peak | 左代码+右说明 | CodeBlock | 字数120/留白30% | 禁止代码超 12 行 | 实战①：龙虎榜查询 Agent 四步 |
| 09 | 09_agent_types.slide | content | supporting | valley | 类型对比 | 对比卡 | 字数140/留白22% | 禁止等宽三卡 | Tool Calling/ReAct/Structured Chat + agent_scratchpad |
| 10 | 10_why_langgraph.slide | content | supporting | valley | 左右对照 | 对比卡 | 字数150/留白22% | 禁止上下等分 | 线性 Chain 的局限 vs LangGraph 图工作流 |
| 11 | 11_langgraph_elements.slide | content | supporting | valley | 三要素横排 | 要素卡 | 字数140/留白22% | 禁止堆名词 | State/Node/Edge 三要素 + HelloWorld |
| 12 | 12_plan_execute.slide | content | supporting | valley | 计划流程 | 流程条 | 字数140/留白25% | 禁止贴大段代码 | 计划-执行-反思：Plan→Execute→Replan |
| 13 | 13_persistence.slide | content | supporting | valley | 三要点横排 | 要点卡 | 字数140/留白22% | 禁止等宽三卡 | checkpointer/thread_id/recursion_limit |
| 14 | 14_summary.slide | ending | hero | peak | 居中金句 | — | 字数80/留白40% | 禁止小字列表 | Agent = 大脑 + 手 + 记忆 + 练习 + 自测 |

## 数据必须落点

- P2：LLM 五大局限——无记忆 / 无工具 / 无规划 / 会幻觉 / 不会验证，Agent 用「行动 + 反馈」逐一补位。
- P6：GPT-5 / Claude Opus 5 / DeepSeek V4-Flash / Qwen 均原生支持 Function Call。
- P7：Function Calling 是「两次调用」——第一次 LLM 返回结构化 JSON 参数，第二次把执行结果回传生成最终答案。
- P11：State（共享状态）/ Node（处理节点）/ Edge（连接与条件路由）三要素，循环靠「边」上的条件判断。
