# STORY.md — 第 10 讲：行业前沿与趋势（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 10 讲，收官讲）。
- **核心目标**：让观众看清「我们正站在哪一步」——从历史、格局、技术趋势到生态，建立对 AI 行业全景的坐标系，并回顾串联整个系列。
- **PPT 长度**：11 页（封面 + 9 内容 + 系列收官），Hero 页配额 2-3 页。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲 OpenAI DevDay、DeepSeek 演进、2026 三足鼎立、推理模型、Ontology、多模态与结构化输出、国产算力、AI 安全、未来展望；不讲具体模型微调、不展开量化技术细节；禁碰未经证实的传闻。

## ② 构建页面布局骨架

- **分章**：全篇 4 章：
  - 第 1 章「从哪里来」（P2 DevDay 2023 / P3 DeepSeek 演进）→ 扉页 P2
  - 第 2 章「现在到哪了」（P4 三足鼎立 / P5 推理模型时代）→ 扉页 P4
  - 第 3 章「技术趋势」（P6 Ontology / P7 多模态与结构化输出 / P8 国产算力 / P9 AI 安全）→ 扉页 P6
  - 第 4 章「往哪去」（P10 未来展望 / P11 系列收官）→ 扉页 P10
- **Hero 页**：P1 封面、P4 三足鼎立对比页、P11 收官页（3 页，27%，符合 20-30%）。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 peak → P5 valley → P6 valley → P7 valley → P8 valley → P9 valley → P10 valley → P11 peak。中段 valley 偏长，靠 P3 时间轴与 P4 对比峰、P11 收官制造节奏。
- **非对称版式**：P2 左标题右内容、P3 时间轴、P4 三卡对比、P5 左标题右内容、P6 左标题右内容、P7 左文右场景、P8 左标题右内容、P9 左标题右内容、P10 左文右卡 —— 非对称占比 9/11 = 82% ≥ 40%。
- **对称版式预算**：仅 P11（居中金句）用对称，全篇对称 ≤ 2 页。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | atmosphere | 字数30/留白40% | 禁止四卡预览；禁止标题小字 | 封面：我们正站在哪一步 |
| 02 | 02_devday.slide | content | supporting | valley | 左标题+右内容 | DevDay 三卡 | evidence | 字数160/留白20% | 禁止等宽三卡 | GPT-4 Turbo / GPTs / Assistants API → 三年后被 Agent 演进 |
| 03 | 03_deepseek.slide | content | supporting | valley | 时间轴 | 演进时间轴 | anchor | 字数160/留白20% | 禁止横排三卡 | R1 → V3 → V4-Flash 演进 + DeepSWE 数据 |
| 04 | 04_tripod.slide | content | hero | peak | 三卡对比 | 三巨头对比 | anchor | 字数160/留白30% | 禁止数据堆砌 | GPT-5 / Opus 5 / V4-Flash 三足鼎立 |
| 05 | 05_reasoning.slide | content | supporting | valley | 左标题+右内容 | 思考强度卡 | evidence | 字数150/留白20% | 禁止等宽三卡 | 推理模型：先想再说 + effort 可调 + 成本 |
| 06 | 06_ontology.slide | content | supporting | valley | 左标题+右内容 | 三元组卡 | evidence | 字数160/留白20% | 禁止术语堆砌 | Ontology 语义地基：三元组 + 权限边界 |
| 07 | 07_multimodal.slide | content | supporting | valley | 左文+右场景 | 发票识别场景 | evidence | 字数150/留白20% | 禁止上下等分 | 多模态入端 + json_schema 出端 |
| 08 | 08_chip.slide | content | supporting | valley | 左标题+右内容 | 昇腾 NPU 卡 | evidence | 字数150/留白20% | 禁止表格堆砌 | 昇腾 NPU + Triton 脱离 CUDA + 国产生态 |
| 09 | 09_safety.slide | content | supporting | valley | 左标题+右内容 | 安全三卡 | evidence | 字数160/留白20% | 禁止等宽三卡 | 注入/隐私/偏见 + Moderation + 数据不出门 |
| 10 | 10_future.slide | content | supporting | valley | 左文+右卡 | Harness 上移卡 | anchor | 字数160/留白20% | 禁止罗列空话 | Harness 上移 + 工程师角色转变 + 多智能体 |
| 11 | 11_finale.slide | ending | hero | peak | 居中金句 | 知识地图 M1-M3 | anchor | 字数100/留白40% | 禁止小字列表 | 系列收官：M1 基础 / M2 应用 / M3 工程化串联 |

## 数据必须落点

- P3：V4-Flash 284B/13B、1M 上下文、DeepSWE 54.4（+640%）→ 开源模型以「小参数 + 高效率」追平闭源。
- P4：GPT-5 400K / Opus 5 1M / V4-Flash $0.14 → 三巨头在「上下文 × 成本 × 开源」三个维度各自卡位。
