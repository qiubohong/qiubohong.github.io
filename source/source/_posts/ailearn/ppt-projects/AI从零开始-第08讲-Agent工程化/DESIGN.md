# DESIGN.md — 第 08 讲：Agent 工程化 Harness + 评测 + 安全（优化版）

## 1. 画布与全局母版

- 画布：1280 × 720（16:9），padding 上下 20px、左右 60px。
- 三区母版（内容页固定）：
  - A · 标题块：0–120px，页面主标题 34px bold，左上 kicker 标签 14px 琥珀橙 letterSpacing 2
  - B · 内容区：120–660px（可用 540px）
  - C · 页脚条：660–720px，左侧「AI 从零开始 · 第 8 讲」+ 右侧页码 `NN / 12`，14px 灰 #5B6B7A
- 封面 / 结尾页自定义版式，省略 C 区（深色渐变）。

## 2. 颜色系统

| 角色 | hex | 面积 | 用途 |
| :--- | :--- | :--- | :--- |
| 主色 | `#16263F` 深海军蓝 | ≤60% | 封面/深色块/标题 |
| 辅色 | `#DCE7F5` 冰蓝 | ≤30% | 卡片底/浅色块 |
| 强调色 | `#FF9F1C` 琥珀橙 | ≤10% | 巨型数字/CTA/焦点 |
| 亮点青 | `#22D3EE` | ≤8% | AI 亮点/装饰 |
| 中性 | `#1B2733` / `#5B6B7A` / `#F5F7FA` | 剩余 | 正文/次要/页面底 |

- 渐变：`linear-gradient(135deg, #16263F 0%, #1E3A5F 100%)` 用于封面与结尾。
- 卡片白底圆角 12px，boxShadow `0 2px 12px rgba(22,38,63,0.06)`。
- 深色卡头 `rgba(255,255,255,0.06)` + 边框 `rgba(220,231,245,0.15)`。
- Hero 页（P1/P2/P12）强调色占比 15-20%；Supporting 页强调色 ≤5%。

## 3. 字体系统

| 层级 | 字号 | 字重 | 行高 | 用途 |
| :--- | :--- | :--- | :--- | :--- |
| 封面主标题 | 52px | bold | 1.25 | 仅封面 |
| 章节大字 | 44px | bold | 1.2 | 章节过渡 |
| 巨型数据 | 64px | bold | 1.0 | 锚点数字（P2） |
| 页面主标题 | 34px | bold | 1.35 | A 区固定 |
| 卡片小标题 | 20px | bold | 1.4 | 卡片头 |
| 正文 | 16px | regular | 1.7 | 段落 |
| 脚注/页码 | 14px | regular | 1.4 | C 区 |

- 字体：中文「思源黑体」、西文「Inter」，代码「JetBrains Mono」。
- 代码块默认 `theme='github-dark'`，macHeader 默认 true，fontSize 13。

## 4. 信息密度

- 常规页留白 ≤30%；封面/结尾页 40%。
- 每页 ≥1 视觉锚点（≥44px 元素、巨型数字或 CodeBlock）。
- 卡片尾部元素用 `marginTop:'auto'` 锚定底部。

## 5. 配图系统

- 流程图 / 架构 / 矩阵 / 防线用 Box + Text + FAIcon 组合实现，禁用 Diagram（Kroki 不稳定）。
- 代码用 CodeBlock 还原，不引用真实截图。
- 禁 emoji，用 FAIcon（fill 必填），图标尺寸统一 24-32px。

## 6. 页面映射表

| # | 文件 | 类型 | 角色 | 版式 | L1 | 字数 | 留白% | 色彩分配 | 关键约束 |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | 全幅渐变+骑线标题 | 装饰圆 | 30 | 40% | 主60+辅20+强15 | 深色底+大标题+青强调 |
| 02 | 02_harness.slide | content | hero | 左巨型数字+右卡 | 巨型数字 | 120 | 35% | 强调20爆发 | 52.8%→66.5% 巨数锚点 |
| 03 | 03_six_components.slide | content | supporting | 左列表+右矩阵 | 六组件+P0-P2矩阵 | 170 | 20% | 主50+辅25 | 左六组件竖排 + 右优先级矩阵卡 |
| 04 | 04_build_verify.slide | content | supporting | 左文+右流程 | 四阶段流程 | 150 | 20% | 主45+辅30 | 四阶段横排 + 防死循环卡 |
| 05 | 05_context_eng.slide | content | supporting | 左标题+右内容 | AGENTS.md 深卡 | 170 | 20% | 主50+辅25 | 左可见即存在 + 右三要点卡 |
| 06 | 06_multi_agent.slide | content | supporting | 左三角架构+右卡 | 三角架构图 | 160 | 20% | 主45+辅30 | 三角架构 + Orchestrator-Workers |
| 07 | 07_eval_why.slide | content | supporting | 左标题+右内容 | 评测四层卡 | 170 | 20% | 主50+辅25 | 三大难点 + 四层卡 |
| 08 | 08_eval_method.slide | content | supporting | 左方法+右案例 | 反直觉案例卡 | 170 | 25% | 主45+辅30 | 三类评分器 + 忠实度 32% 案例 |
| 09 | 09_deepeval.slide | content | supporting | 上下分栏 | CodeBlock | 150 | 20% | 主45+辅30 | 三指标 + CodeBlock 断言 |
| 10 | 10_monitoring.slide | content | supporting | 左标题+右内容 | 瑞士奶酪模型 | 160 | 20% | 主50+辅25 | OTel + 回流 + 告警三卡 |
| 11 | 11_security.slide | content | supporting | 三层防线 | 防线卡 | 170 | 20% | 主45+辅30 | 事前/事中/事后三防线横排 |
| 12 | 12_checklist.slide | ending | hero | 居中金句 | 装饰圆 | 90 | 40% | 主60+强15 | 深色收官+练习+自测 |

## 7. 版式约束确认

- 相邻页版式不重复：P2(左数右卡)→P3(左列表右矩阵)→P4(左文右流程)→P5(左标题右内容)→P6(左三角右卡)→P7(左标题右内容)→P8(左方法右案例)→P9(上下分栏)→P10(左标题右内容)→P11(三层防线) ✅
- 非对称版式 9/12 = 75% ≥ 40% ✅
- 对称版式仅 P9、P12 两页 ≤2 ✅
- Hero 3 页 = 25%，P1→P2 递进，P12 收官 ✅
- 连续 valley：P3-P11 九连，靠 P2 数据峰与 P7 结论冲击、P9 代码实战打断节奏（可接受）✅
