# STORY.md — 第 03 讲：Prompt 提示语工程（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 3 讲）。
- **核心目标**：让观众掌握「五要素 Prompt 骨架」（角色/上下文/指令/范例/输出格式），把下指令成功率从 30% 拉到 90%+，课后能独立写出一个 SQL 生成器。
- **PPT 长度**：11 页（封面 + 9 内容 + 收官），Hero 页配额 3 页（27%）。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙 + 青）。
- **内容边界**：讲「怎么写好 Prompt」与「为什么这样写」，不展开微调、不深入 Agent 编排；每个要素用「正反例对比」落地。

## ② 构建页面布局骨架

- **分章**：全篇 3 章：
  - 第 1 章「骨架总览」（P2 五要素总览）→ 扉页 P2
  - 第 2 章「五要素逐个拆」（P3 角色 / P4 上下文 / P5 指令 / P6 范例 / P7 输出格式）→ 扉页 P3
  - 第 3 章「实战与心法」（P8 四要素 / P9 SQL 实战 / P10 降幻觉 / P11 总结）→ 扉页 P8
- **Hero 页**：P1 封面、P8 下指令四要素（深色巨数页）、P11 总结收官（3 页，27%，符合 20-30%）；P1→P8 间隔 P2-P7，P8→P11 间隔 P9-P10。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 valley → P5 valley → P6 valley → P7 valley → P8 peak → P9 valley → P10 valley → P11 peak。P2（五要素总览卡）与 P9（SQL 实战）视觉重量大，P8 用 30%→90% 巨数打破连续 valley。
- **非对称版式**：P3（左角色+右正反例）、P4（左背景+右误区）、P9（左 Prompt 结构+右 SQL 输出）——非对称占比 ≥ 40%。
- **对称版式预算**：P2（五要素卡）、P5（正反例对比）、P6（三卡）、P7（四格式卡）用对称，控制节奏。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | atmosphere | 字数30/留白40% | 禁止四卡预览 | 封面：Prompt 提示语工程｜让 AI 一次就懂 |
| 02 | 02_five_elements.slide | content | supporting | valley | 五要素卡横排 | 五要素卡 | anchor | 字数120/留白25% | 禁止五卡无编号 | Prompt 是工作说明书：角色/上下文/指令/范例/输出格式 |
| 03 | 03_role.slide | content | supporting | valley | 左角色+右正反例 | 三角色+正反例 | evidence | 字数130/留白22% | 禁止角色空谈无例 | 要素①角色：专业型/创意型/中介型 + 正反例 |
| 04 | 04_context.slide | content | supporting | valley | 左背景+右误区 | 两误区卡 | evidence | 字数120/留白25% | 禁止背景堆成一段 | 要素②上下文：单次背景+多轮延续 + 两大误区 |
| 05 | 05_instruction.slide | content | supporting | valley | 上标题+下正反例三卡 | 正反例对比 | evidence | 字数130/留白22% | 禁止反例缺失 | 要素③指令：动词先行+结果导向 + 三大正反例 |
| 06 | 06_example.slide | content | supporting | valley | 三卡并列 | 三场景卡 | evidence | 字数120/留白25% | 禁止三卡无场景 | 要素④范例：风格迁移/复杂格式/语义校准 |
| 07 | 07_format.slide | content | supporting | valley | 四格式卡 | 四格式卡 | evidence | 字数110/留白22% | 禁止格式只列名词 | 要素⑤输出格式：表格/代码块/对话体/列表 |
| 08 | 08_four_rules.slide | content | hero | peak | 深色巨数 | 30%→90% | anchor | 字数100/留白35% | 禁止浅底数据页 | 下指令四要素：做什么/材料/格式/发到哪 |
| 09 | 09_sql.slide | content | supporting | valley | 左结构+右 CodeBlock | SQL 输出 | anchor | 字数130/留白20% | 禁止代码塞小卡 | 实战：五要素构建 SQL 生成器 |
| 10 | 10_anti_hallucination.slide | content | supporting | valley | 上原则+下三技巧 | 三技巧卡 | evidence | 字数120/留白25% | 禁止技巧堆砌 | 降低 AI 幻觉：让模型不知道就说不知道 |
| 11 | 11_summary.slide | ending | hero | peak | 深色收官居中 | 五要素回顾 | anchor | 字数100/留白38% | 禁止小字列表 | 总结：五要素是骨架，练习才内化 + 自测 3 题 |

## 数据必须落点

- P8：成功率 30% → 90%+ → 用对四要素，同一模型的效果天差地别。
- P2：五要素（角色/上下文/指令/范例/输出格式）→ 一套可复用的 Prompt 骨架。
- P9：SQL 生成器完整 Prompt 结构 + 输入输出示例 → 五要素落地的标准范本。
- P10：幻觉 = 模型「一本正经地胡说」→ 用「不知道就说不知道」约束，把风险降到最低。
