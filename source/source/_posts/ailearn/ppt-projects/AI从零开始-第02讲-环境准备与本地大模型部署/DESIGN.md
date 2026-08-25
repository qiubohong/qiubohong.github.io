# DESIGN.md — 第 02 讲：环境准备与本地大模型部署（优化版）

## 1. 画布与全局母版

- 画布：1280 × 720（16:9），padding 上下 20px、左右 60px。
- 三区母版（内容页固定）：
  - A · 标题块：0–120px，主标题 36px bold，左上 kicker 标签 14px 琥珀橙
  - B · 内容区：120–660px（可用 540px）
  - C · 页脚条：660–720px，左侧「AI 从零开始 · 第 2 讲」+ 右侧页码 `NN / 12`，14px 灰
- 封面 / 结尾页自定义版式，省略 C 区。

## 2. 颜色系统

| 角色 | hex | 面积 | 用途 |
| :--- | :--- | :--- | :--- |
| 主色 | `#16263F` 深海军蓝 | ≤60% | 封面/深色块/标题 |
| 辅色 | `#DCE7F5` 冰蓝 | ≤30% | 卡片底/浅色块 |
| 强调色 | `#FF9F1C` 琥珀橙 | ≤10% | 巨型数字/CTA/焦点 |
| 亮点青 | `#22D3EE` | ≤8% | AI 亮点/装饰 |
| 中性 | `#1B2733` / `#5B6B7A` / `#F5F7FA` | 剩余 | 正文/次要/页面底 |

- 渐变：`linear-gradient(135deg, #16263F 0%, #1E3A5F 100%)` 用于封面与深色卡头。
- 半透明：封面大图叠加 `rgba(22,38,63,0.55)` 蒙版；装饰圆 `opacity 0.12`。
- Hero 页（P1/P6/P12）强调色占比 15-20%；Supporting 页强调色 ≤5%。

## 3. 字体系统

| 层级 | 字号 | 字重 | 行高 | 用途 |
| :--- | :--- | :--- | :--- | :--- |
| 封面主标题 | 56px | bold | 1.2 | 仅封面 |
| 章节大字 | 44px | bold | 1.2 | 章节过渡 |
| 巨型数据 | 64px | bold | 1.0 | 锚点数字（P6） |
| 页面主标题 | 36px | bold | 1.3 | A 区固定 |
| 卡片小标题 | 22px | bold | 1.4 | 卡片头 |
| 正文 | 18px | regular | 1.6 | 段落 |
| 脚注/页码 | 14px | regular | 1.4 | C 区 |

- 字体：中文「思源黑体」、西文「Inter」，代码「JetBrains Mono」（≤2 中文字体家族）。
- 巨型数据必须 bold + 与正文不同字重（64px vs 18px）。

## 4. 信息密度

- 常规页留白 ≤30%；封面/结尾页 40%。
- 卡片填充率 ≥85%，卡片正文 ≥100 字（高 ≥380px 卡）。
- 卡片尾部元素用 `marginTop:'auto'` 锚定底部。
- 每页 ≥1 视觉锚点（≥44px 元素或 ≥40% B 区图）。

## 5. 配图系统

| 等级 | 用途 | 最小尺寸 | 接入 |
| :--- | :--- | :--- | :--- |
| L1 | 主视觉 | B 区 ≥40% | 卡片底/一栏铺底/叠层 |
| L2 | 支撑图 | ≥280×180 | 段落旁 |
| L3 | 角标 | ≤64×64 | C 区左侧固定 |

- 配图获取：抽象科技氛围图（P1 背景）用 ImageGen 生成；架构/流程/时间轴/规格对比用 SVG/Chart/Diagram 组件；终端命令截图类用 CodeBlock 组件还原（不引用真实截图，避免版权与清晰度问题）。
- 风格统一：深蓝科技风，几何抽象插画，避免摄影/3D 混用。

## 6. 页面映射表

| # | 文件 | 类型 | 角色 | 版式 | L1 | 字数 | 留白% | 色彩分配 | 关键约束 |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | 全幅渐变+骑线标题 | deepseek_abstract.png | 30 | 40% | 主60+辅20+强15 | 深色底+大标题+青强调 |
| 02 | 02_why_local.slide | content | supporting | 左标题+右内容 | local_vs_cloud.svg | 180 | 20% | 主50+辅25 | 右栏信息卡+底部成本条 |
| 03 | 03_env_stack.slide | section | transition | N卡片横排 | — | 120 | 25% | 主40+辅30 | 章节大字+四卡（对称预算1） |
| 04 | 04_install_python.slide | content | supporting | 非对称双栏 60:40 | anaconda.svg | 160 | 25% | 主50+辅25 | 左直装右 Anaconda 深卡 |
| 05 | 05_install_libs.slide | content | supporting | 上大图+下方卡片 | code_commands.svg | 140 | 20% | 主45+辅30 | CodeBlock 为主视觉 |
| 06 | 06_deepseek_v4.slide | content | hero | 巨型数字+洞察 | spec_table.svg | 120 | 35% | 强调20爆发 | 284B/13B 双巨数锚点 |
| 07 | 07_evolution.slide | content | supporting | 时间轴 | timeline.svg | 140 | 20% | 主50+辅25 | Diagram 时间轴+蒸馏卡 |
| 08 | 08_hardware.slide | content | supporting | 左大图+右侧文字 | gpu_chip.svg | 150 | 25% | 主45+辅30 | 左图右策略卡 |
| 09 | 09_ollama.slide | content | supporting | 非对称双栏 | ollama_shell.svg | 150 | 20% | 主45+辅30 | CodeBlock 拉取命令 |
| 10 | 10_run_verify.slide | content | supporting | 左标题+右内容 | curl_verify.svg | 130 | 20% | 主45+辅30 | CodeBlock 三步+curl |
| 11 | 11_dify.slide | content | supporting | 上下分栏 | dify_flow.svg | 130 | 25% | 主50+辅25 | 上网络下 Dify 双卡 |
| 12 | 12_summary.slide | ending | hero | 居中金句 | — | 80 | 40% | 主60+强15 | 深色收尾+练习自测 |

## 7. 版式约束确认

- 相邻页版式不重复：P2(左标题+右内容)→P3(N卡)→P4(非对称双栏)→P5(上大图+下卡)→P6(巨数)→P7(时间轴)→P8(左大图右文)→P9(非对称双栏)→P10(左标题右内容)→P11(上下分栏)→P12(居中) ✅
- 非对称版式 8/12 = 67% ≥ 40% ✅
- N卡片横排仅 P3 一页 ≤2 ✅
- Hero 3 页 = 25%，互不相邻 ✅
- 连续 valley ≤3：P2-P5 四连 → P6 peak 打断，P7-P11 五连 → P12 peak（可接受，P11 视觉加重）✅
