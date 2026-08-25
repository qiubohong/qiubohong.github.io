# STORY.md — 第 02 讲：环境准备与本地大模型部署（优化版）

## ① 用户意图对齐

- **目标受众**：有编程基础、AI 零基础的开发者（技术分享 / 系列课程第 2 讲）。
- **核心目标**：让观众相信「本地大模型人人可部署」，记住「Ollama 像 Docker 一样简单」这一心智锚点，课后动手完成「装环境 → 拉模型 → 对话」三步。
- **PPT 长度**：12 页（封面 + 10 内容 + 结尾），Hero 页配额 2-3 页。
- **视觉调性**：深蓝理性、科技感、数据可信（延续系列既有视觉：深海军蓝 + 冰蓝 + 琥珀橙）。
- **内容边界**：必讲 Python 环境、DeepSeek V4-Flash、Ollama 部署、Dify；不讲训练模型、不讲微调；禁碰硬件配置罗列过细（给最低要求即可）。

## ② 构建页面布局骨架

- **分章**：全篇 4 章，目录页声明 4 个章节：
  - 第 1 章「为什么本地」（P2 为什么需要本地模型）→ 扉页 P2
  - 第 2 章「环境准备」（P3 环境四件套 / P4 安装 Python / P5 安装深度学习库）→ 扉页 P3
  - 第 3 章「部署 V4-Flash」（P6 认识 V4-Flash / P7 模型演进 / P8 硬件要求 / P9 Ollama / P10 启动验证 / P11 Dify）→ 扉页 P6
  - 第 4 章「选择与练习」（P12 本地 vs 云 + 动手练习）→ 扉页 P12
- **Hero 页**：P1 封面、P6 V4-Flash 数据页、P12 结尾页（3 页，25%，符合 20-30%）；任意两 Hero 之间间隔 ≥1 Supporting。
- **rhythm 曲线**：P1 peak → P2 valley → P3 valley → P4 valley → P5 valley → P6 peak → P7 valley → P8 valley → P9 valley → P10 valley → P11 valley → P12 peak。连续 valley 过多，在 P5→P6 之间靠 Hero 打破；P3 设计为章节 transition 增加节奏。
- **非对称版式**：P2 左标题+右内容、P4 非对称双栏、P5 上大图+下方卡片、P6 巨型数字+洞察、P8 左大图+右侧文字、P9 非对称双栏、P10 左标题+右内容、P11 上下分栏 —— 非对称占比 8/12 = 67% ≥ 40%。
- **对称版式预算**：仅 P3（N卡片横排）与 P7（时间轴）用对称，全篇对称 ≤ 2 页。

## ③ 构建页面大纲

| # | 文件 | type | role | rhythm | layout | visual | visual_role | density | anti_pattern | description |
| :- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 01 | 01_cover.slide | cover | hero | peak | 全幅渐变+骑线标题 | L1: deepseek_abstract.png | atmosphere | 字数30/图1/留白40% | 禁止四卡预览；禁止标题小字 | 封面：本地大模型部署，人人可做——本讲从零装环境到跑起自己的 AI |
| 02 | 02_why_local.slide | content | supporting | valley | 左标题+右内容 | L1: local_vs_cloud.png | anchor | 字数180/图1/留白20% | 禁止等宽三卡 | 免费可控隐私三大理由 + 云 API 成本对比——本地不是替代云，而是多一种选择 |
| 03 | 03_env_stack.slide | section | transition | valley | N卡片横排 | L3 角标 | evidence | 字数120/图0/留白25% | 禁止等宽四卡装饰化 | 环境四件套：Python→PyTorch→HF→LangChain，一条链路串起学习主线 |
| 04 | 04_install_python.slide | content | supporting | valley | 非对称双栏 60:40 | L1: anaconda_badge.png | evidence | 字数160/图1/留白25% | 禁止上下等分 | 官网直装 vs Anaconda——推荐 Anaconda 统一管理环境 |
| 05 | 05_install_libs.slide | content | supporting | valley | 上大图+下方卡片 | L2: pip_commands.png | evidence | 字数140/图1/留白20% | 禁止代码塞进小卡 | PyTorch/Transformers/LangChain 三条命令 + 验证方式 |
| 06 | 06_deepseek_v4.slide | content | hero | peak | 巨型数字+洞察 | Chart(规格对比表) | anchor | 字数120/图1/留白35% | 禁止数据装进等宽卡 | 284B/13B MoE、1M 上下文、$0.14/M——小参数反超大参数的 2026 开源旗舰 |
| 07 | 07_evolution.slide | content | supporting | valley | 时间轴 | Diagram(时间轴) | evidence | 字数140/图1/留白20% | 禁止横排三卡 | R1→V3→V4-Flash 演进 + 知识蒸馏=老师教学生 |
| 08 | 08_hardware.slide | content | supporting | valley | 左大图+右侧文字 | L1: gpu_memory.png | anchor | 字数150/图1/留白25% | 禁止表格堆砌 | 4bit 量化 24GB 显存可跑；入门最低配置；双轨策略 |
| 09 | 09_ollama.slide | content | supporting | valley | 非对称双栏 | L2: ollama_terminal.png | evidence | 字数150/图1/留白20% | 禁止命令文字化 | Ollama 类 Docker 的体验：一条命令拉模型、一条命令跑模型 |
| 10 | 10_run_verify.slide | content | supporting | valley | 左标题+右内容 | L2: curl_demo.png | evidence | 字数130/图1/留白20% | 禁止超长单行命令 | ollama serve → run → curl 验证 API——三步跑通本地模型 |
| 11 | 11_dify.slide | content | supporting | valley | 上下分栏 | L1: dify_chat.png | anchor | 字数130/图1/留白25% | 禁止上下等分 | 局域网开放 + Dify 可视化对话，告别命令行 |
| 12 | 12_summary.slide | ending | hero | peak | 居中金句 | L3 角标 | anchor | 字数80/图0/留白40% | 禁止小字列表 | 双轨策略 + 动手练习三步 + 自测 3 题——本讲完即可独立部署 |

## 数据必须落点

- P6：284B 总参/13B 激活 → 小参数反超大参数，说明 2026 竞争从「更大」转向「更聪明」——选型不必追最大模型。
- P6：$0.14/百万 input → 云 API 成本已低到可当「水电」用——本地与云双轨完全可行。
- P8：4bit 量化 24GB 显存 → 消费级显卡门槛大降——本地部署不是服务器专属。
