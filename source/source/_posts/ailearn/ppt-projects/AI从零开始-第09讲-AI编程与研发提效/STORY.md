# STORY.md — 第 09 讲：AI 编程与研发提效（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 9 讲）。
- **核心目标**：让观众完成一次认知升级——从「让 AI 写代码」到「让 AI 按规范写代码」，记住「Spec 驱动」这一心智锚点，课后能落地 Spec-Kit 八命令工作流。
- **PPT 长度**：12 页（封面 + 10 内容 + 结尾），Hero 页配额 2-3 页。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲 Spec 驱动、Spec-Kit 八命令、需求澄清、评审驱动、CodeGraph、MCP、LLM 网关、工具清单；不讲具体大模型调优、不展开 RAG；禁碰非研发向的 AI 应用。

## ② 构建页面布局骨架

- **分章**：全篇 4 章：
  - 第 1 章「Spec 驱动」（P2 传统 vs Spec / P3 Spec-Kit 八命令 / P4 需求澄清 / P5 场景表）→ 扉页 P2
  - 第 2 章「评审驱动」（P6 评审驱动开发 / P7 魔鬼式评审实战）→ 扉页 P6
  - 第 3 章「上下文与连接」（P8 CodeGraph / P9 MCP 协议 / P10 LLM 网关）→ 扉页 P8
  - 第 4 章「工具与演进」（P11 工具清单 / P12 总结）→ 扉页 P11
- **Hero 页**：P1 封面、P2 传统 vs Spec 对比页、P12 收官页（3 页，25%，符合 20-30%）；P1→P2 为封面-核心概念递进。
- **rhythm 曲线**：P1 peak → P2 peak → P3 valley → P4 valley → P5 valley → P6 valley → P7 valley → P8 valley → P9 valley → P10 valley → P11 valley → P12 peak。中段 valley 偏长，靠 P2 对比峰、P7 魔鬼评审实战案例与 P11 工具墙制造记忆点。
- **非对称版式**：P2 左右对比、P3 左列表右流程、P4 左右对比、P6 左文右循环、P7 左案例右坏味道、P8 左标题右内容、P9 左架构右卡、P10 左标题右内容 —— 非对称占比 8/12 = 67% ≥ 40%。
- **对称版式预算**：仅 P5（场景矩阵）与 P11（四类工具墙）、P12（居中金句）用对称，全篇对称 ≤ 3 页（矩阵/工具墙为信息型对称，非装饰化）。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | atmosphere | 字数30/留白40% | 禁止四卡预览；禁止标题小字 | 封面：从让 AI 写代码，到让 AI 按规范写代码 |
| 02 | 02_spec_driven.slide | content | hero | peak | 左右对比 | Spec 六要素 | anchor | 字数150/留白30% | 禁止等宽三卡 | 传统边写边想 vs Spec 先写规格；六要素 |
| 03 | 03_spec_kit.slide | content | supporting | valley | 左列表+右流程 | 八命令流程 | evidence | 字数160/留白20% | 禁止命令堆砌 | Spec-Kit 八命令流水线 |
| 04 | 04_clarify_value.slide | content | supporting | valley | 左右对比 | 澄清价值卡 | evidence | 字数150/留白20% | 禁止上下等分 | 猜测→返工 vs 结构化提问→Q&A |
| 05 | 05_scene_table.slide | content | supporting | valley | 场景矩阵 | 四行矩阵 | evidence | 字数160/留白25% | 禁止表格堆砌 | 四类场景 × 命令组合矩阵 |
| 06 | 06_review_driven.slide | content | supporting | valley | 左文+右循环 | 提问循环 | anchor | 字数150/留白20% | 禁止代码塞进小卡 | 评审驱动开发：流程≠质量 |
| 07 | 07_review_case.slide | content | supporting | valley | 左案例+右坏味道 | 登录锁定案例 | evidence | 字数170/留白20% | 禁止等宽三卡 | 魔鬼评审：spec 4 问 + code-review 坏味道 |
| 08 | 08_codegraph.slide | content | supporting | valley | 左标题+右内容 | 调用关系图卡 | evidence | 字数160/留白20% | 禁止表格堆砌 | CodeGraph：7 场景 4 层知识图谱 |
| 09 | 09_mcp.slide | content | supporting | valley | 左架构+右卡 | Host/Client/Server | anchor | 字数150/留白20% | 禁止术语堆砌 | MCP 协议：USB-C 类比 + 是桥非手 |
| 10 | 10_gateway.slide | content | supporting | valley | 左标题+右内容 | 网关能力卡 | evidence | 字数160/留白20% | 禁止等宽三卡 | LLM 网关：虚拟密钥/成本路由/预算审计 |
| 11 | 11_tools.slide | content | supporting | valley | 四类工具墙 | 工具清单 | evidence | 字数160/留白25% | 禁止罗列过多 | 15 个趁手工具分四类 |
| 12 | 12_summary.slide | ending | hero | peak | 居中金句 | 装饰圆 | anchor | 字数90/留白40% | 禁止小字列表 | AI 编程演进：补全→对话→Agent→规范驱动 |

## 数据必须落点

- P2：Spec 六要素 → 规格是「对齐」的载体，先对齐再动手，返工从源头消灭。
- P5：四类场景 × 命令组合 → 不是所有需求都要走完整八命令，按场景选组合。
- P12：演进四阶段 补全→对话→Agent→规范驱动 → 每一阶段都在「把不确定性往前移」。
