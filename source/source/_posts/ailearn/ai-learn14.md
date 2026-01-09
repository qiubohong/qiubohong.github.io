---
title: CodeBuddy结合Spec-Kit AI编程工程化指南
date: 2025-12-09 15:00:00
toc: true
tags:
  - 学习总结
  - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

# 一、概述

CodeBuddy 是腾讯面向开发者的基于 AI 大模型，提供代码生成补全、技术问答、智能代码评审、单测生成等能力，结合 Spec Kit（规范套件） 与 AI 能力，旨在通过“规范驱动+智能辅助”的模式，帮助团队统一代码风格、规避常见错误、提升开发效率。本指南将详细介绍从环境准备到日常开发的全流程操作，涵盖规范定义、AI 辅助编码、自动化检查与修复等核心场景。

<!-- more -->

## 1.1 Spec 是什么

**传统开发 vs Spec-Driven 开发**
很多开发者开始一个项目时是这样的流程：

💭 "嗯，我想要一个标签管理工具..."
💻 "开始写代码吧，边写边想"
🤖 "AI，帮我生成一个 React 组件..."
🐛 "等等，这个需求没想清楚啊"
🔄 "改需求、改代码、来回折腾..."
😫 "代码越来越乱，难以维护"

**Spec-Driven 开发 的思路则完全不同：**
💭 "我的问题是什么？我想要的真实需求是什么？"
📝 "写一份清晰的 Spec（规格书），定义问题的边界"
🤖 "基于 Spec，让 AI 精准理解需求并生成代码"
✅ "代码与 Spec 完全对齐，清晰可维护"

### 是什么？

Spec（规格） 简单来说，就是在开始编码前，用结构化的文档明确定义：

1.问题是什么 - 用户的真实需求和痛点 2.解决方案长什么样 - 功能描述、交互流程、数据模型 3.怎样判断成功 - 验收标准和成功指标 4.有哪些约束 - 技术限制、性能要求、安全规范

一个好的 Spec 应该包含：

| 步骤                    | 作用             | 例子                                                     |
| ----------------------- | ---------------- | -------------------------------------------------------- |
| User Story              | 定义用户需求     | "用户点击图标，能看到所有打开的标签页"                   |
| Acceptance Criteria     | 清晰的验收条件   | "Given 打开 10 个标签，When 点击图标，Then 显示完整列表" |
| Data Model              | 定义数据结构     | Tab、TabGroup、Summary 三个核心实体                      |
| Functional Requirements | 功能需求列表     | FR-001: 系统必须检测所有打开的标签页                     |
| Edge Cases              | 边界情况处理     | "如果没有标签页，显示友好提示"                           |
| Success Criteria        | 可测量的成功指标 | "渲染时间 <200ms，支持 100+ 标签"                        |

**参考例子说明**

❌ 没有 Spec，你可能这样 Prompt

```
"给我写个 Chrome 扩展，能管理标签页，要好看"
```

✅ 有 Spec，你可以这样 Prompt：

1. "根据 spec.md，实现 TabList 组件，要求：- 显示 Tab[] 数组
2. 支持虚拟滚动（超过 50 个标签时）
3. 点击时调用 onTabClick 回调
4. 按打开时间降序排列"
5. ...

# 二、快速开始

## 2.1 环境要求

- 操作系统：macOS 10.15+/Windows 10+/Linux (Ubuntu 20.04+)
- Node.js 版本：≥20.0.0
- 包管理器：npm/yarn/pnpm（任选其一）
- Python 版本：≥3.12

**Nodejs 版本 nvm 安装操作命令：**

```shell
# Mac ｜ Linux安装命令
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# Windows 上安装 NVM，可以通过 GitHub https://github.com/coreybutler/nvm-windows/releases 下载 nvm-setup.exe 文件

# 验证是否安装成功
nvm version

# 使用 nvm安装  node20+版本
nvm install v20.19.0
# 设置别名
nvm alias ai v20.19.0
# 设置为当前node版本
nvm use ai
```

**Python 版本管理器 uv 安装操作命令**

```shell
# On macOS and Linux.
curl -LsSf https://astral.sh/uv/install.sh | sh

# On Windows.
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"

# With pip.
pip install uv
# 验证
uv help
```

## 2.2 安装 codebuddy-code

官方文档：https://www.codebuddy.ai/cli codebuddy 外网版（内网版有点问题，推荐使用外网版）

通过 npm 全局安装（推荐）：

```shell
npm install -g @tencent-ai/codebuddy-code

# 验证安装成功：

# 输入 codebuddy 启动 CodeBuddy 触发登录验证，后续按照操作选择 iOA步骤即可

codebuddy

```

## 2.3 安装 spec-kit(首次初始化项目使用)

spec 官方 github: https://github.com/github/spec-kit

```shell
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git
# 验证安装成功
specify --help

# 初始化项目 主要是把后续几个主要指令放入到.codebuddy 中
specify init --ai=codebuddy
```

![specify](/assets/img/ailearn/ai-learn14-1.png)

## 2.4 配置 Codebuddy 语言偏好

`CODEBUDDY.md` 放在长期记忆的开头，项目特有的在后边追加（`项目/CODEBUDDY.md`）

如果同时在用 Codebuddy IDE 则 `CODEBUDDY.md` 可以放在自己的项目 rules 中，共享 CodebuddyCode 的长期记忆（.codebuddy/.rules）。

具体内容如下：

```markdown
# 指令集(Instructions)

## 语言偏好（Language Preference）

**重要提示：** 之后所有沟通（包括代码注释和解释）都请使用中文。

## 命令约束

**重要提示：** 当进行/speckit.\* 命令时，都需要将本文件内作为基础对话认识

## 咨询

**重要提示：** 当对项目内业务有疑问时优先在本文件中查询，如果没有找到相关内容，或指出错误，则根据代码调研并且向研发人员确认，确认后应当更新本文件
```

## 2.5 初始化项目Spec规范

进入你的项目根目录，运行初始化命令：

```
cd /path/to/your-project
# 初始化项目
specify init .
```

第一次运行可能会出现错误：

![specify-error](/assets/img/ailearn/ai-learn14-4.png)

解决方案就是前往Github 申请令牌：

https://github.com/settings/personal-access-tokens

1. 获取 token声明到全局变量中：

```shell
# Mac | Linux进行导入配置变量，其中/root/.bashrc 为 Linux 系统本机的变量位置，如在 Mac 安装，默认地址为 ~/\.zshrc  或 ~/\.bashrc
export GH_TOKEN='<github-token>' & export GITHUB_TOKEN="$GH_TOKEN" >> root/\.bashrc

source  /root/.bashrc

# Windows
可以通过我的电脑 → 系统属性 → 高级系统设置 → 环境变量
```

2. 可以在命令后添加参数 --github-token=xxx 

```
specify init . --ai codebuddy --github-token=<KEY>
```

完成初始化后，会在项目根目录生成 `.specify`和`.codebuddy`目录，具体如下：
```shell
.codebuddy/  
└── commands/ # 包含AI辅助开发的各种命令工具
    ├── speckit.analyze.md          # 跨工件一致性分析命令
    ├── speckit.checklist.md        # 检查清单生成命令
    ├── speckit.clarify.md          # 需求澄清命令
    ├── speckit.constitution.md     # 宪法管理命令
    ├── speckit.implement.md        # 实现命令
    ├── speckit.plan.md             # 计划制定命令
    ├── speckit.specify.md          # 规范制定命令
    ├── speckit.tasks.md            # 任务生成命令
    └── speckit.taskstoissues.md    # 任务转问题命令

.specify/ # 项目规范化和自动化工具集
├── memory/
│   └── constitution.md             # 项目宪法文件
├── scripts/
│   └── bash/
│       ├── check-prerequisites.sh  # 检查先决条件脚本
│       ├── common.sh               # 通用脚本函数
│       ├── create-new-feature.sh   # 创建新特性脚本
│       ├── setup-plan.sh           # 设置计划脚本
│       └── update-agent-context.sh # 更新代理上下文脚本
└── templates/
    ├── agent-file-template.md      # 代理文件模板
    ├── checklist-template.md       # 检查清单模板
    ├── plan-template.md            # 计划模板
    ├── spec-template.md            # 规范模板
    └── tasks-template.md           # 任务模板

```


# 三、speckit 规范 AI 编程全流程

## 3.1 完整的 speckit 开发流程

![speckit流程图](/assets/img/ailearn/ai-learn14-2.png)

| 阶段 ｜ 命令 ｜ 目的 |
| -------------------- | ----------------------- | ---------------------------------------------------------- |
| 1                    | `/speckit.constitution` | 定义项目的开发宪章（指导原则）                             |
| 2                    | `/speckit.specify`      | 编写初始功能规格文档                                       |
| 3                    | `/speckit.checklist`    | 验证规格质量是否达到“可交付”标准                           |
| 4                    | `/speckit.clarify`      | 根据 checklist 结果进行需求澄清                            |
| 5                    | `/speckit.plan`         | 进入实现规划，写技术方案                                   |
| 6                    | `/speckit.tasks`        | 基于 Spec 拆解技术方案为一个个可实现的任务点，方便 AI 执行 |
| 7                    | `/speckit.analyze`      | 确认任务的可实现和检查风险点                               |
| 8                    | `/speckit.implement`    | 根据 constitution + spec + tasks 去实现代码输出            |

以上步骤可以多次执行，如：

- `/speckit.constitution` 可以针对项目，多次调整定义开发规范。
- `/speckit.specify` 针对需求我们可以多次调整，直到生成的 spec.md 符合我们需求。
- `/speckit.plan` 可以查看生成 plan.md 调整生成技术实现方案。
- ...等等

![speckit命令](/assets/img/ailearn/ai-learn14-3.png)

## 3.2 定义宪章 /speckit.constitution

> **宪章**是项目的架构原则和约束的集合。它在整个开发过程中起到"守门员"的作用，确保所有设计决策都符合核心原则。

**操作步骤**
启动 codebuddy ，输入`/speckit.constitution 这是一个xxx项目，主要使用技术栈为xxx` ，具体如下图：

![speckit.constitution](/assets/img/ailearn/ai-learn14-5.png)

不同技术栈生成项目宪章是不一样，但主要包含以下内容：

- 项目主要技术栈
- 项目主要规范和约束
- 项目主要测试策略
- 其他一些约定规范等等

## 3.3 需求设计(/speckit.specify)和需求澄清(/speckit.clarify)

> 需求设计与澄清解决最大的问题：在开发设计前消除歧义与认知偏差，避免“带猜测”进入 `/plan` 导致返工。

### 需求设计

需求设计工作过程：

- 用户输入初步需求内容 `/speckit.specify 需要实现一个xxx内容` ， 需求内容越仔细，AI对此的疑问就越少。
- Spec会根据需求生成**“疑问列表”**：模糊术语、未量化指标、冲突需求、缺失边界
- 让用户回答疑问列表，进行交互式问答（可能循环多轮）
- 记录决策与补充说明（形成“澄清日志”）

参考例子：

- 模糊指标 → 转化为量化：例如“高性能”→“P95 响应 \< 300ms”。
- 冲突：Story A 说“匿名可用”，Story B 要求“强制登录”。
- 依赖外部系统 SLA 未说明。
- 安全责任归属不清。

下面实际操作，具体如下图：

```shell

```




