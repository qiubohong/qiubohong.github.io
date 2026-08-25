# STORY.md — 第 08 讲：Agent 工程化 Harness + 评测 + 安全（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 8 讲）。
- **核心目标**：让观众相信「模型聪明 ≠ 干活靠谱」，工程能力要靠框架驯服——记住「Harness 是智能体的马具」这一心智锚点，课后能搭出带验证、评测、监控、安全的最小工程化 Agent。
- **PPT 长度**：12 页（封面 + 10 内容 + 结尾），Hero 页配额 2-3 页。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲 Harness 六大组件、Build&Verify、上下文工程、多智能体、评测方法论、DeepEval、生产监控、安全三层防线；不讲具体框架源码细节、不展开 RAG 实现；禁碰模型训练。

## ② 构建页面布局骨架

- **分章**：全篇 4 章：
  - 第 1 章「驯服模型」（P2 Harness 马具 / P3 六大组件 / P4 强制验证）→ 扉页 P2
  - 第 2 章「喂对上下文」（P5 上下文工程 / P6 多智能体协作）→ 扉页 P5
  - 第 3 章「证明有效」（P7 为什么评测难 / P8 评测方法论 / P9 DeepEval 实战）→ 扉页 P7
  - 第 4 章「守住底线」（P10 生产监控 / P11 安全防线 / P12 检查清单）→ 扉页 P10
- **Hero 页**：P1 封面、P2 数据叙事页（巨型数字）、P12 收官页（3 页，25%，符合 20-30%）；P1→P2 为封面-数据递进，P2 以巨型数字承接封面张力。
- **rhythm 曲线**：P1 peak → P2 peak → P3 valley → P4 valley → P5 valley → P6 valley → P7 valley → P8 valley → P9 valley → P10 valley → P11 valley → P12 peak。中段 valley 偏长，靠 P2 数据峰与 P7 评测「为什么难」的结论冲击制造记忆点，P9 以代码实战打破节奏。
- **非对称版式**：P2 左数右卡、P3 左列表右矩阵、P4 左文右流程、P5 左标题右内容、P6 左三角架构右卡、P7 左标题右内容、P8 左方法右案例、P10 左标题右内容、P11 三层防线 —— 非对称占比 9/12 = 75% ≥ 40%。
- **对称版式预算**：仅 P9（上下分栏）与 P12（居中金句）用对称，全篇对称 ≤ 2 页。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | atmosphere | 字数30/留白40% | 禁止四卡预览；禁止标题小字 | 封面：模型聪明≠干活靠谱，能力要靠框架驯服 |
| 02 | 02_harness.slide | content | hero | peak | 左巨型数字+右卡 | 巨型数字 | anchor | 字数120/留白35% | 禁止数据装进等宽卡 | 马具隐喻 + Terminal Bench 52.8%→66.5% 巨型数字 |
| 03 | 03_six_components.slide | content | supporting | valley | 左列表+右矩阵 | 六组件卡+P0-P2矩阵 | evidence | 字数170/留白20% | 禁止六卡等宽装饰化 | 六大组件 + P0-P2 优先级矩阵 |
| 04 | 04_build_verify.slide | content | supporting | valley | 左文+右流程 | 四阶段流程 | anchor | 字数150/留白20% | 禁止代码塞进小卡 | Build&Verify 四阶段 + 防死循环中间件 |
| 05 | 05_context_eng.slide | content | supporting | valley | 左标题+右内容 | AGENTS.md 深卡 | evidence | 字数170/留白20% | 禁止等宽三卡 | 上下文工程：可见即存在、地图优于百科全书 |
| 06 | 06_multi_agent.slide | content | supporting | valley | 左三角架构+右卡 | 三角架构图 | anchor | 字数160/留白20% | 禁止罗列框架 | 规划者+生成者+评估者三角 + Orchestrator-Workers |
| 07 | 07_eval_why.slide | content | supporting | valley | 左标题+右内容 | 评测四层卡 | evidence | 字数170/留白20% | 禁止表格堆砌 | 没有评测就没有改进：三大难点 + 评测四层 |
| 08 | 08_eval_method.slide | content | supporting | valley | 左方法+右案例 | 反直觉案例卡 | evidence | 字数170/留白25% | 禁止数据堆砌 | 三类评分器 + pass@k + AgentEval + 忠实度 32% |
| 09 | 09_deepeval.slide | content | supporting | valley | 上下分栏 | CodeBlock | anchor | 字数150/留白20% | 禁止命令文字化 | DeepEval 三指标 + 指标≤5 进 CI/CD |
| 10 | 10_monitoring.slide | content | supporting | valley | 左标题+右内容 | 瑞士奶酪模型 | evidence | 字数160/留白20% | 禁止等宽三卡 | OTel 追踪 + 失败回流 + 告警机制 |
| 11 | 11_security.slide | content | supporting | valley | 三层防线 | 防线卡 | anchor | 字数170/留白20% | 禁止表格堆砌 | 事前红黄线 + 事中收窄 + 事后巡检灾备 |
| 12 | 12_checklist.slide | ending | hero | peak | 居中金句 | 装饰圆 | anchor | 字数90/留白40% | 禁止小字列表 | 上线前 10 问 + 练习 + 自测 |

## 数据必须落点

- P2：Terminal Bench 52.8% → 66.5% → 同一模型，加了 Harness 后能力跃升——证明能力不只靠模型，更靠框架。
- P8：忠实度仅 32% → 反直觉案例：过程流畅 ≠ 结果正确——评测必须分开测「过程」与「结果」。
