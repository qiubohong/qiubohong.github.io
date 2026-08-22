# STORY.md — 第 05 讲：RAG 检索增强生成（优化版）

## ① 用户意图对齐

- **目标受众**：已会用 LangChain 编排、想给模型「外挂知识」的开发者（系列课程第 5 讲）。
- **核心目标**：让观众相信「RAG 让模型学会先查资料再回答」，记住「加载→分割→向量化→检索→生成」这条流水线，课后能做出「上传文档 → 问答」的 demo，并知道工业级的进阶方向。
- **PPT 长度**：11 页（封面 + 9 内容 + 结尾），Hero 页配额 2-3 页。
- **视觉调性**：深蓝理性、科技感、工程可信（延续系列视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲 RAG 动机、原理流程、Embedding、向量库、检索进阶、两个实战、响应注意点、工业级架构；不讲训练/微调细节（第 2 讲已讲）；工业级架构页不讲代码。

## ② 构建页面布局骨架

- **分章**：全篇 4 章：
  - 第 1 章「为什么需要 RAG」（P2 动机与对比）→ 扉页 P2
  - 第 2 章「原理与组件」（P3 全流程 / P4 Embedding / P5 向量库）→ 扉页 P3
  - 第 3 章「检索进阶与实战」（P6 三件套 / P7 实战① / P8 实战②）→ 扉页 P6
  - 第 4 章「优化与落地」（P9 响应注意点 / P10 工业级架构 / P11 总结）→ 扉页 P9
- **Hero 页**：P1 封面、P7 实战①（代码主视觉）、P11 结尾页（3 页，27%）；任意两 Hero 间隔 ≥1 Supporting。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 valley → P5 valley → P6 valley → P7 peak → P8 valley → P9 valley → P10 valley → P11 peak。连续 valley 过长，靠 P7 代码 Hero、P11 收官打破；P3 用流程长条增加节奏。
- **非对称版式**：P2 左右对照、P3 流程长条、P7 左代码右说明、P8 左代码右说明、P10 架构图——非对称占比 ≥ 40%。
- **对称版式预算**：P5（四库卡）、P9（三注意卡）用对称，全篇对称 ≤ 2 页。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | 字数30/留白40% | 禁止四卡预览 | 封面：RAG 让模型学会查资料再回答 |
| 02 | 02_why_rag.slide | content | supporting | valley | 左右对照 | 对比卡 | 字数150/留白20% | 禁止等宽三卡 | 知识有截止日期+幻觉；RAG vs 微调对比 |
| 03 | 03_rag_pipeline.slide | content | supporting | valley | 流程长条 | 流程条 | 字数130/留白25% | 禁止上下等分 | 加载→分割→向量化→存储→检索→生成 全流程 |
| 04 | 04_embedding.slide | content | supporting | valley | 左标题+右内容 | 选型卡 | 字数140/留白22% | 禁止表格堆砌 | Embedding 嵌入模型：高维→低维向量，中英选型 |
| 05 | 05_vector_db.slide | content | supporting | valley | 四库卡横排 | 库卡 | 字数140/留白22% | 禁止等宽四卡装饰化 | 向量数据库：Chroma/Pinecone/FAISS/Qdrant + KNN/ANN |
| 06 | 06_retrieval_advanced.slide | content | supporting | valley | 三件套横排 | 三件套卡 | 字数150/留白22% | 禁止堆名词 | Query/Reranker/Rewrite 检索进阶三件套 |
| 07 | 07_streamlit_demo.slide | content | hero | peak | 左代码+右说明 | CodeBlock | 字数120/留白30% | 禁止代码超 12 行 | 实战①：Streamlit 问答机器人全链路 |
| 08 | 08_agent_retrieval.slide | content | supporting | valley | 左代码+右说明 | CodeBlock | 字数120/留白25% | 禁止无代码纯文字 | 实战②：Agent 化检索，查不到就说不查不到 |
| 09 | 09_response_notes.slide | content | supporting | valley | 三注意卡横排 | 注意卡 | 字数130/留白25% | 禁止等宽三卡 | 响应模型注意点：上下文融合/幻觉抑制/逻辑连贯 |
| 10 | 10_industrial_arch.slide | content | supporting | valley | 架构图 | SVG 架构 | 字数130/留白25% | 禁止贴代码 | 进阶工业级架构：LangGraph+CopilotKit+NestJS+React+Chroma |
| 11 | 11_summary.slide | ending | hero | peak | 居中金句 | — | 字数80/留白40% | 禁止小字列表 | demo 到工业级三级跳 + 练习 + 自测 |

## 数据必须落点

- P2：模型知识有截止日期（训练数据停在某时刻）+ 幻觉（一本正经编造）——RAG 用外部知识库补齐。
- P4：text2vec（中文）/ bge-m3（多语言）/ bge-small（轻量）——中英选型要点。
- P5：KNN 精确但慢 / ANN 近似但快；召回率衡量检索「找得全不全」。
- P10：LangGraph（工作流）+ CopilotKit（前端 Agent UI）+ NestJS（后端）+ React（前端）+ Chroma（向量库）容器化。
