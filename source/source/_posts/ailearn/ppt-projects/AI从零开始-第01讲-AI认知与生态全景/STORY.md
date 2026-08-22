# STORY.md — 第 01 讲：AI 认知与生态全景（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 1 讲）。
- **核心目标**：在 40 分钟内把 AI 的「术语、模型、框架、平台」四件事一次性扫清，让观众建立认知地图，课后能跑通一次模型对话。
- **PPT 长度**：11 页（封面 + 9 内容 + 选学收官），Hero 页配额 3 页（27%）。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙 + 青）。
- **内容边界**：讲清「是什么 + 怎么选 + 从哪开始」，不深入任何框架源码；Q/K/V 数学原理降级为选学页。

## ② 构建页面布局骨架

- **分章**：全篇 3 章：
  - 第 1 章「认知地基」（P2 LLM / P3 术语 / P4 Transformer / P5 Token / P6 Embedding）→ 扉页 P2
  - 第 2 章「生态地图」（P7 模型格局 / P8 框架 / P9 API 平台）→ 扉页 P7
  - 第 3 章「动手与选学」（P10 本周行动 / P11 选学 Q/K/V）→ 扉页 P10
- **Hero 页**：P1 封面、P5 Token（深色冷知识巨数页）、P11 选学收官（3 页，27%，符合 20-30%）；P1→P5 间隔 P2-P4，P5→P11 间隔 P6-P10。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 valley → P5 peak → P6 valley → P7 valley → P8 valley → P9 valley → P10 valley → P11 peak。P2（左右巨数对比）、P7（格局总览）视觉重量大，P5 冷知识用深色巨数打破连续 valley。
- **非对称版式**：P2（左右对比）、P4（左比喻+右 Q/K/V）、P9（平台卡+价格锚点）、P10（左行动+右自测）——非对称占比 ≥ 40%。
- **对称版式预算**：P3（10 词卡 2×5）、P7（格局卡）、P8（6 框架卡）用对称，控制节奏。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | atmosphere | 字数30/留白40% | 禁止四卡预览 | 封面：AI 认知与生态全景｜术语·模型·框架一次扫清 |
| 02 | 02_llm.slide | content | supporting | valley | 左右对比+巨数 | 1750亿/1.8万亿/284B | anchor | 字数130/留白22% | 禁止单列堆数据 | LLM：参数量越大能力越强，但 2026 有新变量（MoE 反超） |
| 03 | 03_terms.slide | content | supporting | valley | 10 词卡 2×5 | 10 术语卡 | evidence | 字数140/留白18% | 禁止术语堆成一段 | 核心术语一网打尽：10 词卡带一句解释 |
| 04 | 04_transformer.slide | content | supporting | valley | 非对称双栏 | 比喻层+Q/K/V 标注 | evidence | 字数120/留白25% | 禁止公式先行 | Transformer：答题时圈重点的注意力机制（Q/K/V 选学） |
| 05 | 05_token.slide | content | hero | peak | 深色巨数冷知识 | 40%~100% | anchor | 字数100/留白35% | 禁止浅底数据页 | Token：AI 世界的计费货币，中文更贵 |
| 06 | 06_embedding.slide | content | supporting | valley | 上释义+下三应用卡 | 三应用卡 | evidence | 字数120/留白22% | 禁止三卡无锚点 | Embedding：文字变向量，机器才懂意思相近 |
| 07 | 07_models.slide | content | supporting | valley | 主卡+四配角卡 | 模型格局卡 | anchor | 字数130/留白22% | 禁止六模型等宽平铺 | 主流模型格局 2026-08：V4-Flash 领衔开源 |
| 08 | 08_frameworks.slide | content | supporting | valley | 6 框架卡 | 6 框架卡 | evidence | 字数120/留白20% | 禁止框架罗列无定位 | 开发框架：从 LangChain 开始，按场景选型 |
| 09 | 09_api.slide | content | supporting | valley | 左平台清单+右价格锚点 | DeepSeek $0.14 | anchor | 字数120/留白25% | 禁止平台堆价格 | API 平台：一行 Key 接入，价格锚点 DeepSeek |
| 10 | 10_action.slide | content | supporting | valley | 左行动清单+右自测 | 三步清单 | evidence | 字数120/留白25% | 禁止行动与自测混排 | 本周行动：跑通一次模型对话 + 自测 3 题 |
| 11 | 11_qkv.slide | content | hero | peak | 深色收官+公式 | Q/K/V 三步 | anchor | 字数100/留白35% | 禁止数学推导堆满 | 选学：Q/K/V 到底在算什么（可跳过） |

## 数据必须落点

- P2：GPT-3 1750 亿 → GPT-4 1.8 万亿 → 参数量暴涨但边际递减；DeepSeek V4-Flash 284B 总参/13B 激活 → MoE 让小参数反超大参数。
- P5：中文 Token 税 40%~100% → 同样语义，中文比英文消耗更多 Token，更贵。
- P7：DeepSeek V4-Flash（开源旗舰）/ GPT-5 / Claude Opus 5 / Qwen / GLM / 豆包 → 2026-08 主流格局。
- P9：DeepSeek API $0.14 / 百万 input → 接入成本极低，一行 Key 即可开始。
