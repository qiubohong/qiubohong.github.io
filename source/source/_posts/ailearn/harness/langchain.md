---
title: 用 Harness Engineering 提升深度智能体性能 —— LangChain 实战经验（译）
description: "LangChain 团队如何通过 Harness Engineering 将编程智能体在 Terminal Bench 2.0 上的得分从 52.8% 提升到 66.5%？Trace 分析方法论、自我验证循环、循环检测中间件，全部实战干货。"
keywords: [Harness Engineering, LangChain, Trace分析, AI Agent, 自我验证, 中间件, deepagents, Terminal Bench]
date: 2026-04-11 10:00:00
toc: true
tags:
  - 学习总结
  - AI学习
  - Harness Engineering
  - AI Agent
  - LangChain
  - 翻译
---

> **📌 原文信息**
> - 原文标题：[Improving Deep Agents with Harness Engineering](https://blog.langchain.com/improving-deep-agents-with-harness-engineering/)
> - 原文作者：LangChain 团队
> - 发布时间：2026 年 2 月 17 日
> - 本文为原文翻译，并结合中文读者习惯进行了适当优化。

> **📖 系列导读**：本文是 **Harness Engineering 系列**的外部参考资料。如果你还没读过系列正文，建议先从 [第 0 篇入门导读](https://qborfy.com/ailearn/harness/00.html) 开始，再回来看这篇实战案例，效果会更好。

---

**一句话结论：LangChain 的编程智能体在 Terminal Bench 2.0 上从第 30 名冲进了前 5 名。他们只改了 Harness，没换模型。**

这件事值得细说。

<!-- more -->

## Harness Engineering 的目标是什么

模型本身的智能是"尖刺型"的——在某些任务上表现惊艳，在另一些任务上却莫名其妙地翻车。Harness Engineering 要做的，就是把这种不稳定的智能"驯服"，让它在你关心的任务上稳定发挥。

具体来说，Harness 是围绕模型搭建的一套系统工具，包括：系统提示词、工具选择、执行流程。优化目标可以是任务完成率、Token 效率、响应延迟……你想优化什么，就往哪个方向调。

那问题来了：**怎么知道该往哪个方向调？**

LangChain 的答案是：**看 Trace。**

## 实验设置：调哪些旋钮

测试基准用的是 [Terminal Bench 2.0](https://www.tbench.ai/leaderboard/terminal-bench/2.0)，这是目前评估编程智能体的主流 Benchmark，包含 89 个任务，覆盖机器学习、调试、生物信息学等多个领域。

模型固定用 `gpt-5.2-codex`，全程不换。

Harness 上可以调的旋钮很多：系统提示词、工具集、钩子/中间件、技能、子智能体委托、记忆系统……LangChain 团队刻意收窄了优化范围，只聚焦三个：

1. **系统提示词（System Prompt）**
2. **工具集（Tools）**
3. **中间件（Middleware）**——他们对"中间件"的定义是：包裹在模型调用和工具调用前后的钩子逻辑

起点是默认配置，得分 52.8%，排名第 30 名开外。

## Trace 分析器：让改进可重复

LangChain 把 Trace 分析做成了一个可复用的"智能体技能"（Agent Skill）。这个技能的工作流程是：

1. 从 LangSmith 拉取实验 Trace 数据
2. 并行启动多个错误分析智能体 → 主智能体汇总发现和改进建议
3. 聚合反馈，对 Harness 做针对性修改

这个思路有点像机器学习里的 **Boosting**——每一轮都重点关注上一轮犯错的地方，集中火力攻克薄弱环节。

人类工程师可以参与第三步（验证和讨论改进方案），但不是必须的。需要注意的是：如果改动过度拟合某个特定任务，可能会在其他任务上出现退步，这是需要警惕的。

自动化 Trace 分析节省了大量手工排查时间，让快速迭代实验成为可能。

## 真正提升性能的是什么

### 1. 构建 + 自我验证循环

今天的模型是很好的"自我改进机器"——但它们不会自发进入"构建-验证"循环。

最常见的失败模式是：智能体写完代码，回头看了一眼，觉得"看起来没问题"，然后就停了。没有测试，没有验证，直接交卷。

LangChain 在系统提示词里加入了明确的问题解决流程：

| 阶段 | 做什么 |
|------|--------|
| **规划 & 探索** | 读任务、扫代码库、制定初始计划，包括如何验证解决方案 |
| **构建** | 带着验证意识实现方案，写测试，覆盖正常路径和边界情况 |
| **验证** | 跑测试，读完整输出，对照任务要求（不是对照自己的代码）检查 |
| **修复** | 分析错误，回看原始规格，修复问题 |

除了提示词，他们还加了一个 `PreCompletionChecklistMiddleware`——在智能体准备退出之前拦截它，强制让它跑一遍验证。这类似于 [Ralph Wiggum Loop](https://ghuntley.com/loop/)：用钩子强制智能体继续执行，而不是直接结束。

### 2. 给智能体提供环境上下文

Harness Engineering 的一个核心职责，就是**替智能体做好上下文准备工作**。

Terminal Bench 的任务有目录结构、内置工具和严格的超时限制。LangChain 的做法：

**目录上下文 & 工具发现**：用 `LocalContextMiddleware` 在智能体启动时自动扫描当前目录和父子目录，用 bash 命令找到 Python 等工具的安装位置。上下文发现本身容易出错，提前注入可以减少这类错误，帮助智能体快速"入职"。

**教智能体写可测试的代码**：智能体不知道自己的代码会被程序化测试评分。加入提示词，告诉它"你的工作会被自动化测试检验"，类似于提交代码前的 CI 流程。强调边界情况，避免只测"happy path"。

**时间预算提醒**：注入时间预算警告，提示智能体在时间快到时转向验证阶段。智能体天生不擅长时间估算，这个启发式规则在有严格超时的环境里很有用。

> **核心原则**：智能体对自己的环境、约束和评估标准了解得越多，就越能自主地完成工作。Harness 工程师的职责，就是准备和传递上下文，让智能体能够自主完成任务。

### 3. 鼓励智能体退一步、重新考虑

智能体一旦确定了方案，就容易陷入"死循环"——对同一个破方案反复做小修小补，有时候能在 Trace 里看到同一个文件被改了 10 次以上。

LangChain 用了一个 `LoopDetectionMiddleware`，通过工具调用钩子追踪每个文件的编辑次数。当同一个文件被编辑超过 N 次，就注入提示："……考虑重新审视你的方案"。

这是一个针对当前模型局限性的设计启发式规则。随着模型能力提升，这类护栏可能会变得不必要——但在今天，它确实有用。

### 4. 合理分配推理计算量

推理模型可以自主运行数小时，所以必须决定在每个子任务上花多少计算量。

`gpt-5.2-codex` 有四个推理模式：`low`、`medium`、`high`、`xhigh`。

LangChain 发现：
- 全程用 `xhigh` 反而得分低（53.9%），因为超时太多
- 全程用 `high` 得分 63.6%
- 最终选择了 **"推理三明治"**：`xhigh-high-xhigh`

逻辑是：**规划阶段**需要深度推理来充分理解问题；**实现阶段**用中等推理保持效率；**验证阶段**再用高推理来捕捉错误、确保提交质量。

这个策略把得分推到了 **66.5%**。

未来的自然演进方向是"自适应推理"（Adaptive Reasoning），让模型自己决定在每一步花多少推理计算量——Claude 和 Gemini 已经在往这个方向走了。

## 实践总结：构建 Agent Harness 的五条原则

LangChain 从这次实验中提炼出了五条可复用的原则：

**① 替智能体做好上下文工程**
智能体在陌生环境里的上下文组装能力还很弱。提前注入目录结构、可用工具、编码最佳实践和问题解决策略，能大幅减少可避免的错误。

**② 帮智能体自我验证**
模型天生偏向第一个"看起来合理"的解决方案。要积极地提示它跑测试、精炼方案。在没有人类介入的自主编程系统里，这一点尤其重要。

**③ 把 Trace 当作反馈信号**
Trace 让智能体能够自我评估和调试。调试工具和推理要放在一起看——很多时候，智能体走错路是因为缺少某个工具，或者没有相关操作的指导。

**④ 短期内检测并修复坏模式**
今天的模型不完美。Harness 设计者的工作，是围绕当前模型的短板设计护栏，同时为更强的模型做好准备。盲目重试、不验证工作成果——这些坏模式现在需要护栏，未来可能就不需要了。

**⑤ 针对不同模型定制 Harness**
Codex 和 Claude 的提示词指南都表明，不同模型需要不同的提示策略。用 Claude Opus 4.6 跑同一个 Harness 得了 59.6%，比 Codex 低——不是因为 Claude 不行，而是没有针对 Claude 跑同样的改进循环。很多原则是通用的（好的上下文准备、重视验证），但针对具体任务跑几轮 Harness 迭代，能让性能最大化。

## 开放资源

- [Trace 数据集](https://smith.langchain.com/public/29393299-8f31-48bb-a949-5a1f5968a744/d?tab=2)（已公开）
- Deep Agents 开源代码：[Python 版](https://github.com/langchain-ai/deepagents) | [JavaScript 版](https://github.com/langchain-ai/deepagentsjs)

---

## 延伸阅读：Harness Engineering 系列

这篇文章是 LangChain 的实战案例。如果你想系统学习 Harness Engineering，可以看看这个系列：

- [第 0 篇：入门导读 —— 当 AI 开始"自己干活"，工程师该做什么？](https://qborfy.com/ailearn/harness/00.html)
- [第 1 篇：Harness 的六大核心组件](https://qborfy.com/ailearn/harness/01.html)
- [第 2 篇：Build & Verify 模式详解](https://qborfy.com/ailearn/harness/02.html)
- [第 3 篇：上下文工程实战](https://qborfy.com/ailearn/harness/03.html)
- [第 4 篇：多智能体架构设计](https://qborfy.com/ailearn/harness/04.html)
- [第 5 篇：推理三明治与计算量分配](https://qborfy.com/ailearn/harness/05.html)
- [第 6 篇：Harness 的未来与演进趋势](https://qborfy.com/ailearn/harness/06.html)
