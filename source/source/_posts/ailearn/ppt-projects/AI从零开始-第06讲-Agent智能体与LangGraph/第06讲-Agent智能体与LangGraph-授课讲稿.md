# 第 6 讲 · Agent 智能体与 LangGraph 工作流 授课讲稿

> 讲师逐页演讲脚本 · 配套《AI从零开始-第06讲-Agent智能体与LangGraph-优化版.pptx》 · 时长 55 分钟

---

## 〇、课前准备清单

### 需安装的软件（含版本建议、安装命令、下载地址）

| 软件 | 版本建议 | 作用 | 安装命令 / 下载地址 |
|------|---------|------|-------------------|
| Python | 3.11 ~ 3.12 | 运行环境 | https://www.python.org/downloads/ |
| Ollama | 已装（第 2 讲） | 本地大模型运行时 | https://ollama.com/download |
| LangGraph | 最新版 | 图工作流编排框架 | `pip install -U langgraph` |
| langchain-ollama | 0.2.x+ | 本地 Ollama 集成 | `pip install langchain-ollama` |
| langchain-openai | 最新版 | 云 API（硅基流动）兼容接口 | `pip install langchain-openai` |
| tavily-python | 最新版（可选） | 联网搜索工具 | `pip install tavily-python` |

```bash
# 完整安装流程
mkdir ai-learn06-agent && cd ai-learn06-agent
python -m venv venv
. venv/bin/activate          # Windows 用 venv\Scripts\activate
pip install -U langgraph langchain langchain-ollama langchain-openai
# 可选：联网搜索工具
# pip install tavily-python
```

### 需注册 / 准备的账号或 API Key

- **本地模型（龙虎榜 Agent 可用本地跑）**：`ollama pull deepseek-v4-flash`，无需 API Key。注意本地模型跑 Function Calling 时，需确认模型支持工具调用能力。
- **云 API（推荐用于龙虎榜实战，更稳）**：注册硅基流动 https://cloud.siliconflow.cn 获取 API Key，本讲 demo 用它调用 `Qwen/Qwen3-235B-A22B` 等支持函数调用的模型。
- **LangSmith（调试用，可选）**：https://smith.langchain.com 注册获取 `LANGSMITH_API_KEY`，用于可视化 Agent 执行链路。
- **Tavily（可选）**：https://tavily.com 注册获取 API Key，用于计划-执行-反思工作流里的联网搜索。

### 课前需跑通的 demo（如有）

1. 确认 Ollama 已启动，`ollama list` 能看到 `deepseek-v4-flash`。
2. 跑通龙虎榜 Agent（见「二、代码示例」的 `agent_demo.py`），输入「帮我查询一下今天的龙虎榜数据」，能看到工具调用过程并返回结果。
3. （可选）跑通 LangGraph HelloWorld，输入「今天几号」，确认 `thread_id` 多轮会话生效。

### 教室环境要求

- **投影**：需看清代码，1080P 以上，编辑器字号 ≥ 16。
- **网络**：龙虎榜实战调东方财富公开接口 + 硅基流动云 API，需外网；纯本地 Ollama 跑 HelloWorld 可不依赖外网。
- **是否现场演示**：是。本讲有 2 处 Live Demo（P8 龙虎榜 Agent、P12 计划-执行-反思工作流），建议提前跑通并准备备用方案（如云 API 换成本地模型）。
- 建议提前录好演示录屏，防止现场 API 限流或网络抖动。

---

## 一、逐页讲稿

### P1 封面

- **本页是什么**：本讲封面，用 Manus 案例引出「让 AI 从回答变成做事」的主题。
- **开场/衔接话术**：
  「前两讲，我们把模型的能力从『会聊天』升级到了『会查资料』。但大家有没有想过，模型再聪明，也只能『说』，不能『做』——它不能帮你订机票、不能查实时股票、不能操作数据库。今天这一讲，我们要给模型装上手脚，让它从『回答者』变成『执行者』，这就是 Agent 智能体。去年爆火的 Manus 就是典型的 Agent：你丢给它一个目标，它自己拆任务、自己调工具、自己交付结果。」
- **核心讲解**：
  一句话立住今天的主题：**Agent 让 AI 从「回答」变成「做事」**。回顾一下，第 4 讲我们学会了编排（Chain），第 5 讲学会了外挂知识（RAG），但它们本质上还是「模型被动接问题、主动出答案」。Agent 不一样，它有了「自主决策」：面对一个目标，它能自己判断「下一步该干嘛、要不要调工具、调哪个工具」。今天我们要搞懂三件事：Agent 到底是什么、它的三大能力（记忆/工具/规划）怎么来的、以及怎么用 LangGraph 把复杂的 Agent 工作流搭起来。学完你就能做一个「带工具调用」的小应用。
- **页面关键元素指引**：
  指着封面主标题「让 AI 从回答变成做事」，用 Manus 案例图做引子，让学员快速进入「AI 能自己干活」的想象。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：Agent 是不是就是「自动化的聊天机器人」？
  - A：不止。聊天机器人只负责对话，Agent 的核心是「决策 + 行动」：它会拆任务、选工具、执行、看结果再调整。聊天只是它对外的一种交互形式。
- **时长**：约 2 分钟

### P2 Agent 是什么

- **本页是什么**：给出 Agent 的准确定义，并讲它如何补齐 LLM 的五大局限。
- **开场/衔接话术**：
  「要给 Agent 下个准确的定义，得先看它到底补了模型的哪些短板。我们先数一数，光有一个『聪明的大脑』，缺什么。」
- **核心讲解**：
  先看 LLM 的五大局限：**无记忆**——不记得上次说过啥；**无工具**——只会动嘴，不能动手；**无规划**——复杂任务不会拆步骤；**会幻觉**——一本正经说错话；**不会验证**——自己算没算对都不知道。Agent 的定义，就是「**用 LLM 大模型作为推理引擎的系统**」——它让模型去判断该采取什么行动、行动的输入是什么，然后把行动的输出结果再反馈给模型，让它判断是继续行动还是结束。你看，这里面有个关键结构叫「**行动 + 反馈**」：模型不只是输出答案，而是进入一个「思考 → 行动 → 观察结果 → 再思考」的循环。**一句话记住：Agent = LLM 推理引擎 + 行动 + 反馈闭环**。大脑负责想，手脚负责做，做完把结果拿回来给大脑继续想。
- **页面关键元素指引**：
  指着「五大局限卡」逐条念，然后引出「行动 + 反馈闭环」这个核心结构图，让学员看到 Agent 是怎么逐条补位的。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：Agent 和普通 LLM 调用的本质区别是什么？
  - A：普通调用是「一次问答，拿了就走」；Agent 是「多轮决策循环」，模型要反复判断、调工具、看结果，直到任务完成或终止。区别就在于有没有那个「行动-反馈」的循环。
- **时长**：约 4 分钟

### P3 AI 协同三种模式

- **本页是什么**：讲人和 AI 协作的三种模式——Embedding → Copilot → Agent，理解 Agent 是「自主性最高」的一种。
- **开场/衔接话术**：
  「AI 不一定要『全自动』。实际上，按 AI 参与程度的深浅，人机协同可以分成三个档，Agent 只是自主性最高的那一档。理解了这三档，你才知道什么时候该上 Agent。」
- **核心讲解**：
  第一档 **Embedding 模式**：人类输入目标，AI 给几个建议，人类自己拍板。典型代表就是我们上一讲做的 RAG 智能客服——AI 查资料给你参考，决策权在人和既定流程手里。第二档 **Copilot 模式**：人类给目标，AI 经过几个流程生成初稿，人类再修改调整。典型代表是 GitHub Copilot 代码补全——它帮你写，但你随时改。第三档 **Agent 模式**：人类只给目标，AI 自己拆任务、自己选工具、自己执行到完成。典型代表是 Manus——你几乎不用管中间过程。**三档的本质区别是『自主性』越来越高，人类从『拍板者』变成『监督者』。** 做项目时记住：不是所有场景都要上 Agent，能用 Embedding/Copilot 解决的，别为了炫技硬上 Agent，成本和风险都更高。
- **页面关键元素指引**：
  指着三模式演进图，从左到右讲「给建议 → 给初稿 → 自主执行」，强调人类角色从「拍板」到「监督」的转变。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：什么时候该用 Agent，什么时候 Copilot 就够？
  - A：任务步骤清晰、结果可预测的，用 Copilot 甚至固定流程即可；任务目标开放、需要多次试错和工具组合的，才考虑 Agent。原则是「能用简单的就别上复杂的」。
- **时长**：约 4 分钟

### P4 激发推理：思维链

- **本页是什么**：讲怎么用「思维链」等技术激发模型的推理能力，这是 Agent 规划能力的基础。
- **开场/衔接话术**：
  「Agent 要能拆任务，前提是模型会『推理』。怎么让模型好好推理？核心技巧就是这一页的思维链。」
- **核心讲解**：
  **思维链（CoT，Chain of Thoughts）** 是一种提示技巧，就是让模型「一步一步地思考」，把大任务拆成小步骤。看个例子：直接问「食堂有 23 个苹果，用掉 20 个又买 6 个，现在几个？」模型可能张口就错。但你让它「先算剩下的，再算新买的」，它就稳稳答对。原因很简单：把中间过程写出来，模型就不容易跳步出错。在 CoT 基础上，又发展出几种更高级的模式：**思维树**——每一步都探索多种可能，形成一个树状结构再择优；**ReAct**——把「推理」和「行动」结合，边想边做边观察；**Reflexion**——带自我反思和动态记忆，做完回头总结经验再改进；**Hindsight**——利用已知结果反向优化过去的决策，从失败里学习。**这些模式，本质都是在给模型的推理过程『加结构』，而 Agent 的规划能力就建立在这些结构之上。**
- **页面关键元素指引**：
  指着 CoT 的「无思考链 vs 有思考链」对比演示，让学员直观看到「一步一步想」带来的准确率提升；再点出思维树、ReAct、Reflexion、Hindsight 四个进阶名词。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：现在的模型（如 DeepSeek 推理模式）是不是已经默认会思考链了？
  - A：对，很多新模型内置了推理模式，默认就会「先想再说」。但理解 CoT 的原理依然重要——它决定了你写 Prompt 时怎么引导模型，以及后面怎么设计 Agent 的推理流程。
- **时长**：约 4 分钟

### P5 三大能力①：记忆

- **本页是什么**：讲 Agent 的第一大能力——记忆，以及它的分层和载体。
- **开场/衔接话术**：
  「Agent 要像人一样干活，需要三样本事：记得住（记忆）、会动手（工具）、有章法（规划）。我们先看记忆。没有记忆的 Agent，每句话都像得了失忆症。」
- **核心讲解**：
  记忆分三类，对应人类的记忆模式：**感觉记忆**——刚输入的那条文本、图片，像你看一眼照片后留下的印象，转瞬即逝但很鲜活；**短期记忆**——本次对话的上下文，像你记几个数字，短时间内能记住，对话结束就忘；**长期记忆**——需要持久保存的知识，像你学会了骑自行车，隔很久还会骑，这类记忆通常存进向量数据库。那么记忆的技术载体是什么？就是我们第 4、5 讲反复接触的 **Embedding + 向量相似度计算**：把内容变成向量存起来，需要时算相似度把最相关的「记忆」捞出来。所以你会发现，前面学的 RAG 其实是 Agent「长期记忆」的一种实现——**RAG 就是 Agent 的外置长期记忆**。
- **页面关键元素指引**：
  指着三类记忆横排卡片，用「照片印象 / 记数字 / 骑自行车」三个生活化类比讲清楚；再点出「Embedding 是记忆载体」这个技术落点。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：Agent 的「长期记忆」和上一讲的 RAG 知识库，是一回事吗？
  - A：本质上是一个套路——向量化 + 相似度检索。区别在用途：RAG 侧重「外部知识库」，长期记忆侧重「Agent 自己的历史交互经验」。技术上高度重合，可以一起理解。
- **时长**：约 4 分钟

### P6 三大能力②：工具

- **本页是什么**：讲 Agent 的第二大能力——工具，以及模型接入工具的三种方式和主流模型支持情况。
- **开场/衔接话术**：
  「有记忆还不够，Agent 还得『会动手』。模型再聪明，也不能直接去查数据库、调 API、发邮件——它需要『工具』。这一页看工具怎么接进来。」
- **核心讲解**：
  「AI 懂得用工具才会更像人类。」目前模型接入工具有三种方式：**① 函数调用（Function Call）**——你向模型描述一个函数的作用和参数结构（比如 JSON 对象），模型在需要时输出「调用这个函数、参数是这个」的指令，由程序去真正执行。这是目前最主流的方式。**② 插件系统（Plugin）**——把工具做成标准化接口，人人可用，等于「公共版的函数调用」。**③ 模型内嵌工具**——模型自带的能力，比如 OpenAI 的 `file_search` 文件搜索、`code_interpreter` 代码解释器，模型直接调用，不用你额外接。主流模型支持情况：**GPT-5、Claude Opus 5、DeepSeek V4-Flash、Qwen 现在都原生支持 Function Call**。这意味着我们下面要做的龙虎榜 Agent，本地模型和云模型都能跑。
- **页面关键元素指引**：
  指着「工具三方式」和「模型支持表」，强调 Function Call 是主流、且主流模型全支持，为 P7 的实战铺路。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：Function Call 和 Plugin 有啥区别？
  - A：Function Call 是你自己定义、自己用的「私有工具」；Plugin 是做成标准接口、公开共享的「公共工具」。前者灵活，后者可复用、可分发。
- **时长**：约 4 分钟

### P7 Function Calling 原理

- **本页是什么**：深入讲 Function Calling 的「两次调用」闭环机制。
- **开场/衔接话术**：
  「工具里最重要的是 Function Call，那它到底怎么工作的？很多人以为模型『直接帮你调了函数』，其实不是。它背后有个『两次调用』的精妙设计，这一页拆开看。」
- **核心讲解**：
  Function Calling 的核心是「**两次调用模型**」。**第一次调用**：你把一堆函数的「描述 + 参数格式」告诉模型，模型分析你的问题后，判断「该不该用工具、用哪个、参数填什么」，然后**返回一个结构化的 JSON 参数**——比如你的问题要查龙虎榜，它就返回 `{"name": "get_lhb", "arguments": {"date": "2026-08-13"}}`。注意，模型到这里**并没有真正执行任何函数**，它只是「表达意图」。**程序拿到这个 JSON 后，由你（或框架）去真正调用那个函数**，得到结果。**第二次调用**：把函数执行结果回传给模型，模型结合结果生成最终的、给用户看的自然语言答案。所以整个闭环是：**描述函数 → 模型返回 JSON 参数 → 程序执行 → 回传结果 → 模型生成答案**。理解这个「两次调用」，你就理解了 Agent 工具调用的全部秘密。
- **页面关键元素指引**：
  指着时序图，一步一步走「描述函数 → 第一次调用（返回 JSON）→ 程序执行 → 第二次调用（生成答案）」，重点停顿在「模型不真正执行函数，只表达意图」这个反直觉的点上。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：模型为什么不直接执行函数？非要多绕一圈？
  - A：因为模型本质是「文本生成器」，它只能产出文字，不能直接操作系统、网络、文件。真正的执行必须由你的程序来做，模型只负责「决策 + 填参数」。这个设计也把「决策」和「执行」解耦了，更安全可控。
- **时长**：约 5 分钟

### P8 实战①：龙虎榜查询 Agent（Hero · Live Demo）

- **本页是什么**：全讲第一个高潮——用一个完整 Agent 演示「工具声明 → 模型 → 组装 → 执行」四步。
- **开场/衔接话术**：
  「原理懂了，直接上手。我们要做一个『龙虎榜查询 Agent』：你问它今天龙虎榜上有哪些股票，它能自己判断日期、自己调接口、自己把结果总结给你。大家看屏幕。」
- **核心讲解**：
  这个 Agent 分四步。**第一步，声明工具**：用 `@tool` 装饰器把普通 Python 函数变成工具，两个工具——`get_current_day` 拿今天日期（因为模型不知道「今天」是哪天），`get_lhb` 调东方财富公开接口拿龙虎榜数据，`args_schema` 定义了入参格式，`date` 字段用 `YYYY-MM-DD` 描述清楚。**第二步，创建模型**：用 `ChatOpenAI` 走硅基流动的兼容接口（`base_url` 指向 `api.siliconflow.cn`），模型用支持函数调用的 `Qwen/Qwen3-235B-A22B`；本地也能换成 `deepseek-v4-flash`。**第三步，组装**：`create_tool_calling_agent` 把「模型 + 工具 + 提示词」绑在一起。**第四步，执行**：`AgentExecutor` 驱动整个循环，`invoke({"input": "帮我查询一下今天的龙虎榜数据"})` 就能看到模型自动判断日期 → 调用 `get_lhb` → 拿到数据 → 总结成答案的全过程。
- **页面关键元素指引**：
  左代码右说明，逐段高亮：`@tool` 声明 → `ChatOpenAI` 建模型 → `create_tool_calling_agent` 组装 → `AgentExecutor.invoke` 执行。右半边配「思考 → 调工具 → 拿结果 → 回答」的流程图。
- **现场动作/Demo**：
  **Live Demo**：现场运行 `agent_demo.py`，输入「帮我查询一下今天的龙虎榜数据」。打开 `verbose=True`，让学员在终端看到 Agent 的完整推理过程：模型如何先调 `get_current_day` 拿到今天日期，再带着日期调 `get_lhb`，最后总结输出。重点指认「两次调用」在日志里的体现。
- **可能的学员提问 & 回答**：
  - Q：为什么还要一个 `get_current_day` 工具？模型不知道自己训练的时间吗？
  - A：模型不知道「此刻」的实时时间，它会凭空猜一个日期去查，很可能查不到。所以给它一个拿当前日期的工具，是 Agent 实战里很经典的细节。
  - Q：龙虎榜接口是公开的吗？会不会失效？
  - A：是东方财富的公开数据接口，不需要鉴权，但接口格式可能随网站改版变动。如果失效，重点是理解「工具声明 + 函数调用」这套机制，接口本身可替换成任何你自己的 API。
- **时长**：约 7 分钟

### P9 Agent 类型对比

- **本页是什么**：对比 LangChain 里三种 Agent 类型，并讲清 agent_scratchpad 的作用。
- **开场/衔接话术**：
  「刚才我们用了 `create_tool_calling_agent`。但其实 LangChain 里有好几种 Agent，长得像但脾气不同。这一页把它们摆一起，免得你以后看代码犯迷糊。」
- **核心讲解**：
  三种常见 Agent：**Tool Calling Agent**（`create_tool_calling_agent`）——依赖模型原生的函数调用能力，模型直接返回结构化的工具调用参数对象，最干净高效，前提是模型支持 Function Call；**ReAct Agent**（`create_react_agent`）——遵循「Thought 思考 → Action 行动 → Observation 观察」的循环，每步用自然语言选择工具，兼容性好、过程可读，上一讲 RAG 的 Agent 就是这种；**Structured Chat Agent**——必须严格遵循预定义的响应模板，参数格式卡得很死，通常一次性完成工具选择。三者的本质区别在于「模型怎么表达工具调用」。再补一个关键占位符 **`agent_scratchpad`**：它在提示词里占个位置，用来记录和传递 Agent 的中间推理步骤——上一轮想了啥、调了啥工具，都写在这里面，喂给下一轮，让模型知道「自己进行到哪了」。**没有它，Agent 就是个健忘的复读机。**
- **页面关键元素指引**：
  指着三类型对比表，重点讲 Tool Calling 和 ReAct 的区别（结构化 vs 自然语言）；再单独圈出 `agent_scratchpad`，强调它的「中间步骤记事本」作用。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：三种 Agent 我该选哪个？
  - A：模型支持 Function Call 就用 Tool Calling（最稳最省 Token）；模型不支持或想看得更清楚就用 ReAct；Structured Chat 用得较少。默认先试 Tool Calling。
- **时长**：约 4 分钟

### P10 为什么要 LangGraph

- **本页是什么**：讲线性 Chain 的局限，引出需要「图工作流」的场景。
- **开场/衔接话术**：
  「到这里，我们做的 Agent 都是『一条线』跑到底。但真实场景里，任务常常不是线性的，它需要循环、需要状态、需要断点续跑。这时候线性 Chain 就捉襟见肘了，于是有了 LangGraph。」
- **核心讲解**：
  线性 Chain 的短板很明显：**不能循环**——某个工具调错了、结果不对，Chain 没法「退回去重来」，只能一条道走到黑；**状态难保存**——一个任务中间有多个节点，每个节点的中间结果 Chain 不好存、不好查；**多模型难切换**——一个任务想在不同步骤用不同模型（强模型做规划、弱模型做执行），Chain 里切换很别扭；**断点续跑做不到**——跑到一半挂了，Chain 得从头再来。这四类需求，恰恰是复杂 Agent 的刚需。**LangGraph 用「图（Graph）」来建模工作流**：节点是步骤，边是流转关系，还天然支持循环、条件分支、状态持久化、人机交互。你可以把它理解成「有状态、能循环、可恢复的 Chain」。下一讲开始我们就用图来搭复杂工作流。
- **页面关键元素指引**：
  指着「线性 Chain 局限 vs LangGraph 方案」对照图，逐条对应「循环 / 状态 / 多模型 / 断点」四个痛点。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：LangGraph 和 LangChain 是替代关系吗？
  - A：不是，是互补。LangGraph 是 LangChain 生态里的高级编排框架，底层组件还是 LangChain 那些（模型、工具、Prompt）。简单的用 Chain，复杂的用 Graph。
- **时长**：约 4 分钟

### P11 LangGraph 三要素

- **本页是什么**：讲 LangGraph 的三大核心概念 State / Node / Edge，并给一个 HelloWorld 例子。
- **开场/衔接话术**：
  「LangGraph 再复杂，核心就三个词：State、Node、Edge。把这三个词吃透，你就拿到了 LangGraph 的钥匙。」
- **核心讲解**：
  **State（状态）**：整个工作流共享的上下文，用来存运行过程中产生的数据——任务状态、中间结果、消息列表等。它是图里流动的「血液」。**Node（节点）**：工作流里的一个步骤，可以是「调用 LLM」也可以是「调用工具」，是图里的「器官」。**Edge（边）**：节点之间的连接线，决定「执行完这个节点，下一步去哪」。边分两种：**普通边**（`add_edge`）——无条件直接流转；**条件边**（`add_conditional_edges`）——根据某个判断函数决定走哪条，循环就是靠条件边实现的。看 HelloWorld 例子：一个 `agent` 节点（调 LLM）、一个 `tools` 节点（调工具），`agent` 后面接条件边——如果模型说要调工具就走 `tools`，否则结束；`tools` 执行完再普通边回到 `agent`，形成循环。**记住：循环靠边上的条件判断。**
- **页面关键元素指引**：
  指着三要素卡 + Mermaid 状态图，重点讲「普通边 vs 条件边」，指出 `agent → tools → agent` 这个循环是怎么用条件边画出来的。
- **现场动作/Demo**：
  可现场运行 HelloWorld，输入「今天几号」，展示模型调工具拿日期；同时展示 `app.get_graph().draw_mermaid_png()` 生成的图，让学员看到图结构。
- **可能的学员提问 & 回答**：
  - Q：State 和前面说的「记忆」是一回事吗？
  - A：有重叠但不完全等同。State 是「本次工作流运行中的共享数据」，更像短期记忆 + 任务状态的集合；长期记忆还要外挂向量库。State 是 LangGraph 层面的技术概念，记忆是 Agent 层面的能力概念。
- **时长**：约 5 分钟

### P12 实战②：计划-执行-反思工作流（Live Demo）

- **本页是什么**：第二个高潮——用 LangGraph 搭一个「计划 → 执行 → 反思」的复杂工作流，演示 Reflexion 模式。
- **开场/衔接话术**：
  「最后一个实战，我们把 LangGraph 的威力拿出来。这个工作流模仿人做事的高级套路：先列计划、再逐步执行、执行完回头反思要不要调整。这就是『计划-执行-反思』模式。」
- **核心讲解**：
  这个工作流有三个节点。**Plan 节点**：用**强模型**把用户目标拆成一步步计划（比如「马拉松世界纪录保持者是谁」拆成「查世界纪录 → 确认保持者 → 总结」），输出一个 `Plan` 数据结构。**Execute 节点**：用**弱模型**（更小更快）去执行当前这一步，把结果记到 `past_steps`。**Replan 节点**：再回到强模型，审视「已经执行了哪些步骤、结果如何」，判断是「已经可以回答」还是「需要继续/调整计划」——这就是 Reflexion（自我反思）模式。核心设计亮点是**「强模型做规划、弱模型做执行」**：规划需要聪明的大脑，执行只需按指令办事，这样既省钱又高效。整个流程靠条件边循环，直到 Replan 判断可以结束。最后配置 `recursion_limit` 防止死循环。
- **页面关键元素指引**：
  指着「Plan → Execute → Replan」流程条，强调「强模型规划、弱模型执行」的设计，以及 Replan 节点的「反思」作用。
- **现场动作/Demo**：
  **Live Demo**：现场运行 `plan_execute.py`，输入「请问马拉松世界纪录保持者是谁」，用 `astream` 逐步打印每个节点的输出，让学员看到 Plan 先出计划、Execute 逐步执行、Replan 判断结束的完整过程。如果现场网络不允许联网搜索，可把问题换成不需要外部工具的例子演示流程结构。
- **可能的学员提问 & 回答**：
  - Q：为什么执行用弱模型，不怕做不好吗？
  - A：因为执行步骤已经被强模型拆得很明确、很具体，弱模型只需「照着做」，不需要复杂推理。这样大幅降低成本。这个「规划-执行分离」是工业界很实用的省钱技巧。
- **时长**：约 6 分钟

### P13 人机交互与持久化

- **本页是什么**：讲 LangGraph 的持久化与多轮会话——checkpointer、thread_id、recursion_limit。
- **开场/衔接话术**：
  「工作流能跑了，还有三个工程细节让它『能上线』：断了能恢复、多轮能记住、循环能兜底。这就是本页的三要点。」
- **核心讲解**：
  第一个 **checkpointer（检查点）**：LangGraph 在每个节点执行后都会把状态存进检查点，配合 `MemorySaver`（还支持 Redis、MongoDB）就能做到**断点恢复**——任务跑到一半挂了，换个时间换个线程，还能从上次的节点接着跑，而不是从头再来。第二个 **thread_id（会话 ID）**：`invoke` 时传 `config={"configurable": {"thread_id": 42}}`，同一个 thread_id 就共享同一份状态，于是**多轮会话**就有了记忆——你问「今天几号」，下一句问「我刚刚问的哪天」，它能接着上下文答。第三个 **recursion_limit（递归上限）**：设置工作流最多循环多少次，防止 Agent 死循环把资源耗尽，这是生产环境的安全阀。**这三点加起来，Agent 才从『玩具』变成了『能放心跑的服务』。**
- **页面关键元素指引**：
  指着三要点卡片，重点演示 `thread_id` 多轮会话的效果，以及 `recursion_limit` 的兜底意义。
- **现场动作/Demo**：
  现场演示：用同一个 `thread_id` 连续两次 `invoke`，展示第二次能记住第一次的问答内容；再演示设置 `recursion_limit` 后循环被安全截断。
- **可能的学员提问 & 回答**：
  - Q：`MemorySaver` 存内存，程序一关不就没了？
  - A：对，`MemorySaver` 只适合演示和开发。生产环境要换成 Redis、MongoDB、Postgres 等持久化后端，checkpointer 的接口是一样的，换后端只改一处配置。
- **时长**：约 4 分钟

### P14 总结

- **本页是什么**：收官页，用「大脑 + 手 + 记忆」总结 Agent，预告第 7 讲。
- **开场/衔接话术**：
  「好，今天的知识点用一个比喻收拢：**Agent 就是一个『大脑 + 手 + 记忆』的组合体**。我们把这个比喻展开，做最后的回顾。」
- **核心讲解**：
  **大脑**——LLM 推理引擎，负责思考和决策，靠思维链等技巧激发推理能力；**手**——工具，通过 Function Calling 让模型能调外部函数、真正执行任务；**记忆**——记忆模块，靠 Embedding + 向量库实现短期和长期记忆。这三样拼起来，再配合 LangGraph 的图工作流（State / Node / Edge）做编排，加上 checkpointer / thread_id 做持久化和多轮会话，一个「能自主做事的 Agent」就成型了。今天你完成了从「会回答」到「会做事」的跨越，这是 M3 毕业项目的地基。**但还有一个问题没解开：Agent 内部那个「思考→行动→观察」的循环，到底是怎么一步步跑起来的？** 这就是第 7 讲《Agent 运行机制》的内容——下节课，我们用 50 行代码把 Agent Loop 拆开给你看。
- **页面关键元素指引**：
  指着「大脑 + 手 + 记忆」总结图，逐项回顾；念一遍课后练习和自测；抛出第 7 讲的钩子。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：学完这讲能独立做 Agent 应用了吗？
  - A：能做出「带工具调用」的 Agent 了。但要「跑得稳、敢上线」，还需要第 7 讲的运行机制、第 8 讲的工程化（评测 + 安全）。今天是你 Agent 之路的第一步。
- **时长**：约 2 分钟

---

## 二、代码示例与演示脚本

> 说明：以下代码从素材原文 ai-learn09/10/11.md 提取整理；按 V3 大纲，龙虎榜实战可用本地 `deepseek-v4-flash` 或硅基流动 `Qwen`，本讲主推云 API（更稳），本地模型作为备选。

### 1. agent_demo.py —— 龙虎榜查询 Agent（Function Calling）

```python
# agent_demo.py：龙虎榜查询 Agent（工具声明 + Function Calling）
from datetime import date
import requests
import json
from pydantic import BaseModel, Field

from langchain_core.tools import tool
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_openai import ChatOpenAI

# ---------- 第一步：声明工具 ----------
# 工具 1：获取当前日期（解决模型不知道「今天」是哪天的问题）
@tool
def get_current_day():
    """获取今天的时间"""
    return date.today().strftime("%Y-%m-%d")

# 工具 2：获取龙虎榜数据（东方财富公开接口）
class LhbInput(BaseModel):
    date: str = Field(description="date, format is YYYY-MM-DD")

@tool(args_schema=LhbInput)
def get_lhb(date: str):
    """获取龙虎榜数据"""
    print("开始获取%s龙虎榜" % date)
    callback = "jQuery1123029212767559503716_1747729555061"
    url = (
        f"https://datacenter-web.eastmoney.com/api/data/v1/get?callback={callback}"
        f"&sortColumns=SECURITY_CODE%2CTRADE_DATE&sortTypes=1%2C-1&pageSize=200&pageNumber=1"
        f"&reportName=RPT_DAILYBILLBOARD_DETAILSNEW"
        f"&columns=SECURITY_CODE%2CSECUCODE%2CSECURITY_NAME_ABBR%2CTRADE_DATE%2CEXPLAIN%2C"
        f"CLOSE_PRICE%2CCHANGE_RATE%2CBILLBOARD_NET_AMT%2CBILLBOARD_BUY_AMT%2CBILLBOARD_SELL_AMT%2C"
        f"BILLBOARD_DEAL_AMT%2CACCUM_AMOUNT%2CDEAL_NET_RATIO%2CDEAL_AMOUNT_RATIO%2CTURNOVERRATE%2C"
        f"FREE_MARKET_CAP%2CEXPLANATION%2CD1_CLOSE_ADJCHRATE%2CD2_CLOSE_ADJCHRATE%2CD5_CLOSE_ADJCHRATE%2C"
        f"D10_CLOSE_ADJCHRATE%2CSECURITY_TYPE_CODE&source=WEB&client=WEB"
        f"&filter=%28TRADE_DATE%3C%3D%27{date}%27%29%28TRADE_DATE%3E%3D%27{date}%27%29"
    )
    response = requests.get(url)
    content = response.content.decode("utf-8")
    # 接口返回的是 JSONP，剥掉 callback 包裹拿到纯 JSON
    content = content.split(callback + "(")[1].split(");")[0]
    return json.loads(content).get("result")

# ---------- 第二步：创建 LLM 模型 ----------
# 走硅基流动的 OpenAI 兼容接口（也可换成本地 deepseek-v4-flash）
llm = ChatOpenAI(
    base_url="https://api.siliconflow.cn",
    model="Qwen/Qwen3-235B-A22B",   # 支持 Function Call；可按需更换
    api_key="<你的硅基流动 API KEY>",
)

# ---------- 第三步：创建 Prompt ----------
# agent_scratchpad 占位符：记录/传递 Agent 的中间推理步骤，非常重要
prompt = ChatPromptTemplate.from_messages(
    [
        ("system", "你是人工智能助手"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
        ("human", "{input}"),
    ]
)

# ---------- 第四步：组装并执行 ----------
tools = [get_current_day, get_lhb]

agent = create_tool_calling_agent(llm, tools, prompt)

agent_executor = AgentExecutor(
    agent=agent,
    tools=tools,
    handle_parsing_errors=True,   # 解析出错时把错误回传给模型，让它重新生成
    verbose=True,                 # 打印中间步骤，便于理解推理过程
)

# 调用
print(agent_executor.invoke({"input": "帮我查询一下今天的龙虎榜数据"}))
```

### 2. langgraph_hello.py —— LangGraph HelloWorld（三要素 + 多轮会话）

```python
# langgraph_hello.py：LangGraph HelloWorld（日期工具 Agent + thread_id 多轮会话）
from typing import Literal
from datetime import datetime

from langchain_core.tools import tool
from langchain_core.messages import HumanMessage
from langchain_ollama import ChatOllama

from langgraph.graph import END, StateGraph, MessagesState
from langgraph.checkpoint.memory import MemorySaver
from langgraph.prebuilt import ToolNode

# 工具：获取今天日期
@tool
def get_current_day():
    """获取今天日期"""
    return datetime.now().strftime("%Y-%m-%d")

tools = [get_current_day]
# 工具节点：负责真正执行工具
tool_node = ToolNode(tools)

# 把工具列表绑定到大模型上
llm = ChatOllama(
    base_url="http://localhost:11434",
    model="deepseek-v4-flash",   # 原素材 qwen3:32b；V3 大纲用 deepseek-v4-flash
).bind_tools(tools)

# Node：调用 LLM
def call_llm(state: MessagesState):
    messages = state['messages']
    response = llm.invoke(messages)
    return {"messages": response}

# 1. 定义工作流和初始化状态（State）
workflow = StateGraph(MessagesState)

# 2. 添加节点（Node）
workflow.add_node("agent", call_llm)
workflow.add_node("tools", tool_node)

# 3. 定义入口
workflow.set_entry_point("agent")

# 4. 条件边（Edge）：模型是否要调工具，决定去 tools 还是结束
def should_continue(state: MessagesState) -> Literal["tools", END]:
    last_message = state['messages'][-1]
    if last_message.tool_calls:
        return "tools"
    return END

workflow.add_conditional_edges("agent", should_continue)

# 5. 普通边：tools 执行完回到 agent，形成循环
workflow.add_edge("tools", "agent")

# 6. checkpointer：每个节点后自动保存状态，支持断点恢复
checkpointer = MemorySaver()
app = workflow.compile(checkpointer=checkpointer)

# 7. 执行（单轮）
final_state = app.invoke({"messages": [HumanMessage(content="今天几号")]})
print(final_state["messages"][-1].content)

# 8. 多轮会话：同一个 thread_id 共享状态
final_state = app.invoke(
    {"messages": [HumanMessage(content="今天几号")]},
    config={"configurable": {"thread_id": 42}},
)
print(final_state["messages"][-1].content)

# 9. 第二次问「我刚刚问的哪天」，模型能接着上文回答
final_state = app.invoke(
    {"messages": [HumanMessage(content="我刚刚问的哪天")]},
    config={"configurable": {"thread_id": 42}},
)
print(final_state["messages"][-1].content)

# 10. 导出图结构图片（可选）
graph_png = app.get_graph().draw_mermaid_png()
with open('langgraph1.png', 'wb') as f:
    f.write(graph_png)
```

### 3. plan_execute.py —— 计划-执行-反思工作流

```python
# plan_execute.py：计划-执行-反思工作流（Reflexion 模式）
# 设计思想：强模型做规划/反思，弱模型做执行，省钱又高效
import asyncio
from typing import Annotated, List, Tuple, TypedDict, Union

from pydantic import BaseModel, Field

from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama
from langgraph.prebuilt import create_react_agent
from langgraph.graph import START, StateGraph, END

# ---------- 数据结构 ----------
# Plan：计划模型类
class Plan(BaseModel):
    """计划任务"""
    steps: List[str] = Field(description="需要执行的不同步骤，应该按照顺序执行")

# 工作流整体状态
class PlanExcuteState(TypedDict):
    input: str                              # 用户输入
    plan: List[str]                         # 拆分出的计划步骤
    past_steps: Annotated[List[Tuple], "operator.add"]  # 已执行步骤（用 add 累加）
    response: str                           # 最终答案

# Response：最终返回结构
class Response(BaseModel):
    """返回给用户的结果"""
    response: str

# Action：Replan 节点的决策（要么回答，要么继续出新计划）
class Action(BaseModel):
    """要执行的行为"""
    action: Union[Response, Plan] = Field(
        description="要执行的行为。如果要回应用户，使用Response。如果需要进一步获取答案，使用Plan"
    )

# ---------- 节点一：计划（用强模型） ----------
plan_prompt = ChatPromptTemplate([
    ("system", "对于给定的目标，提出一个简单逐步计划。这个计划应该包含独立的任务，如果正确执行将得出正确的答案，不要添加任何多余的步骤，最后一步的结果应该是最终答案。确保每一步都有必要的信息- 不要跳过步骤"),
    ("placeholder", "{messages}"),
])

plan_langchain = plan_prompt | ChatOllama(
    base_url="http://localhost:11434",
    model="deepseek-v4-flash",   # 原素材 qwen3:32b；规划对模型要求较高
    temperature=0,
).with_structured_output(Plan)

async def plan_step(state: PlanExcuteState):
    plan = await plan_langchain.ainvoke({"messages": [("user", state["input"])]})
    return {"plan": plan.steps}

# ---------- 节点二：执行（用弱模型） ----------
llm = ChatOllama(
    base_url="http://localhost:11434",
    model="deepseek-v4-flash",   # 执行步骤明确，可用更小模型
    temperature=0,
)

agent_prompt = ChatPromptTemplate([
    ("system", "你是一个很有用的助手，需要按照计划帮用户执行步骤"),
    ("placeholder", "{messages}"),
])

# 执行者 Agent（这里 tools 可替换为你需要的工具，如联网搜索 tavily）
tools = []   # 按需填充工具列表，例如 [get_current_day]
agent_executor = create_react_agent(llm, tools, prompt=agent_prompt)

async def execute_step(state: PlanExcuteState):
    steps = state["plan"]
    step_str = "\n".join(f"{i + 1}. {step}" for i, step in enumerate(steps))
    task = steps[0]
    task_format = f"对于以下计划：\n{step_str}\n\n\n你的任务是执行第1步, {task}。"
    agent_response = await agent_executor.ainvoke({"messages": [("user", task_format)]})
    content = agent_response["messages"][-1].content
    return {"past_steps": state["past_steps"] + [(task, content)]}

# ---------- 节点三：反思/更新计划（用强模型） ----------
# 注：素材原文 replan_prompt 未给出，讲稿此处补全（含义与官方示例一致）
replan_prompt = ChatPromptTemplate([
    ("system", "对于给定的目标、已经执行的步骤和结果，判断是否已经可以给出最终答案。如果可以，用 Response 回应用户；如果还需要继续执行，用 Plan 给出下一步计划。"),
    ("placeholder", "{messages}"),
])

replan_langchain = replan_prompt | ChatOllama(
    base_url="http://localhost:11434",
    model="deepseek-v4-flash",
    temperature=0,
).with_structured_output(Action)

async def replan_step(state: PlanExcuteState):
    output = await replan_langchain.ainvoke(state)
    if isinstance(output.action, Response):
        return {"response": output.action.response}
    else:
        if len(output.action.steps) <= 0:
            return {"plan": state["plan"]}
        return {"plan": output.action.steps}

# ---------- 组装 LangGraph 工作流 ----------
workflow = StateGraph(PlanExcuteState)
workflow.add_node("planner", plan_step)
workflow.add_node("execute", execute_step)
workflow.add_node("replan", replan_step)

workflow.add_edge(START, "planner")
workflow.add_edge("planner", "execute")
workflow.add_edge("execute", "replan")

# 结束判断：有 response 就结束，否则继续 execute
def is_end(state: PlanExcuteState):
    if "response" in state and state["response"]:
        return "___end___"
    return "execute"

workflow.add_conditional_edges("replan", is_end)

app = workflow.compile()

# recursion_limit：最大循环次数，防止死循环
config = {"recursion_limit": 15}

inputs = {"input": "请问马拉松世界纪录保持者是谁"}

async def main():
    async for event in app.astream(inputs, config=config):
        for key, value in event.items():
            if key != '__end__':
                print(f"{key}: {value}")
            else:
                print(value)

asyncio.run(main())
```

---

## 三、动手练习与参考答案

**练习题目**：把龙虎榜 Agent 换成自己的工具（如天气查询 / 股票查询 API），实现一个「查询 X 并总结」的 Agent。

**参考答案（核心代码）**：

```python
# 练习：天气查询 Agent
from datetime import date
import requests
from pydantic import BaseModel, Field

from langchain_core.tools import tool
from langchain.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents import create_tool_calling_agent, AgentExecutor
from langchain_openai import ChatOpenAI

# 工具：查询城市天气（示例用公开接口，可替换成你自己的 API）
class WeatherInput(BaseModel):
    city: str = Field(description="城市名，例如：北京")

@tool(args_schema=WeatherInput)
def get_weather(city: str):
    """查询指定城市的实时天气"""
    # 示例：使用 wttr.in 公开接口（返回文本格式天气）
    resp = requests.get(f"https://wttr.in/{city}?format=j1")
    data = resp.json()
    current = data["current_condition"][0]
    return f"{city} 当前温度 {current['temp_C']}°C，天气 {current['lang_zh'] if False else current['weatherDesc'][0]['value']}"

llm = ChatOpenAI(
    base_url="https://api.siliconflow.cn",
    model="Qwen/Qwen3-235B-A22B",
    api_key="<你的 API KEY>",
)

prompt = ChatPromptTemplate.from_messages([
    ("system", "你是人工智能助手，请调用工具查询后，用简洁的话总结结果。"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
    ("human", "{input}"),
])

tools = [get_weather]
agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

print(executor.invoke({"input": "北京今天天气怎么样？一句话总结"}))
```

**练习验收要点**：
- Agent 能正确识别用户意图、自动调用你的工具、并把工具返回结果总结成自然语言。
- 工具函数加了清晰的 docstring 和 `args_schema`（参数描述准确），模型能正确填参。
- 能说出这个 Agent 走的是 Function Calling 的「两次调用」机制。

---

## 四、自测题答案

**① Agent 的三大能力？**

答：**记忆、工具、规划**。记忆让 Agent 记住上下文和历史经验（靠 Embedding + 向量库实现，分感觉/短期/长期记忆）；工具让 Agent 能调用外部函数、真正执行任务（靠 Function Call / Plugin / 内嵌工具）；规划让 Agent 能把复杂目标拆成可执行步骤（靠思维链 CoT 及 ReAct / Reflexion 等推理模式激发）。三者叠加，加上「行动 + 反馈」闭环，构成 Agent。

**② Function Calling 的两次调用分别做什么？**

答：**第一次调用**：模型根据你提供的函数描述，判断是否调用工具，并返回结构化的 JSON 参数（函数名 + 参数），但模型本身并不执行函数；**第二次调用**：程序按 JSON 参数真正执行函数后，把执行结果回传给模型，模型结合结果生成最终的自然语言答案。即「第一次定意图、填参数，第二次拿结果、写答案」。

**③ LangGraph 的 State / Node / Edge 各是什么？**

答：**State（状态）**：工作流共享的上下文，存储运行过程中产生的数据（任务状态、中间结果、消息等）；**Node（节点）**：工作流中的一个处理步骤，如「调用 LLM」或「调用工具」；**Edge（边）**：节点之间的连接与流转关系，分普通边（`add_edge`，无条件流转）和条件边（`add_conditional_edges`，按判断函数路由），循环就是靠条件边实现的。

---

## 五、常见坑位提醒

1. **本地模型不支持 Function Call**：用本地小模型跑龙虎榜 Agent 时，若模型不返回 `tool_calls`，Agent 会「发呆」不调工具。优先用支持函数调用的模型（deepseek-v4-flash 或硅基流动 Qwen 系列），本地小模型务必先验证工具调用能力。
2. **api_key 没填或写错**：`ChatOpenAI` 调硅基流动时 401 报错。确认 `api_key` 正确、`base_url` 是 `https://api.siliconflow.cn`。
3. **`agent_scratchpad` 占位符缺失**：忘写 `MessagesPlaceholder(variable_name="agent_scratchpad")` 会导致 Agent 报错或丢失中间推理步骤，这是 Function Calling 的硬性要求。
4. **龙虎榜接口失效**：东方财富公开接口可能随网站改版变动，返回为空或解析报错。重点是理解「工具声明 + 调用」机制，接口可替换成自己的 API；调试时先单独调通 `get_lhb` 再放进 Agent。
5. **`thread_id` 没传导致「失忆」**：多轮会话忘传 `config={"configurable": {"thread_id": ...}}`，第二次提问模型不记得上文。检查是否复用同一个 thread_id。
6. **`MemorySaver` 不持久**：程序重启后状态丢失。生产环境换 Redis / Mongo / Postgres 等持久化 checkpointer。
7. **死循环**：Agent 反复调工具停不下来，务必设置 `recursion_limit` 兜底。
8. **素材原文 `replan_prompt` 未定义**：计划-执行-反思示例里，`replan_langchain` 引用了未给出的 `replan_prompt`，本讲稿已补全（语义与官方示例一致）；自己实现时注意别漏掉这个变量定义。
9. **`create_react_agent` 导入路径**：LangGraph 的 `create_react_agent` 在 `langgraph.prebuilt`，和 LangChain 老版的 `langchain.agents.create_react_agent` 不同，别混用。
10. **`with_structured_output` 要求模型支持**：让模型按 `Plan` / `Action` 结构输出，需模型支持结构化输出/JSON 输出能力；本地小模型可能不稳定，可用更强的模型或降低结构复杂度。
