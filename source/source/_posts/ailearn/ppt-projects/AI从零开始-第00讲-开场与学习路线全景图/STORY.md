# STORY.md — 第 00 讲：开场与学习路线全景图（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 0 讲「开场白」）。
- **核心目标**：让观众在 20 分钟内建立三件事——「AI 不是新语言而是新行业」的认知、「四阶段爬坡」的学习地图、「先用好 AI 再谈精通」的实用心法，从而愿意跟完整个系列。
- **PPT 长度**：11 页（封面 + 9 内容 + 收官），Hero 页配额 3 页（27%）。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙 + 青）。
- **内容边界**：只讲「为什么学」「学什么路线」「怎么学」，不展开任何具体技术细节；术语只做「扫盲清单」，不深究原理。

## ② 构建页面布局骨架

- **分章**：全篇 3 章：
  - 第 1 章「为什么现在学」（P2 学 AI 是必修课）→ 扉页 P2
  - 第 2 章「学什么：四阶段路线」（P3 学习路线 / P4 前置 / P5 入门 / P6 进阶 / P7 高级）→ 扉页 P3
  - 第 3 章「怎么学 + 学完去哪」（P8 三条路线 / P9 学习方法 / P10 九招心法）→ 扉页 P8
- **Hero 页**：P1 封面、P3 学习路线（深色章节过渡）、P11 收官（3 页，27%，符合 20-30%）；P1→P3 间隔 P2（1 个 supporting），P3→P11 间隔 P4-P10。
- **rhythm 曲线**：P1 peak → P2 valley → P3 peak → P4 valley → P5 valley → P6 valley → P7 valley → P8 valley → P9 valley → P10 valley → P11 peak。P2 用「三巨数锚点」做视觉加重的 supporting，P7（2×3 卡片）与 P10（3×3 九招）视觉密度高，避免连续 valley 单调。
- **非对称版式**：P2（顶部标题+三巨数+底部类比条）、P4（左角色对比+右术语墙）、P6（左文字+右三块）、P9（三列方法论）——非对称占比 ≥ 40%。
- **对称版式预算**：P3（N卡片横排）、P7（2×3 卡）、P10（3×3 九招）用对称，控制在可接受范围。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | atmosphere | 字数30/留白40% | 禁止四卡预览 | 封面：AI 从零开始｜不是新语言，而是新行业 |
| 02 | 02_must_learn.slide | content | supporting | valley | 顶部标题+三巨数+底部类比条 | 巨数 92%/200万+/1亿+ | anchor | 字数120/留白22% | 禁止等宽三卡无主次 | 必修课：马车→汽车、马夫→程序员，三大数据锚点 |
| 03 | 03_roadmap.slide | section | hero | peak | 深色章节过渡+N卡横排+箭头 | 四阶段卡+箭头 | anchor | 字数100/留白30% | 禁止四卡装饰化 | 学习路线：前置→入门→进阶→高级四阶段爬坡 |
| 04 | 04_prerequisite.slide | content | supporting | valley | 非对称双栏 45:55 | 术语墙 10 词 | evidence | 字数140/留白20% | 禁止术语堆成一段 | 前置：先定位角色（AI vs ML 工程师）再扫清 10 术语 |
| 05 | 05_entry.slide | content | supporting | valley | 上三模型卡+下方能力条 | 三模型徽标 | evidence | 字数130/留白22% | 禁止模型参数堆砌 | 入门：会调用、会提问、会用框架 |
| 06 | 06_advanced.slide | content | supporting | valley | 左标题+右三块 | 图标锚点 | evidence | 字数120/留白25% | 禁止三块等宽无层次 | 进阶：开源模型 + 本地部署 + AI 安全 |
| 07 | 07_expert.slide | content | supporting | valley | 2×3 卡片 | 6 能力卡 | evidence | 字数130/留白20% | 禁止六卡同色无重点 | 高级：Embedding/向量库/RAG/Agent/多模态/微调 |
| 08 | 08_career.slide | content | supporting | valley | 三条路线递进+箭头 | 三角色卡+箭头 | anchor | 字数120/留白25% | 禁止三卡平铺 | 学完去哪：Prompt 工程师→Agent 工程师→AI 专家 |
| 09 | 09_method.slide | content | supporting | valley | 三列方法论 | 三步卡 | evidence | 字数120/留白25% | 禁止长篇说教 | 学习方法：比喻先行 + 动手实验 + 冷知识收尾 |
| 10 | 10_nine_tricks.slide | content | supporting | valley | 3×3 九招 | 九格卡 | evidence | 字数90/留白18% | 禁止九格塞长句 | 先用好 AI：九招心法 3×3 |
| 11 | 11_series.slide | ending | hero | peak | 深色收官居中 | 里程碑 M1/M2/M3 | anchor | 字数90/留白38% | 禁止小字列表 | 系列预告：10 场正片 + 3 里程碑 |

## 数据必须落点

- P2：92% 500强 / 200万+ 开发者 / 1亿+ 周活 → 三个大数字锚点，说明 AI 已是主流基建而非尝鲜玩具。
- P2：马车→汽车、马夫→程序员 → 行业类比，说明「被淘汰的不是马夫，而是不会开车的人」。
- P5：GPT-5 / Claude Opus 5 / DeepSeek V4-Flash → 入门只需会调三个预训练模型。
- P11：M1（会用）→ M2（会调）→ M3（会造）→ 三个里程碑串联 10 场正片。
