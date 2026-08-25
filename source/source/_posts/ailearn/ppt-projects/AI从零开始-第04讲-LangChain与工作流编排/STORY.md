# STORY.md — 第 04 讲：LangChain 与工作流编排（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、已会跑通本地/云大模型的开发者（系列课程第 4 讲）。
- **核心目标**：让观众相信「LangChain 把 LLM 应用开发从手工拼接变成搭积木」，记住「Chain 是一条可复用的调用流水线」这一心智锚点，课后能写出「5 行跑通对话 → LCEL 链式编排 → LangServe 一键部署」的完整闭环。
- **PPT 长度**：14 页（封面 + 12 内容 + 结尾），Hero 页配额 3 页。
- **视觉调性**：深蓝理性、科技感、代码可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲裸调痛点、LangChain 定位、核心概念、LCEL、LangServe、LangSmith、参数速查；不讲 RAG/Agent 深层实现（留给第 5/6 讲）；禁贴过长源码（每页代码 ≤ 12 行）。

## ② 构建页面布局骨架

- **分章**：全篇 4 章：
  - 第 1 章「为什么需要框架」（P2 裸调痛点）→ 扉页 P2
  - 第 2 章「认识 LangChain」（P3 定位 / P4 概念墙 / P5 框架结构 / P6 第一次调用）→ 扉页 P3
  - 第 3 章「Prompt 与示例」（P7 PromptTemplate / P8 FewShot）→ 扉页 P7
  - 第 4 章「编排 · 部署 · 监控」（P9 LCEL 原理 / P10 LCEL 实战 / P11 LangServe / P12 LangSmith / P13 参数卡 / P14 总结）→ 扉页 P9
- **Hero 页**：P1 封面、P6 第一次调用（代码实战）、P14 结尾页（3 页，21%）；任意两 Hero 之间间隔 ≥1 Supporting。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 valley → P5 valley → P6 peak → P7 valley → P8 valley → P9 valley → P10 valley → P11 valley → P12 valley → P13 valley → P14 peak。连续 valley 过长，靠 P4 概念墙（章节 transition 深色）与 P6 Hero、P14 Hero 打破。
- **非对称版式**：P2 左标题+右内容、P5 分层图、P6 左代码+右说明、P7 上下分栏、P10 左代码+右说明、P13 参数卡矩阵——非对称占比 ≥ 40%。
- **对称版式预算**：P4（概念墙）、P8（左右对照）、P12（三卡）用对称，全篇对称 ≤ 3 页。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | 字数30/留白40% | 禁止四卡预览 | 封面：LangChain 框架让 LLM 应用开发变简单 |
| 02 | 02_bare_llm_pain.slide | content | supporting | valley | 左标题+右内容 | 痛点卡组 | 字数150/留白20% | 禁止等宽三卡 | 裸调大模型四大痛点：无记忆/token 限制/无法验证/多步低效 |
| 03 | 03_what_is_langchain.slide | section | transition | valley | 左大字+右要点 | 定位卡 | 字数120/留白25% | 禁止上下等分 | LangChain 是什么：LLM 应用开发框架，简化开发+标准化工具链 |
| 04 | 04_core_concepts.slide | content | supporting | valley | 概念墙横排 | 概念卡 5×2 | 字数160/留白15% | 禁止超 10 概念 | 10 大必知概念：LLM/Prompt/Chain/LCEL/RAG/Agent/Memory/OutputParser/Vectorstore/Embedding |
| 05 | 05_framework_layers.slide | content | supporting | valley | 分层架构图 | SVG 分层 | 字数140/留白25% | 禁止扁平罗列 | 框架七层结构：Core→LangChain→Integrations→Community→LangGraph/LangServe/LangSmith |
| 06 | 06_first_call.slide | content | hero | peak | 左代码+右说明 | CodeBlock | 字数120/留白30% | 禁止代码塞满全页 | 5 行代码跑通对话：prompt → llm → StrOutputParser 链 |
| 07 | 07_prompt_template.slide | content | supporting | valley | 上下分栏 | CodeBlock | 字数140/留白20% | 禁止无代码纯文字 | ChatPromptTemplate 消息角色 system/human/ai + MessagesPlaceholder |
| 08 | 08_fewshot.slide | content | supporting | valley | 左右对照 | 示例选择卡 | 字数140/留白22% | 禁止等宽三卡 | FewShot：示例集=微型知识库，SemanticSimilarityExampleSelector 语义选择 |
| 09 | 09_lcel_principle.slide | section | transition | valley | 左大字+右方法家族 | 方法卡 | 字数120/留白25% | 禁止上下等分 | LCEL 原理：Runnable Interface，stream/invoke/batch + async 家族 |
| 10 | 10_lcel_practice.slide | content | supporting | valley | 左代码+右说明 | CodeBlock | 字数130/留白25% | 禁止代码超 12 行 | 流式输出/异步/JsonOutputParser/astream_events |
| 11 | 11_langserve.slide | content | supporting | valley | 左代码+右说明 | CodeBlock | 字数130/留白25% | 禁止无命令纯文字 | langchain-cli 脚手架 + add_routes 一键 RESTful + Swagger |
| 12 | 12_langsmith.slide | content | supporting | valley | 三卡横排 | 监控卡 | 字数130/留白25% | 禁止表格堆砌 | LangSmith 链路可视化 / set_verbose / set_debug |
| 13 | 13_params_cheatsheet.slide | content | supporting | valley | 参数卡矩阵 | 参数卡 | 字数140/留白22% | 禁止等宽四卡 | temperature/top_p/top_k/max_tokens，「一次只动一个旋钮」 |
| 14 | 14_summary.slide | ending | hero | peak | 居中金句 | — | 字数80/留白40% | 禁止小字列表 | 调用→编排→部署→监控 完整闭环 + 练习 + 自测 |

## 数据必须落点

- P13：temperature 0~2（越低越确定）/ top_p 核采样 / top_k 词表截断 / max_tokens 输出上限——「一次只动一个旋钮」是调参第一原则。
- P6：prompt → llm → StrOutputParser 用 `|` 管道连接，输出即纯字符串，5 行以内完成。
- P11：`langchain app new` 脚手架 + `add_routes(app, chain, path="/chain")` + 自动生成 Swagger 文档页。
