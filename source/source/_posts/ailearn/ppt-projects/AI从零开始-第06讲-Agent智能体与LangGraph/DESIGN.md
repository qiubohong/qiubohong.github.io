# DESIGN.md — 第 06 讲：Agent 智能体与 LangGraph 工作流（优化版）

## 1. 画布与全局母版

- 画布：1280 × 720（16:9），padding 上下 20px、左右 60px。
- 三区母版（内容页固定）：
  - A · 标题块：0–120px，主标题 34px bold，左上 kicker 标签 14px 琥珀橙
  - B · 内容区：120–660px（可用 540px）
  - C · 页脚条：660–720px，左侧「AI 从零开始 · 第 6 讲」+ 右侧页码 `NN / 14`，14px 灰
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
- Hero 页（P1/P8/P14）强调色占比 15-20%；Supporting 页强调色 ≤5%。

## 3. 字体系统

| 层级 | 字号 | 字重 | 行高 | 用途 |
| :--- | :--- | :--- | :--- | :--- |
| 封面主标题 | 52px | bold | 1.25 | 仅封面 |
| 巨型数据 | 64px | bold | 1.0 | 锚点数字 |
| 页面主标题 | 34px | bold | 1.3 | A 区固定 |
| 卡片小标题 | 19-22px | bold | 1.4 | 卡片头 |
| 正文 | 15-17px | regular | 1.6-1.9 | 段落 |
| 代码 | 13-15px | regular | 1.8 | JetBrains Mono |
| 脚注/页码 | 14px | regular | 1.4 | C 区 |

- 字体：中文「思源黑体」、代码「JetBrains Mono」（≤2 字体家族）。

## 4. 信息密度

- 常规页留白 ≤30%；封面/结尾页 40%。
- 每页 ≥1 视觉锚点（≥44px 元素或 ≥40% B 区图 / CodeBlock）。
- 代码页以 CodeBlock 为主视觉；代码单行 ≤ 60 字符（防水平溢出）。

## 5. 配图系统

| 等级 | 用途 | 最小尺寸 | 接入 |
| :--- | :--- | :--- | :--- |
| L1 | 主视觉 | B 区 ≥40% | CodeBlock / 时序条 / 流程条 |
| L2 | 支撑图 | ≥280×180 | 段落旁 |
| L3 | 角标 | ≤64×64 | C 区左侧固定 |

- 架构/流程/时序用 Box+Text 还原；命令与代码用 CodeBlock 还原。
- 风格统一：深蓝科技风，几何抽象，避免摄影/3D 混用。

## 6. 页面映射表

| # | 文件 | 类型 | 角色 | 版式 | L1 | 字数 | 留白% | 关键约束 |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | 全幅渐变+骑线标题 | 装饰圆 | 30 | 40% | 深色底+大标题+青强调 |
| 02 | 02_what_is_agent.slide | content | supporting | 左标题+右内容 | 五大局限卡 | 150 | 20% | 五局限右栏 |
| 03 | 03_collab_modes.slide | content | supporting | 三模式演进 | 演进卡 | 140 | 22% | 箭头串联 |
| 04 | 04_reasoning_cot.slide | content | supporting | 思维链流程卡 | 流程卡 | 150 | 22% | CoT/ReAct 等 |
| 05 | 05_memory.slide | content | supporting | 三类记忆横排 | 记忆卡 | 140 | 22% | 感觉/短期/长期 |
| 06 | 06_tools.slide | content | supporting | 左工具+右支持表 | 支持表 | 150 | 22% | 原生支持表 |
| 07 | 07_function_calling.slide | content | supporting | 时序图 | 时序条 | 140 | 25% | 两次调用 |
| 08 | 08_agent_demo.slide | content | hero | 左代码+右说明 | CodeBlock | 120 | 30% | 四步实战 |
| 09 | 09_agent_types.slide | content | supporting | 类型对比 | 对比卡 | 140 | 22% | scratchpad |
| 10 | 10_why_langgraph.slide | content | supporting | 左右对照 | 对比卡 | 150 | 22% | Chain vs Graph |
| 11 | 11_langgraph_elements.slide | content | supporting | 三要素横排 | 要素卡 | 140 | 22% | State/Node/Edge |
| 12 | 12_plan_execute.slide | content | supporting | 计划流程 | 流程条 | 140 | 25% | Plan/Execute/Replan |
| 13 | 13_persistence.slide | content | supporting | 三要点横排 | 要点卡 | 140 | 22% | checkpointer 等 |
| 14 | 14_summary.slide | ending | hero | 居中金句 | — | 80 | 40% | 深色收尾+练习自测 |

## 7. 版式约束确认

- 相邻页版式不重复：P2(左标题右内容)→P3(演进)→P4(流程卡)→P5(三卡)→P6(左工具右表)→P7(时序图)→P8(代码Hero)→P9(对比)→P10(左右对照)→P11(三卡)→P12(流程条)→P13(三卡)→P14(居中) ✅
- P11/P13 均为三卡，中间隔 P12（流程条）打断，可接受。
- Hero 3 页 = 21%，互不相邻 ✅
- 连续 valley ≤7：P2-P7 六连 → P8 peak 打断，P9-P13 五连 → P14 peak ✅
