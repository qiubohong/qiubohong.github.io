# STORY.md — 第 07 讲：Agent 运行机制 Agent Loop（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 7 讲）。
- **核心目标**：让观众真正看懂「Agent 是怎么跑起来的」，记住「接收指令 → 思考 → 执行 → 观察 → 判断」四步循环这一心智锚点，课后能独立写出 50 行最简 Loop。
- **PPT 长度**：9 页（封面 + 7 内容 + 结尾），Hero 页配额 2-3 页。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲四步循环、三种流派、最简 Loop 实现、消息生命周期、上下文失忆、持久规则、可观测性；不讲具体框架源码、不展开评测与安全（留给第 8 讲）；禁碰训练细节。

## ② 构建页面布局骨架

- **分章**：全篇 3 章：
  - 第 1 章「循环本质」（P2 心跳引擎 / P3 三种流派 / P4 最简 Loop）→ 扉页 P2
  - 第 2 章「消息与记忆」（P5 消息生命周期 / P6 上下文失忆 / P7 持久规则与会话恢复）→ 扉页 P5
  - 第 3 章「看见与控制」（P8 可观测性 / P9 总结与练习）→ 扉页 P8
- **Hero 页**：P1 封面、P9 结尾页（2 页，22%，符合 20-30%）；P4 为核心代码页，视觉加重但不计入 Hero（深色代码块为主视觉）。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 peak → P5 valley → P6 valley → P7 valley → P8 valley → P9 peak。P4 以 CodeBlock 大图制造第二个峰，P2-P3 与 P5-P8 两段 valley 各被打断一次。
- **非对称版式**：P2 左标题+右内容、P4 左文+右代码、P6 左标题+右内容、P7 左文+右卡、P8 左标题+右内容 —— 非对称占比 5/9 = 56% ≥ 40%。
- **对称版式预算**：P3（决策树三卡）、P5（上大图下卡）用对称，全篇对称 ≤ 2 页。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | 装饰圆 | atmosphere | 字数30/留白40% | 禁止四卡预览；禁止标题小字 | 封面：Agent Loop——Agent 是怎么跑起来的 |
| 02 | 02_heartbeat.slide | content | supporting | valley | 左标题+右内容 | 四步循环横条 | anchor | 字数170/留白20% | 禁止等宽四卡装饰化 | 心跳引擎：接收指令→思考→执行→观察→判断，一步不停转下去 |
| 03 | 03_three_flavors.slide | content | supporting | valley | 决策树三卡 | 三卡对比 | evidence | 字数160/留白25% | 禁止罗列框架细节 | 三种流派：确定性循环可预测 / SDK Loop 灵活 / 多 Agent 复杂 |
| 04 | 04_minimal_loop.slide | content | supporting | peak | 左文+右代码 | CodeBlock | anchor | 字数140/图1/留白20% | 禁止代码塞进小卡 | 50 行实现最简 Loop：骨架 + 终止策略 + 工具注册表 |
| 05 | 05_message_lifecycle.slide | content | supporting | valley | 上大图+下方卡片 | 消息流图示 | anchor | 字数150/留白20% | 禁止术语堆砌 | 消息生命周期：Tool Use/Tool Result 交替、并行调用、Hooks 拦截 |
| 06 | 06_context_amnesia.slide | content | supporting | valley | 左标题+右内容 | 三板斧卡片 | evidence | 字数170/留白20% | 禁止等宽三卡 | Token 窗口物理限制 + 三板斧：滑动窗口 / 压缩 / 外部记忆 |
| 07 | 07_persistent_rules.slide | content | supporting | valley | 左文+右卡 | CLAUDE.md 深卡 | evidence | 字数160/留白20% | 禁止上下等分 | 持久规则与会话恢复：CLAUDE.md / 断点恢复 / PreCompact Hook |
| 08 | 08_observability.slide | content | supporting | valley | 左标题+右内容 | 五消息类型卡 | evidence | 字数170/留白20% | 禁止表格堆砌 | 可观测性：五种消息类型、ResultMessage 停止原因、effort 控成本 |
| 09 | 09_summary.slide | ending | hero | peak | 居中金句 | 装饰圆 | anchor | 字数80/留白40% | 禁止小字列表 | 总结：先跑通再上框架，避免过度设计 + 练习 + 自测 |

## 数据必须落点

- P6：Token 窗口物理上限 → 上下文不是无限记忆，会被「挤掉」——所以需要主动管理记忆。
- P8：effort 参数 → 思考强度可调，直接映射为 token 成本——成本意识从读日志开始。
