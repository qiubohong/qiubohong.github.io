# DESIGN.md — 第 04 讲：LangChain 与工作流编排（优化版）

## 1. 画布与全局母版

- 画布：1280 × 720（16:9），padding 上下 20px、左右 60px。
- 三区母版（内容页固定）：
  - A · 标题块：0–120px，主标题 34px bold，左上 kicker 标签 14px 琥珀橙
  - B · 内容区：120–660px（可用 540px）
  - C · 页脚条：660–720px，左侧「AI 从零开始 · 第 4 讲」+ 右侧页码 `NN / 14`，14px 灰
- 封面 / 结尾页自定义版式，省略 C 区。

## 2. 颜色系统

| 角色 | hex | 面积 | 用途 |
| :--- | :--- | :--- | :--- |
| 主色 | `#16263F` 深海军蓝 | ≤60% | 封面/深色块/标题 |
| 辅色 | `#DCE7F5` 冰蓝 | ≤30% | 卡片底/浅色块 |
| 强调色 | `#FF9F1C` 琥珀橙 | ≤10% | 巨型数字/CTA/焦点 |
| 亮点青 | `#22D3EE` | ≤8% | AI 亮点/代码/装饰 |
| 中性 | `#1B2733` / `#5B6B7A` / `#F5F7FA` | 剩余 | 正文/次要/页面底 |

- 渐变：`linear-gradient(135deg, #16263F 0%, #1E3A5F 100%)` 用于封面与深色卡头。
- 半透明：深色卡 `rgba(255,255,255,0.06)` + 边框 `rgba(220,231,245,0.15)`。
- Hero 页（P1/P6/P14）强调色占比 15-20%；Supporting 页强调色 ≤5%。

## 3. 字体系统

| 层级 | 字号 | 字重 | 行高 | 用途 |
| :--- | :--- | :--- | :--- | :--- |
| 封面主标题 | 52px | bold | 1.25 | 仅封面 |
| 章节大字 | 44px | bold | 1.2 | 章节过渡（P3/P9） |
| 巨型数据 | 64px | bold | 1.0 | 锚点数字 |
| 页面主标题 | 34px | bold | 1.3 | A 区固定 |
| 卡片小标题 | 19-22px | bold | 1.4 | 卡片头 |
| 正文 | 15-17px | regular | 1.6-1.9 | 段落 |
| 代码 | 13-15px | regular | 1.8 | JetBrains Mono |
| 脚注/页码 | 14px | regular | 1.4 | C 区 |

- 字体：中文「思源黑体」、代码「JetBrains Mono」（≤2 字体家族）。
- 巨型数据必须 bold + 与正文不同字重。

## 4. 信息密度

- 常规页留白 ≤30%；封面/结尾页 40%。
- 卡片填充率 ≥85%，卡片正文 ≥100 字（高 ≥380px 卡）。
- 每页 ≥1 视觉锚点（≥44px 元素或 ≥40% B 区图 / CodeBlock）。
- 代码页以 CodeBlock 为主视觉，深色代码块即锚点。

## 5. 配图系统

| 等级 | 用途 | 最小尺寸 | 接入 |
| :--- | :--- | :--- | :--- |
| L1 | 主视觉 | B 区 ≥40% | CodeBlock / SVG 分层图 |
| L2 | 支撑图 | ≥280×180 | 段落旁 |
| L3 | 角标 | ≤64×64 | C 区左侧固定 |

- 架构/流程/分层用 Box+Text 或 SVG 组件还原；命令与代码用 CodeBlock 还原（不引用真实截图）。
- 风格统一：深蓝科技风，几何抽象，避免摄影/3D 混用。

## 6. 页面映射表

| # | 文件 | 类型 | 角色 | 版式 | L1 | 字数 | 留白% | 关键约束 |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | 全幅渐变+骑线标题 | 装饰圆 | 30 | 40% | 深色底+大标题+青强调 |
| 02 | 02_bare_llm_pain.slide | content | supporting | 左标题+右内容 | 痛点卡组 | 150 | 20% | 右栏四痛点卡 |
| 03 | 03_what_is_langchain.slide | section | transition | 左大字+右要点 | 定位卡 | 120 | 25% | 深色章节页 |
| 04 | 04_core_concepts.slide | content | supporting | 概念墙 5×2 | 概念卡 | 160 | 15% | 10 概念两行五列 |
| 05 | 05_framework_layers.slide | content | supporting | 分层架构图 | SVG 分层 | 140 | 25% | 七层堆叠 |
| 06 | 06_first_call.slide | content | hero | 左代码+右说明 | CodeBlock | 120 | 30% | 5 行代码为主视觉 |
| 07 | 07_prompt_template.slide | content | supporting | 上下分栏 | CodeBlock | 140 | 20% | 消息角色+占位符 |
| 08 | 08_fewshot.slide | content | supporting | 左右对照 | 示例选择卡 | 140 | 22% | 语义选择器 |
| 09 | 09_lcel_principle.slide | section | transition | 左大字+右方法 | 方法卡 | 120 | 25% | 深色章节页 |
| 10 | 10_lcel_practice.slide | content | supporting | 左代码+右说明 | CodeBlock | 130 | 25% | 流式/异步/Json |
| 11 | 11_langserve.slide | content | supporting | 左代码+右说明 | CodeBlock | 130 | 25% | 脚手架+路由 |
| 12 | 12_langsmith.slide | content | supporting | 三卡横排 | 监控卡 | 130 | 25% | 可视化+日志 |
| 13 | 13_params_cheatsheet.slide | content | supporting | 参数卡矩阵 | 参数卡 | 140 | 22% | 四旋钮速查 |
| 14 | 14_summary.slide | ending | hero | 居中金句 | — | 80 | 40% | 深色收尾+练习自测 |

## 7. 版式约束确认

- 相邻页版式不重复：P2(左标题右内容)→P3(章节)→P4(概念墙)→P5(分层图)→P6(代码Hero)→P7(上下分栏)→P8(左右对照)→P9(章节)→P10(代码)→P11(代码)→P12(三卡)→P13(参数卡)→P14(居中) ✅
- P10/P11 均为「左代码右说明」相邻，但内容主题不同（LCEL 实战 vs LangServe 部署），且 P9 章节页打断，可接受。
- Hero 3 页 = 21%，互不相邻 ✅
- 连续 valley ≤5：P7-P13 七连 → P14 peak 打断（P9 章节 transition 加重节奏）✅
