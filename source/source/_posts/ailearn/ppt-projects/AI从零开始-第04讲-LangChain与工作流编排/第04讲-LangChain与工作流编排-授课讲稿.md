# 第 4 讲 · LangChain 与工作流编排 授课讲稿

> 讲师逐页演讲脚本 · 配套《AI从零开始-第04讲-LangChain与工作流编排-优化版.pptx》 · 时长 50 分钟

---

## 〇、课前准备清单

### 需安装的软件（含版本建议、安装命令、下载地址）

| 软件 | 版本建议 | 作用 | 安装命令 / 下载地址 |
|------|---------|------|-------------------|
| Python | 3.11 ~ 3.12 | 运行环境 | https://www.python.org/downloads/ |
| venv | Python 自带 | 虚拟环境隔离 | `python -m venv venv` |
| LangChain 全家桶 | langchain 0.3.x | 主框架 | `pip install langchain langchain-community langchain-ollama` |
| langchain-cli | 最新版 | LangServe 脚手架 | `pip install -U langchain-cli` |
| poetry | 最新版 | LangServe 项目依赖管理 | `pip install pipx && pipx ensurepath && pipx install poetry` |
| Ollama | 已装（第 2 讲） | 本地大模型运行时 | https://ollama.com/download |
| Apifox | 最新版 | REST 接口测试 | https://apifox.com/ |

```bash
# 完整安装流程（在项目目录内执行）
mkdir ai-learn04-langchain && cd ai-learn04-langchain
python -m venv venv
. venv/bin/activate          # Windows 用 venv\Scripts\activate
pip install langchain langchain-community langchain-ollama
pip install -U langchain-cli
```

### 需注册 / 准备的账号或 API Key

- **本地模型（推荐，本讲主线）**：`ollama pull deepseek-v4-flash`，无需 API Key。
  - 说明：本系列 V3 大纲已把模型从 DeepSeek-R1 升级为 **DeepSeek V4-Flash**；如果本地机器拉不动大模型，可降级为 `qwen3:32b` 或更小模型。
- **云 API（可选，备用方案）**：注册硅基流动 https://cloud.siliconflow.cn 获取 API Key，用于演示 `ChatOpenAI` 兼容接口调用。
- **LangSmith（第 12 页演示用，可选）**：https://smith.langchain.com 注册账号，获取 `LANGSMITH_API_KEY`。不上报日志可跳过，仅用 `set_verbose` / `set_debug` 替代。

### 课前需跑通的 demo（如有）

1. 确认 Ollama 服务已启动，`ollama list` 能看到 `deepseek-v4-flash`。
2. 跑通 `demo1.py`（见「二、代码示例」），终端能打印出一段 AI 生成的文字。
3. （可选）跑通 `FewShot` 示例，确认中文 embedding 模型 `shaw/dmeta-embedding-zh` 已拉取：`ollama pull shaw/dmeta-embedding-zh`。

### 教室环境要求

- **投影**：需能看清代码，建议投影分辨率 1080P 以上，代码字体调大（编辑器字号 ≥ 16）。
- **网络**：本地 Ollama 演示不依赖外网；若现场演示云 API / LangSmith 需外网。
- **是否现场演示**：是。本讲有 3 处 Live Demo（P6 第一次调用、P10 LCEL 实战、P11 LangServe 部署），请提前在讲课机预装并跑通所有 demo，避免现场翻车。
- 建议准备一台备用机器或提前录好演示录屏，防止现场环境异常。

---

## 一、逐页讲稿

### P1 封面

- **本页是什么**：本讲封面，一句话点出主题——为什么需要框架，以及 LangChain 能帮你做什么。
- **开场/衔接话术**：
  「前面三讲，我们搞清楚了 AI 是什么、怎么在本地把模型跑起来、怎么写出好 Prompt。到了今天这一讲，我们要跨过一道坎——从『单次调用大模型』升级到『开发真正的 LLM 应用』。你有没有这种感觉：调一个模型很容易，但想把它做成一个能用、能改、能上线的产品，突然就不知道从哪下手了。今天要讲的 LangChain，就是来解决这个问题的。它的口号可以浓缩成一句话：**框架让 LLM 应用开发变简单**。」
- **核心讲解**：
  大家回想一下，前面写 Prompt、调 Ollama，本质上都是「发一句话、收一句话」。但一个真正的应用，往往需要好几个组件一起工作：模型调用、记忆、外部数据、业务逻辑。这些组件谁先谁后、数据怎么流转、出错了怎么兜底，全靠手工拼接的话，代码会越来越像一坨意大利面。LangChain 的定位就是一个「LLM 应用开发框架」，它把开发中最常见的重复劳动——多组件集成、上下文管理、流程编排——抽象成了标准化的积木。学完这一讲，你要能自己搭出一条「调用流水线」，并且把它部署成一个别人能调用的服务。
- **页面关键元素指引**：
  指着封面主标题强调「框架让 LLM 应用开发变简单」这十个字；下方的副标题或装饰图不用细讲，让学员建立「今天要解决开发效率问题」的预期即可。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：LangChain 是不是很快就会被淘汰？网上老说它迭代太快。
  - A：框架层确实迭代快，但「把组件标准化、用链式方式编排」这套思想是稳定的。我们这讲学的是思想 + 最小可用用法，哪怕它版本变了，你也能快速迁移。别被版本号吓住。
- **时长**：约 2 分钟

### P2 裸调大模型的痛点

- **本页是什么**：讲清楚「不用框架、直接裸调大模型」会遇到哪四类麻烦，为引入 LangChain 做铺垫。
- **开场/衔接话术**：
  「在讲 LangChain 之前，先问一句：不引入任何框架，就靠最原始的 API 调用，能做出应用吗？能，但你会很快撞上四面墙。我们来看这四面墙分别是什么。」
- **核心讲解**：
  第一面墙是**没有记忆**。你每次调用模型，它都不记得上一句说了什么，多轮对话得你自己把历史消息拼回去。第二面墙是 **Token 上限**。模型一次能处理的上下文是有限的，对话一长、资料一多，你得自己想办法裁剪、压缩。第三面墙是**无法验证正确性**。模型输出是个「黑盒字符串」，它一本正经说错话，你的程序根本不知道对错，更没法拦截。第四面墙是**多步推理低效**。一个复杂任务要拆成好几步、调好几次模型，中间还有条件分支和循环，全写在 if-else 里，维护成本极高。这四面墙，正是 LangChain 要帮你推倒的——它分别对应了框架里的 Memory、上下文管理、输出解析与校验、链式编排这几个模块。
- **页面关键元素指引**：
  逐条点读四张痛点卡片（无记忆 / Token 限制 / 无法验证 / 多步低效），每点一条，停顿一下，让学员对号入座——「你们自己写裸调代码时，是不是也踩过？」
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：这四个痛点，是不是所有 LLM 应用都会遇到？
  - A：基本都会。哪怕最简单的对话应用也会撞上「无记忆」，稍微复杂点就撞上「多步推理」。所以框架的价值不是锦上添花，是刚需。
- **时长**：约 3 分钟

### P3 LangChain 是什么

- **本页是什么**：正式介绍 LangChain 的定义和两大核心价值。
- **开场/衔接话术**：
  「既然有四面墙，总得有个工具。这个工具就是 LangChain。官方给它的定义很朴素——『开发由大语言模型（LLM）提供支持的应用程序的框架』。我更喜欢用大白话讲：它是你搭 LLM 应用时的『乐高积木箱』。」
- **核心讲解**：
  怎么理解「框架」两个字？你可以把它类比成前端的 React、后端的 Spring。它们都不是替你写业务，而是把通用的、重复的、容易出错的底层活标准化了，让你专注业务。LangChain 干的事分两块：**一是简化开发**，比如调用不同厂商的模型，接口长得千奇百怪，LangChain 帮你统一成一个接口，换个模型只改一行配置；**二是标准化工具链**，从写 Prompt、连向量库、定义链，到部署、监控，它给了你一套完整的、彼此能拼接的零件。所以它不是一个「魔法」，而是一套「让 AI 应用开发有章可循」的规范。学完你会发现，之前手工拼的那些代码，这里都有现成的、更稳的写法。
- **页面关键元素指引**：
  指着页面上「官方定位」和「自理解」两块：官方定义念一遍，然后重点讲「自理解」的乐高积木类比，帮助学员建立心智锚点。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：LangChain 和直接调 OpenAI API 差在哪？感觉就多了一层封装。
  - A：单次调用确实没差多少。差距在「组合」和「切换」：你有 Prompt、记忆、检索、多步流程要串起来时，框架的价值就出来了。另外换模型零成本，这也是裸调做不到的。
- **时长**：约 3 分钟

### P4 必知概念

- **本页是什么**：一页「概念墙」，把 LangChain 生态里 10 个高频术语一次性扫盲。
- **开场/衔接话术**：
  「聊框架之前，得先对暗号。LangChain 的文档里有一堆术语，不先扫一遍，后面看代码会一直卡壳。这一页是概念地图，你不用现在全记住，但要有印象，后面每讲到一个，你都能对上号。」
- **核心讲解**：
  我按「原料 → 组装 → 能力」的逻辑帮大家串一遍。最底层的**原料**有三个：`LLM`（大模型本身）、`Prompt`（提示词模板）、`Embedding`（把文字变成向量，让机器能算语义相似度）。接着是**组装方式**：`Chain`（把多个步骤串成一条链）、`LCEL`（LangChain 表达式语言，用管道符 `|` 来搭链的语法）。然后是**外挂能力**：`RAG`（检索增强生成，给模型外接知识库）、`Agent`（让模型自己决策、自己调工具）、`Memory`（给模型加记忆）、`Vectorstore`（向量数据库，存 Embedding 用）、`OutputParser`（输出解析器，把模型的字符串结果转成结构化数据）。这 10 个词里，本讲重点讲 Chain、LCEL、Prompt、OutputParser，RAG 留给第 5 讲，Agent 留给第 6 讲，Embedding 和 Vectorstore 两讲都会用。
- **页面关键元素指引**：
  按「原料 → 组装 → 能力」的顺序，用手指在概念墙上划一条线，帮学员建立层次感，而不是孤立地念 10 个词。强调「本讲 vs 第 5 讲 vs 第 6 讲」的分工，避免信息过载。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：概念太多了，有没有必须死记的？
  - A：这一讲你只需要真正吃透 4 个：LLM、Prompt、Chain、LCEL。其余 6 个能「见面认出来」就行，后面讲到会再展开。
- **时长**：约 4 分钟

### P5 框架结构

- **本页是什么**：介绍 LangChain 的七层/七大组件架构，让学员知道「遇到问题该找哪个包」。
- **开场/衔接话术**：
  「概念认识完了，再看它的内部结构。很多人第一次打开 LangChain，会被一堆包名绕晕：langchain-core、langchain-community、langgraph……这一页帮你把地图摊开。」
- **核心讲解**：
  最底层是 **LangChain-Core**，它抽象了聊天模型、向量存储、工具这些核心组件的接口，尽量不依赖别的库，是「地基」。往上是 **LangChain** 主框架，对外的统一入口，集成绝大部分功能。再往上是两套「配件库」：**Integrations** 是主流厂商的官方集成包，比如 langchain-openai、langchain-anthropic，版本独立可控；**Community** 是社区维护的第三方集成，比如我们本讲要用的 langchain-ollama。旁边还有三个「高阶外挂」：**LangGraph** 用来做有状态、有循环的复杂工作流（第 6 讲主角）；**LangServe** 把你的链一键变成 RESTful 服务；**LangSmith** 是官方的调试、测试、监控平台。一句话记忆：Core 打底、LangChain 收口、Integrations/Community 接生态、Graph/Serve/Smith 管「复杂、部署、监控」。
- **页面关键元素指引**：
  指着分层图，从下往上逐层讲，重点标注本讲会实际用到的三块：`langchain-community`（或 langchain-ollama）、`LangServe`、`LangSmith`。告诉学员「LangGraph 今天只混个脸熟，第 6 讲深挖」。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：langchain 和 langchain-community 为什么要拆开装？
  - A：为了解耦和版本控制。核心框架稳定，但第三方集成更新频繁，拆开就能独立升级，不会因为某个集成包升级把整个框架带崩。
- **时长**：约 4 分钟

### P6 第一次调用（Hero · Live Demo）

- **本页是什么**：全讲第一个高潮——用 5 行代码跑通「模板 → 模型 → 输出解析器」的链式调用。
- **开场/衔接话术**：
  「讲再多不如跑一次。现在大家看屏幕，我们用 5 行代码，完成一次带模板的对话。这 5 行，就是 LangChain 最经典的心智模型，后面所有东西都在它上面长出来。」
- **核心讲解**：
  先看这行最关键的：`chain = prompt | llm | StrOutputParser()`。中间那个竖线 `|`，是 Python 的管道运算符，也是 LCEL 的灵魂——它把三个组件像水管一样接起来：`prompt` 负责把输入套进模板，`llm` 负责拿去问模型，`StrOutputParser` 负责把模型吐出来的原始字符串「收拾干净」交给你。你调用的时候只要 `chain.invoke({...})`，数据就会自动从左流到右，你不用手动写任何中间变量。这里的 `OllamaLLM` 是我们上一讲装的本地模型，`base_url` 指向 Ollama 服务，`model` 换成 `deepseek-v4-flash`。注意一个细节：`PromptTemplate` 里的 `{input}` 是个占位符，invoke 时用字典把它填上。**这就是框架的威力——把「调模型」这件小事，标准化成了一条可复用的流水线。**
- **页面关键元素指引**：
  左半屏代码逐行高亮：先 `OllamaLLM` 建模型，再 `PromptTemplate` 建模板，再 `|` 管道串联，最后 `invoke`。右半屏说明区对应「输入 → 模板 → 模型 → 解析 → 输出」的流向图。
- **现场动作/Demo**：
  **Live Demo**：现场切到编辑器，运行 `python demo1.py`，让学员看到终端打印出 AI 生成的文章。运行前先强调「这就是 5 行代码的效果」。如果模型响应慢，可以边说边等，顺便科普「本地模型推理速度」。
- **可能的学员提问 & 回答**：
  - Q：`StrOutputParser` 到底解析了什么？不写它行不行？
  - A：不写也能跑，但你拿到的是模型的原始返回对象（含很多元信息）。加了它，链的最终输出就是干净的纯字符串，方便你直接打印、传给别人。它是「收口」用的。
  - Q：那个 `|` 语法我怎么在别的 Python 库没见过？
  - A：它利用 Python 运算符重载，把 `|` 变成了「串联」的意思。这在 LCEL 里专门设计过，后两页会讲它背后的原理。
- **时长**：约 6 分钟

### P7 PromptTemplate 详解

- **本页是什么**：深入讲 Prompt 模板的两类用法——聊天消息角色和上下文占位符。
- **开场/衔接话术**：
  「刚才的模板是最简单的字符串版。但真实的对话是有『角色』的——谁是系统、谁是用户、谁是 AI。LangChain 专门为聊天场景准备了一个更强大的模板，叫 `ChatPromptTemplate`。」
- **核心讲解**：
  聊天模型的消息其实是分角色的：`system` 是给模型定人设的系统指令，`human` 是用户说的话，`ai` 是模型自己之前的回答。`ChatPromptTemplate.from_messages` 用一个数组把这些消息按顺序排好，每条消息第一个参数是角色，第二个参数是内容，内容里的 `{name}`、`{user_input}` 就是可填的模板参数。为什么要分角色？因为把「你是谁、你的职责」写进 system，比塞在 human 里效果好得多——这呼应了我们第 3 讲「角色」要素。再往后，`MessagesPlaceholder("msgs")` 是个占位符，作用是在模板的某个固定位置，塞进一整段消息列表——这在做多轮对话、注入历史上下文时特别有用，你不需要把每条历史消息都写死在模板里，运行时动态填进去即可。
- **页面关键元素指引**：
  上栏展示 `ChatPromptTemplate.from_messages` 的 system/human/ai 三种角色代码；下栏展示 `MessagesPlaceholder` 用法。讲解时强调「system 定人设、MessagesPlaceholder 注入上下文」两个要点。
- **现场动作/Demo**：
  现场运行示例，打印 `chat_template.format_messages(...)` 的结果，让学员直观看到三种 `SystemMessage` / `HumanMessage` / `AIMessage` 对象长什么样。
- **可能的学员提问 & 回答**：
  - Q：`PromptTemplate` 和 `ChatPromptTemplate` 什么时候用哪个？
  - A：普通补全模型、要一个纯字符串就用前者；聊天模型、要角色和对话历史就用后者。现在主流都用聊天模型，所以后者更常用。
- **时长**：约 5 分钟

### P8 FewShot 与示例选择

- **本页是什么**：讲怎么用「少量示例」降低 AI 幻觉，以及当示例很多时如何自动挑选最相关的几条。
- **开场/衔接话术**：
  「第 3 讲我们反复强调『范例』这个要素有多重要——给模型几个例子，它答题质量立马上一个台阶。那在 LangChain 里，怎么把示例优雅地喂给模型？这就是本页的 FewShot。」
- **核心讲解**：
  `FewShotPromptTemplate` 的思路是：你准备一个「示例集」，每个示例是一对「问题 + 答案」，然后把这些示例自动拼进 Prompt，最后接上真正要问的问题。你可以把它理解成「给模型做了一次微型训练」，或者更形象——**一个迷你版 RAG 知识库**。但问题来了：示例一多，全塞进去既费 Token 又稀释重点。这时就用 `SemanticSimilarityExampleSelector` 语义选择器：它先用 embedding 模型（这里用中文友好的 `shaw/dmeta-embedding-zh`）把示例和用户输入都转成向量，再用向量库（Chroma）做相似度检索，自动挑出最相关的前 k 条示例。这样每次只喂最贴题的几个例子，既省 Token 又更准。**这个「向量化 + 相似度检索」的组合，就是第 5 讲 RAG 的核心技术，今天先提前尝一口。**
- **页面关键元素指引**：
  左半边展示 `FewShotPromptTemplate` 基础用法；右半边展示 `SemanticSimilarityExampleSelector` 结合 Chroma + 中文 embedding 的完整代码。强调左右是「从全量示例」到「智能选示例」的进化。
- **现场动作/Demo**：
  现场运行示例选择器，输入「穆罕默德二世？」，展示它自动挑出了「寿命对比」那条最相关示例，而不是「票房」「高楼」那两条。
- **可能的学员提问 & 回答**：
  - Q：为什么不用关键词匹配，非要上 embedding 和向量库？
  - A：关键词匹配太死板，换个说法就匹配不上。embedding 按「语义」匹配，你说「票房」和「电影收入」也能对上。这是 RAG 能工作的根本原因。
- **时长**：约 4 分钟

### P9 LCEL 原理：Runnable Interface

- **本页是什么**：揭开 LCEL 能链式串联的底层原理——Runnable 接口与它的一整套调用方法。
- **开场/衔接话术**：
  「前面我们一直在用 `|` 串链，但有没有人想过：凭什么 Prompt、模型、解析器这三个八竿子打不着的组件，能用一根竖线串起来？答案是一个统一接口——Runnable。」
- **核心讲解**：
  LCEL 之所以强大，是因为 LangChain 规定了一个标准接口叫 **Runnable Interface**，让所有组件——Prompt、LLM、Parser、甚至后面学的 Retriever——都实现同一套方法。你只要会一个组件，就会所有组件。这套方法分同步和异步两大家族：同步有 `stream`（流式返回）、`invoke`（单次调用）、`batch`（批量调用）；异步就是前面加个 `a`，`astream`、`ainvoke`、`abatch`，再加两个监听用的 `astream_log`、`astream_events`。为什么要专门搞一套？因为一旦所有组件都遵循同样的输入输出规范，链就能像乐高一样自由拼接，还能自动获得流式、异步、并行、重试这些能力。另外记住一个词 **Stream**——数据流，它让长文本能「一个字一个字往外蹦」，而不是干等整段生成完，这是提升用户体验的关键，下一页我们就实战它。
- **页面关键元素指引**：
  指着「方法家族」卡片，把同步/异步对照讲清楚；重点圈出 `stream` 和 `invoke` 这对最常用的，为下一页实战埋伏笔。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：`invoke` 和 `stream` 到底啥区别？
  - A：`invoke` 等模型一次性生成完整答案再返回；`stream` 是生成到哪就立刻吐给你，像打字机一样逐块输出。前者简单，后者体验好，下一页会现场看到差别。
- **时长**：约 4 分钟

### P10 LCEL 实战（Live Demo）

- **本页是什么**：用四个实战案例演示 LCEL 的流式、异步、结构化输出与事件监听。
- **开场/衔接话术**：
  「原理清楚了，直接上手。这一页四个小例子，覆盖 LCEL 最常用的四种能力，我们一个一个跑。」
- **核心讲解**：
  第一个是**流式调用** `llm.stream(...)`：for 循环里 `print(chunk, end="|")`，你会看到答案像打字机一样一块块往外冒，块与块之间用竖线隔开——这就是「流」的直观形态。第二个是**异步调用** `astream`：加 `async`/`await` 和 `asyncio.run` 包装，效果和 stream 一样，但在并发任务多的时候，异步能更好地利用 CPU、提高吞吐，是服务端开发的标配。第三个是**结构化输出** `JsonOutputParser`：你在模板里要求「以 JSON 格式返回」，解析器会保证每次输出都是合法 JSON，而不是带一堆废话的字符串——这对「给前端/给别的服务传数据」极其重要。第四个是**事件监听** `astream_events(version="v2")`：能监听到 `stream_start`、`stream_chunk`、`stream_end` 等底层事件，还带 `run_id`、元数据，是调试和监控的利器。
- **页面关键元素指引**：
  左代码右说明，逐个高亮四个代码块。重点演示 stream 的「逐块输出」和 JsonOutputParser 的「干净 JSON」，形成强烈对比。
- **现场动作/Demo**：
  **Live Demo**：依次运行 stream / astream / JsonOutputParser / astream_events 四个示例，让学员看到打字机效果、JSON 输出、以及事件流的打印。重点停顿在 JSON 输出，强调「这就是第 3 讲『输出格式』要素的工程化落地」。
- **可能的学员提问 & 回答**：
  - Q：什么时候用同步 `stream`，什么时候用异步 `astream`？
  - A：写脚本、演示、单任务用同步即可；上服务器、要同时处理很多请求时用异步。你后续写 LangServe 服务时，框架底层已经帮你处理好了异步。
- **时长**：约 5 分钟

### P11 LangServe 部署（Live Demo）

- **本页是什么**：讲怎么把写好的链，一键部署成 RESTful 服务，供第三方调用。
- **开场/衔接话术**：
  「到这里，链是在本地 Python 脚本里跑的。但真正的应用得让别人能调用——手机 App、前端页面、别的后端服务。怎么把这条链变成一个 HTTP 接口？答案是 LangServe。」
- **核心讲解**：
  LangServe 是集成 FastAPI + Pydantic 的 RESTful 框架，特性很实用：自带 Swagger 文档、自动 JSON Schema、支持 `/invoke`、`/batch`、`/stream` 等接口、还能流式返回。三步走：**第一步**，用 `langchain-cli` 脚手架初始化项目 `langchain app new mylangserver`，它帮你生成 `app/server.py` 骨架和 Dockerfile；**第二步**，在 `server.py` 里用一句 `add_routes(app, chain, path="/deepseek")` 把链挂成路由——这一句是灵魂，它把一个 LangChain 对象自动包装成了完整的 REST 接口；**第三步**，`langchain server` 启动，浏览器打开 `/docs` 就能看到自动生成的 Swagger 文档。调别人部署好的服务也不难，用 `RemoteRunnable("http://...:8000/deepseek")`，用法和本地调模型几乎一模一样。
- **页面关键元素指引**：
  指着代码里的 `add_routes` 这一行，强调「一行代码，链变接口」；再切到 Swagger 文档截图，让学员看到 `/invoke`、`/stream` 这些自动生成的端点。
- **现场动作/Demo**：
  **Live Demo**：现场 `langchain app new` 建项目 → 改 `server.py` 加 `add_routes` → `langchain server` 启动 → 打开 Swagger 页面 → 用 **Apifox** 发一个 `/invoke` 请求，展示返回结果。如果现场环境不允许，退而求其次演示 `RemoteRunnable` 调用本机服务。
- **可能的学员提问 & 回答**：
  - Q：`add_routes` 挂上去的接口，参数怎么传？
  - A：参数结构由链的输入 schema 自动生成，Swagger 文档里能看到。你传 JSON，字段名对应模板里的占位符，比如 `{"input": "..."}`。
  - Q：LangServe 和 FastAPI 是什么关系？
  - A：LangServe 底层就是 FastAPI，你可以理解成「面向 LLM 链的 FastAPI 增强版」，帮你把链的输入输出、流式、文档都自动化了。
- **时长**：约 5 分钟

### P12 监控与日志

- **本页是什么**：讲三个调试/监控手段——LangSmith、set_verbose、set_debug。
- **开场/衔接话术**：
  「链部署上线了，下一步就是『出了事能不能查到』。传统软件靠打日志，AI 应用靠什么？这一页给你三件套。」
- **核心讲解**：
  第一件是 **LangSmith**，LangChain 官方的监控平台，能把你整条链每个节点的调用、输入输出、耗时、Token 用量都可视化出来，排查问题时一眼看到「哪一环出错了」。用法是注册账号、拿 API Key、设置几个环境变量即可。但要注意：LangSmith 是 SaaS，会把你的调用日志上报到云端，涉密项目要谨慎。第二件是 **set_verbose**，一行 `set_verbose(True)` 打开关键日志，只打印最重要的节点信息，适合本地快速排查。第三件是 **set_debug**，`set_debug(True)` 打开更详细的调试日志，把每一步的完整信息都打出来。**一句话选型：能上 LangSmith 就上 LangSmith（可视化最爽），不行就用 verbose 看关键日志、debug 看完整细节。**
- **页面关键元素指引**：
  三张卡片分别对应三个手段，讲一个指一个。放 LangSmith 的链路可视化截图，让学员直观感受「整条链像地铁图一样看得清清楚楚」。
- **现场动作/Demo**：
  可现场演示 `set_verbose(True)` 后运行 `demo1.py`，让学员看到终端多打印出的链路日志。LangSmith 因需注册账号，展示截图即可，不强求现场注册。
- **可能的学员提问 & 回答**：
  - Q：verbose 和 debug 区别到底多大？
  - A：verbose 是「关键日志」，告诉你到了哪一步；debug 是「完整日志」，连每步的完整 prompt、完整返回都打出来。查方向用 verbose，查细节用 debug。
- **时长**：约 3 分钟

### P13 参数速查卡

- **本页是什么**：给出四个常用采样参数的作用和调参心法。
- **开场/衔接话术**：
  「最后一块拼图，是让模型『听话』的旋钮。调模型输出，最常用的就四个参数，记住它们，你就不用在群里到处问『怎么让输出稳定一点』了。」
- **核心讲解**：
  **temperature（温度，0~2）**：控制随机性，越低越确定、越高越天马行空。写代码、做事实问答，调到 0 附近；写诗、头脑风暴，往高调。**top_p（核采样）**：从累积概率前 p 的词里抽，和 temperature 二选一调即可，别两个一起乱动。**top_k（词表截断）**：只从概率最高的前 k 个词里选，进一步收窄候选。**max_tokens（输出上限）**：限制生成长度，防止模型刹不住车，也能控成本。最重要的一句心法——**一次只动一个旋钮**。很多新手三个参数一起调，输出变了都不知道是哪个起的作用，等于瞎调。
- **页面关键元素指引**：
  指着参数卡矩阵，每个参数讲「是什么 → 调高/调低会发生什么 → 典型场景」。最后重重强调「一次只动一个旋钮」这条铁律。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：temperature 设 0 就一定能得到确定结果吗？
  - A：能大幅提高稳定性，但不保证 100% 完全一样，因为模型内部还有浮点运算等不确定性。要「尽量确定」就用 0 或很小的值。
- **时长**：约 3 分钟

### P14 总结

- **本页是什么**：收官页，把「调用 → 编排 → 部署 → 监控」串成一个完整闭环，布置练习与自测。
- **开场/衔接话术**：
  「好，今天的知识点其实就一条主线。我们从最原始的 5 行调用出发，一路走到了能部署、能监控的服务。回顾一下这条闭环。」
- **核心讲解**：
  今天走完了一个 LLM 应用的完整生命周期：**调用**（5 行代码跑通对话）→ **编排**（用 LCEL 的 `|` 把 Prompt、模型、解析器串成链，还能流式、异步、结构化输出）→ **部署**（LangServe 一句 `add_routes` 变 REST 服务）→ **监控**（LangSmith / verbose / debug 排查问题）。记住那个心智锚点：**Chain 就是一条可复用的调用流水线**。课后练习是：把 demo 里的模板改造成「输入城市 → 输出旅游攻略（JSON 格式）」，并用 LangServe 暴露接口。三道自测题见文末，下节课我们要给这条流水线「外挂知识库」，正式进入 RAG。
- **页面关键元素指引**：
  指着闭环图，从左到右念「调用 → 编排 → 部署 → 监控」，强调这是一个完整闭环。念一遍课后练习和自测题要求。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：学完 LangChain 就能做产品了吗？
  - A：能做出「能跑通」的应用了。但要「跑得稳、敢上线」，还需要后面 RAG、Agent、工程化几讲的内容。今天是你第一次把 AI 能力变成服务的里程碑。
- **时长**：约 2 分钟

---

## 二、代码示例与演示脚本

> 说明：以下代码均从素材原文（ai-learn04/05/06/07.md）提取整理；按 V3 大纲，模型名由 `deepseek-r1` 统一升级为 `deepseek-v4-flash`，本地模型可据机器配置降级。

### 1. requirements.txt（第 4 讲基础依赖）

```txt
langchain==0.3.19
langchain-community==0.3.17
langchain-ollama==0.2.3
```

```bash
pip install -r requirements.txt
```

### 2. demo1.py —— 第一次调用（5 行代码跑通对话）

```python
# demo1.py：LangChain 调用本地 Ollama 大模型，完成一次带模板的对话
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

# 1. 创建本地大模型（base_url 指向 Ollama 服务）
# 注意：V3 大纲已用 deepseek-v4-flash 替代 deepseek-r1
llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")

# 2. 定义一个最简单的模板，{input} 是占位符
template = "你是世界级的 AI 技术专家, {input}"
prompt = PromptTemplate(input_variables=["input"], template=template)

# 3. 用 | 管道把 模板 -> 模型 -> 输出解析器 串成一条链
chain = prompt | llm | StrOutputParser()

# 4. 执行链式调用，填充占位符
response = chain.invoke({
    "input": "请写一篇关于 AI 的文章，字数不大于 100"
})
print(response)
```

### 3. ChatPromptTemplate —— 消息角色

```python
# 通过消息数组创建聊天模板，区分 system/human/ai 三种角色
from langchain_core.prompts import ChatPromptTemplate

chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", "你是人工智能助手， 你的名字是{name}"),   # 系统人设
        ("human", "你好"),                                   # 用户消息
        ("ai", "你好，我是人工智能助手{name}，很高兴为您服务"),  # AI 历史回复
        ("human", "{user_input}"),                           # 用户真正输入
    ]
)

# 填充模板参数
message = chat_template.format_messages(name="小爱同学", user_input="你的名字叫什么？")
print(message)
# 输出：SystemMessage / HumanMessage / AIMessage 三种对象
```

### 4. MessagesPlaceholder —— 注入上下文

```python
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", "你是人工智能助手"),
        MessagesPlaceholder("msgs")   # 占位符：运行时动态塞入一段消息列表
    ]
)

# 把历史消息列表放在一起，运行时注入
msgs = [
    SystemMessage(content='你的名字是小爱同学'),
    HumanMessage(content='你好'),
    AIMessage(content='你好，我是人工智能助手，很高兴为您服务'),
]
print(chat_template.invoke(msgs))
```

### 5. FewShotPromptTemplate —— 示例集

```python
from langchain.prompts.few_shot import FewShotPromptTemplate
from langchain.prompts import PromptTemplate

# 示例集：每个示例是一对 question + answer
examples = [
    {
        "question": "谁的寿命更长， 穆罕默德二世还是爱因斯坦？",
        "answer": "爱因斯坦活了 76 岁。\n穆罕默德二世活了 89 岁。\n因此，穆罕默德二世比爱因斯坦活得更长。"
    },
    {
        "question": "目前电影票房第一名是谁？",
        "answer": "《阿凡达》的票房是 27.9 亿美元。\n《复仇者联盟 4：终局之战》的票房是 27.8 亿美元。\n因此，《阿凡达》的票房更高。"
    },
]

# 示例模板：如何渲染单条示例
example_prompt = PromptTemplate(
    input_variables=["question", "answer"],
    template="问题：{question}\n答案：{answer}",
)

# 用 FewShotPromptTemplate 把示例集拼进 Prompt，suffix 是真正要问的问题
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    suffix="问题：{input}",
    input_variables=["input"],
)

print(prompt.format(input="谁的寿命更长， 穆罕默德二世还是爱因斯坦？"))
```

### 6. SemanticSimilarityExampleSelector —— 语义示例选择

```python
from langchain.prompts.example_selector import SemanticSimilarityExampleSelector
from langchain_chroma import Chroma
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain.prompts import FewShotPromptTemplate, PromptTemplate

# 中文友好的 embedding 模型（需先 ollama pull shaw/dmeta-embedding-zh）
ollama_emb = OllamaEmbeddings(
    base_url="http://127.0.0.1:11434",
    model="shaw/dmeta-embedding-zh",
)

examples = [
    {"question": "谁的寿命更长， 穆罕默德二世还是爱因斯坦？",
     "answer": "爱因斯坦活了 76 岁。\n穆罕默德二世活了 89 岁。\n因此，穆罕默德二世比爱因斯坦活得更长。"},
    {"question": "目前电影票房第一名是谁？",
     "answer": "《阿凡达》的票房是 27.9 亿美元。\n《复仇者联盟 4：终局之战》的票房是 27.8 亿美元。\n因此，《阿凡达》的票房更高。"},
    {"question": "深圳第一高楼是哪个？",
     "answer": "深圳平安国际金融中心（平安中心）的楼高是 593米。\n深圳京基100 的楼高是 441.8米。\n所以深圳第一高楼是平安国际金融中心。"},
]

# 语义选择器：把示例向量化后存入 Chroma，按语义相似度选最相关的 k 条
example_selector = SemanticSimilarityExampleSelector.from_examples(
    examples=examples,
    embeddings=ollama_emb,
    vectorstore_cls=Chroma,
    k=1,   # 只选最相关的 1 条
)

question = "穆罕默德二世？"
selected_examples = example_selector.select_examples({"question": question})

example_prompt = PromptTemplate(
    input_variables=["question", "answer"],
    template="问题：{question}\n答案：{answer}",
)
prompt = FewShotPromptTemplate(
    examples=selected_examples,   # 注意：这里用的是选出来的示例
    example_prompt=example_prompt,
    suffix="问题：{input}",
    input_variables=["input"],
)
print(prompt.format(input=question))
```

### 7. LCEL —— 流式 / 异步 / JSON / 事件监听

```python
# 7.1 一次基础的流式调用
from langchain_ollama.llms import OllamaLLM

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")

for chunk in llm.stream("海洋是什么颜色"):
    print(chunk, end="|", flush=True)   # 逐块输出，块间用 | 隔开
```

```python
# 7.2 astream 异步调用
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import asyncio

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")
prompt = ChatPromptTemplate.from_template("给我讲一个关于{input}的笑话")
chain = prompt | llm | StrOutputParser()

async def async_stream():
    async for chunk in chain.astream("公鸡"):
        print(chunk, end="|", flush=True)

asyncio.run(async_stream())
```

```python
# 7.3 JsonOutputParser 结构化输出
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import asyncio

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")
prompt = ChatPromptTemplate.from_template(
    """
    以 JSON格式返回{x}的人口列表
    使用一个`省份`作为字段列表返回
    每个省份都应有有字段`省份名`+`人口`字段
    """
)
parser = JsonOutputParser()   # 保证每次输出都是合法 JSON
chain = prompt | llm | parser

async def async_stream():
    async for chunk in chain.astream("广东省、福建省、广西省"):
        print(chunk, end="\n", flush=True)

asyncio.run(async_stream())
```

```python
# 7.4 astream_events 事件监听
from langchain_ollama.llms import OllamaLLM
import asyncio

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")

async def async_stream():
    async for event in llm.astream_events("你好", version="v2"):
        print(event)   # event 含 event 类型 / data / run_id / metadata

asyncio.run(async_stream())
```

### 8. LangServe —— 脚手架 + 部署 + 远程调用

```bash
# 8.1 安装脚手架与依赖管理工具
pip install -U langchain-cli
pip install pipx && pipx ensurepath && pipx install poetry

# 8.2 初始化 LangServe 项目
langchain app new mylangserver
cd mylangserver
poetry install
poetry add langchain
poetry add langchain_ollama
```

```python
# 8.3 app/server.py —— 用 add_routes 把模型挂成 REST 接口
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from langserve import add_routes
from langchain_ollama.llms import OllamaLLM

deepseek = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")

app = FastAPI(
    title="Qborfy个人 LangServer",
    version="0.1.0",
    description="Qborfy个人 LangServer，学习测试使用",
)

@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")   # 根路径直接跳转到 Swagger 文档

# 一句 add_routes：把 deepseek 对象封装成 /deepseek 路径下的完整 REST 接口
add_routes(app, deepseek, path="/deepseek")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

```bash
# 8.4 运行项目
langchain server
# 浏览器访问 http://localhost:8000/docs 查看 Swagger 文档
# 用 Apifox 测试 /deepseek/invoke 或 /deepseek/stream 接口
```

```python
# 8.5 RemoteRunnable —— 像调本地模型一样调远程服务
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langserve import RemoteRunnable

llm = RemoteRunnable("http://127.0.0.1:8000/deepseek")

template = "你是世界级的 AI 技术专家, {input}"
prompt = PromptTemplate(input_variables=["input"], template=template)
chain = prompt | llm | StrOutputParser()

for chunk in llm.stream("海洋是什么颜色"):
    print(chunk, end="|", flush=True)
```

```python
# 8.6 监控日志三件套
import os
# LangSmith：上报到云端可视化平台（涉密项目慎用）
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_ENDPOINT"] = "https://api.smith.langchain.com"
os.environ["LANGSMITH_API_KEY"] = "<LANG_SMITH_KEY>"
os.environ["LANGSMITH_PROJECT"] = "mylangserver"

# 本地关键日志
from langchain.globals import set_verbose, set_debug
set_verbose(True)   # 关键日志
set_debug(True)     # 完整调试日志

# 也可对单个模型对象开启 verbose
# llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash", verbose=True)
```

---

## 三、动手练习与参考答案

**练习题目**：修改 demo 里的 PromptTemplate，实现「输入城市 → 输出旅游攻略（JSON 格式）」，并用 LangServe 暴露接口。

**参考答案（核心代码）**：

```python
# 练习：城市 -> 旅游攻略（JSON）
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-v4-flash")

# 模板里用角色 + 明确 JSON 格式要求，呼应第 3 讲五要素
prompt = ChatPromptTemplate.from_messages([
    ("system", "你是一位资深旅行规划师，输出内容必须是合法 JSON。"),
    ("human", "请为 {city} 规划一份三日旅游攻略，字段包括：城市、天数、每日行程（列表）、必去景点（列表）、美食推荐（列表）。"),
])

parser = JsonOutputParser()
chain = prompt | llm | parser

result = chain.invoke({"city": "成都"})
print(result)
```

LangServe 暴露接口：在 `server.py` 中，把上面组装好的 `chain` 替换 `deepseek` 对象，用 `add_routes(app, chain, path="/travel")` 挂载即可，Swagger 里会生成 `/travel/invoke`、`/travel/stream` 等端点。

**练习验收要点**：
- 输入「成都」，输出是合法 JSON（可用 `json.loads` 验证，不报错即通过）。
- 字段完整：城市 / 天数 / 每日行程 / 必去景点 / 美食推荐。
- LangServe 的 `/travel/invoke` 能用 Apifox 正常调用。

---

## 四、自测题答案

**① LCEL 的 `|` 链式调用里各部分职责？**

答：`|` 是 Python 管道运算符，在 LCEL 里表示「把数据从左向右传递」。以 `prompt | llm | StrOutputParser()` 为例：`prompt` 负责接收输入、套模板生成最终提示词；`llm` 负责拿提示词去调用大模型、产出原始结果；`StrOutputParser` 负责把模型原始返回对象解析成纯字符串输出。三者都实现同一个 Runnable 接口，所以能自由串联、互换。

**② stream 和 invoke 的区别？**

答：`invoke` 是同步单次调用，等模型把整段答案生成完才一次性返回；`stream` 是流式调用，模型生成到哪就立刻逐块返回，像打字机一样，用户体验更好、首字延迟更低。异步版本分别是 `ainvoke` 和 `astream`。

**③ LangSmith 和 set_verbose 分别解决什么问题？**

答：LangSmith 是官方云端监控平台，把整条链每个节点的输入输出、耗时、Token 用量可视化，用于上线后的监控和排查，但会上报日志到云端；`set_verbose` 是本地关键日志开关，只打印关键节点信息，适合快速本地排查，不上报数据。二者是「云端可视化监控」和「本地轻量日志」的关系，敏感项目可用 verbose/debug 替代 LangSmith。

---

## 五、常见坑位提醒

1. **虚拟环境忘激活**：直接 `python demo1.py` 报 `ModuleNotFoundError: langchain_ollama`。务必先 `. venv/bin/activate`（Windows：`venv\Scripts\activate`）。
2. **Ollama 没启动 / 模型没拉**：报连接 `11434` 端口失败，或模型名找不到。先 `ollama serve`，再 `ollama pull deepseek-v4-flash`，用 `ollama list` 确认。
3. **模型名写错**：素材老代码是 `deepseek-r1:32b`，V3 已升级为 `deepseek-v4-flash`。模型名必须和 `ollama list` 里完全一致（含 tag）。
4. **中文 embedding 模型没拉**：跑 FewShot 示例选择器时报找不到 `shaw/dmeta-embedding-zh`。先 `ollama pull shaw/dmeta-embedding-zh`。
5. **`vectorstore_cls=Chroma()` 传实例报错**：旧版 API 传 `Chroma()`，新版传类本身 `Chroma`。不同 langchain-chroma 版本有差异，报错时把 `Chroma()` 改成 `Chroma` 试试。
6. **JsonOutputParser 偶发解析失败**：模型有时会在 JSON 前后加废话，导致解析失败。可在模板里加强约束「只输出 JSON，不要任何解释」，或改用 `with_structured_output` 结构化输出。
7. **LangServe 端口/依赖**：`langchain server` 默认 8080，`uvicorn` 手动跑是 8000，别搞混；`poetry install` 前确保已装 `poetry` 且 `pipx ensurepath` 已执行（否则命令找不到）。
8. **`astream_events` 必须带 `version="v2"`**：不带会抛弃用警告或行为异常。
9. **一次只动一个旋钮**：调参数时 temperature / top_p / top_k 不要同时改，否则输出变化无法归因。
10. **LangSmith 涉密数据**：开启 LangSmith 会上报调用日志，企业内部敏感数据不要开，改用 `set_verbose` / `set_debug`。
