# 第 7 讲 · Agent 运行机制（Agent Loop）授课讲稿

> 讲师逐页演讲脚本 · 配套 AI从零开始-第07讲-Agent运行机制Loop-优化版.pptx · 时长 40 分钟

---

## 〇、课前准备清单

### 需安装的软件

| 软件 | 版本建议 | 安装命令 / 下载地址 |
|------|---------|-------------------|
| Python | ≥ 3.11（推荐 3.12） | `https://www.python.org/downloads/` 或 `brew install python@3.12` |
| openai 库 | 最新版 | `pip install openai`（本讲代码用 OpenAI SDK 格式，兼容 DeepSeek 云 API） |
| （可选）DeepSeek 云 API | — | 见下方账号准备 |

> 说明：本讲代码示例统一用 OpenAI SDK 格式写，因为 DeepSeek、Kimi、Moonshot 等国内厂商都提供 OpenAI 兼容接口，换一个 `base_url` 即可切换。**不要求本地跑大模型**，用云 API 即可；想本地跑可复用第 2 讲的 Ollama 环境。

### 需注册 / 准备的账号或 API Key

- **DeepSeek 开放平台**：`https://platform.deepseek.com/` 注册后创建 API Key（模型名示例 `deepseek-chat`，支持 function calling）。也可用任意支持 function calling 的模型 API（如 Kimi、Moonshot、OpenAI）。
- 在环境变量里配置：`export DEEPSEEK_API_KEY="sk-xxx"`。

### 课前需跑通的 demo

- 跑通本讲「二、代码示例」中的 **50 行最简 Agent Loop**（把 `client` 换成 DeepSeek 的 `base_url`，`model` 换成 `deepseek-chat`），确认能完成一次「搜文件 → 读文件 → 总结」的工具调用闭环。这一步是 P4 现场演示的基础。

### 教室环境要求

- **投影**：P4 有深色代码块主视觉，需保证投影亮度/对比度，代码字号至少能看清注释。
- **网络**：P4 现场演示需能访问模型 API；若网络不稳，提前准备一段「录屏」兜底。
- **现场演示**：P4 为核心代码页，建议现场跑一遍 50 行 Loop；其余页以讲解为主，不强制演示。

---

## 一、逐页讲稿

### P1 封面

- **本页是什么**：本讲封面，一句话点题「Agent 是怎么跑起来的」，并交代与第 6 讲的承接关系。
- **开场/衔接话术**：「上一讲我们让 Agent 学会了『做事』——它会调工具、会跑龙虎榜查询、会做计划执行反思。但不知道大家有没有一个疑问：这些 Agent 在背后，到底是靠什么驱动着一轮一轮转下去的？为什么有的 Agent 能一口气把复杂任务干完，有的却一问一答、推一步才走一步？今天这一讲，我们就把 Agent 的『心脏』拆开来看——Agent Loop。学完这节课，你能徒手写出一个 50 行的最小 Agent Loop。」
- **核心讲解**：开场先抛一个观察：同一个模型，让 Agent 连续干活的能力却天差地别。差别不在模型，在于「循环」。这一页不讲细节，只建立两件事：第一，本讲的定位是「让 Agent 跑得明白」——上一讲是「会做事」，这一讲是「懂它怎么跑」；第二，给学员一个预期：40 分钟讲 9 页，重点在第 4 页的 50 行代码，只要听懂那一段，这节课就值了。
- **页面关键元素指引**：指向副标题「Agent 是怎么跑起来的」，强调这是一个「机制」问题而非「能力」问题。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「我直接用 LangChain 不就行了，为什么还要懂 Loop？」A：「框架帮你封装了循环，但出了问题你只能抓瞎。懂 Loop 才能看懂框架在干嘛、才能调 bug、控成本，这也是下一讲工程化的基础。」
- **时长**：约 2 分钟

### P2 Agent Loop：心跳引擎

- **本页是什么**：本讲最核心的一页，讲清 Agent Loop 的定义和四步循环结构，建立整节课的「心智锚点」。
- **开场/衔接话术**：「先打个比方。Agent Loop 就像 Agent 的心跳——没有心跳，再聪明的 Agent 也只能动一下：你推一把它走一步。有了心跳，它才能自己持续跑下去。那这个『心跳』每跳一下，具体干了什么？」
- **核心讲解**：每跳一下做四件事：接收指令 → 思考 → 执行 → 观察 → 判断。拿到用户输入或上一轮结果；调用 LLM 决定下一步做什么；调用工具（读文件、跑命令、搜代码）；把工具结果塞回上下文，判断任务完成没有。没完成？回到第一步继续；完成了？输出结果退出。到这里大家可能会说，这不就是个 `while True` 吗？——没错，外壳就是个循环，但有一个关键区别：**每一轮的退出条件，是 LLM 自己判断的**。传统循环的退出条件是写死的，`i < 10` 就退；Agent Loop 的退出条件是智能的——「任务做完了吗？还需要调工具吗？」这就是它和普通循环的本质区别。
- **页面关键元素指引**：指向循环图，带学员从左到右走一遍四个节点，最后在「还需要继续吗」这个菱形判断上停顿，强调「智能退出」是这个图里唯一的灵魂。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「LLM 怎么知道自己做完了？」A：「它通过『要不要继续调工具』来表达。如果它不再请求任何工具、直接输出文本，就代表它认为活干完了——下一轮我们会看到代码里就是靠这个判断退出的。」
- **时长**：约 5 分钟

### P3 三种流派对比

- **本页是什么**：介绍 Agent Loop 的三种主流设计流派（确定性循环 / SDK Loop / 多 Agent 编排）及选型决策树。
- **开场/衔接话术**：「既然 Loop 是这个样子，那现在业界都是怎么写的？我研究了一圈，发现大致分成三个流派，从简单到复杂，大家先有个印象，最后一页我会给一张选型决策树。」
- **核心讲解**：流派一是「确定性循环」，代表 Google ADK 的 LoopAgent——执行顺序我来定，Agent 只管干活。提前把子 Agent 排好序，比如「写作 → 评审 → 修改」，照顺序跑，设个 `max_iterations` 兜底。好处是可预测、好调试，坏处是死板。流派二是「SDK 级 Agent Loop」，代表 Claude Code、OpenAI Agents SDK——给 LLM 一堆工具，让它自己决定下一步，是最主流的写法，灵活但难预测。流派三是「多 Agent 编排」，一个编排者带一队专家，适合复杂协作，但调试是噩梦。三个流派一句话记忆：**确定性循环「听指挥」、SDK Loop「有自主权」、多 Agent「带团队」**。选型看任务步骤固定不固定。
- **页面关键元素指引**：指着三卡对比，重点强调中间那张「SDK Loop」是今天重点讲的，因为第 4 页的 50 行代码就是它。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「三个流派能不能混用？」A：「能。实际项目里常见主流程用 SDK Loop，某些固定步骤（比如文档评审）用确定性循环嵌进去。别二选一，看场景。」
- **时长**：约 4 分钟

### P4 50 行实现最简 Loop

- **本页是什么**：本节课的重头戏，展示 50 行最简 Agent Loop 的完整代码骨架、双重终止策略和工具注册表。
- **开场/衔接话术**：「说了半天，Agent Loop 到底怎么写？别被框架吓到——LangChain、AutoGen、CrewAI 解决的核心问题，其实 50 行代码就能写清楚。来，我们上代码。」
- **核心讲解**：先不看代码，用嘴讲一遍思路，就四步：拿到用户输入塞进消息列表；把消息列表发给 LLM；看它要不要调工具——要调就执行、把结果塞回消息列表、回到第二步；不调就说明干完了、输出结果结束。代码里几个关键点我逐行点一下：`tools` 是工具注册表，key 是工具名、value 是函数加 schema；`messages` 是对话历史，每轮都在往里加；`for i in range(max_iterations)` 就是 Loop 外壳，`max_iterations` 是兜底；`if not msg.tool_calls` 是核心判断——空就代表 LLM 觉得活干完了；最后工具结果必须以 `role: "tool"` 塞回去，LLM 才看得懂。终止策略是双保险：**硬限制（max_iterations）兜底防死循环烧钱，主动声明（不调工具）负责优雅退出**，两个都要。
- **页面关键元素指引**：这是全课唯一的大代码块，配合激光笔逐行指 `tools`、`messages`、`for` 循环、`msg.tool_calls`、`role: "tool"` 五处；右侧文字对应「骨架 + 终止策略 + 工具注册表」三个板块。
- **现场动作/Demo**：**要演示**。现场把代码跑起来，给 Agent 一个「找一下项目里的测试文件，随便读一个总结内容」的任务，让学员看到 Agent 自动决定：调 `search_files` → 拿到列表 → 调 `read_file` → 总结。如果现场网络不稳，放提前录好的屏录，边放边讲解。
- **可能的学员提问 & 回答**：
  - Q：「工具结果为什么要用 `role: tool` 塞回去，不能直接拼成字符串吗？」A：「因为各家 API 的消息格式要求 `tool_use` 和 `tool_result` 必须配对，用标准角色塞回去，模型才知道『这是你刚才那个工具调用的返回结果』，否则它没法把结果和请求对应上。」
  - Q：「50 行版本够用吗？」A：「大部分个人脚本、内部小工具、10 轮以内的任务，够用了。什么时候升级？看最后一页的判断标准——如果 Loop 出问题会让你睡不着觉，就该上框架了。」
- **时长**：约 8 分钟

### P5 消息生命周期

- **本页是什么**：深入 SDK 级 Agent Loop 内部，讲一条消息从进入 Agent 到返回结果经历的完整生命周期，以及工具执行的几个设计细节。
- **开场/衔接话术**：「刚才的 50 行是个极简版。真正生产级的 Loop，比如 Claude Code 的 Agent SDK，内部要复杂得多。我们进去看一眼『心脏』——一条消息在 Agent 内部到底经历了什么。」
- **核心讲解**：用快递物流类比讲八个步骤：揽收（接收提示词，SDK 打一条 SystemMessage）→ 分拣（预处理 + 发给 LLM）→ 运输（LLM 思考，最耗时，你感受到的「顿一下」就在这）→ 派送（解析响应，看要不要调工具）→ 签收（返回 ResultMessage，附带费用、Token、会话 ID）。全流程最关键的分叉点是「响应里有没有工具调用」：有就继续循环，没有就结束。三个设计细节值得记住：一是 **Tool Use 和 Tool Result 交替**，一问一答，模型每拿到一个结果就重新评估下一步；二是 **并行工具调用**——只读工具（Read/Glob/Grep）可并发，写操作（Edit/Write/Bash）必须串行，避免冲突；三是 **错误处理别抛异常**，把错误信息当结果返回给 LLM，让它自己想办法（比如看到「找不到 jest」就自己去装依赖）。
- **页面关键元素指引**：指上方消息流大图走一遍八个步骤；下方卡片强调「只读并行 / 写串行」和「别抛异常」两个要点。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「为什么有时 Agent 会连续调好几个工具才回复，有时突然顿一下？」A：「连续调工具 = 任务没做完、循环继续；顿一下 = 每一轮都要等 LLM 思考，轮次越多等待越长。」
- **时长**：约 4 分钟

### P6 上下文「失忆」问题

- **本页是什么**：讲 Agent 跑着跑着「失忆」的根本原因（Token 窗口物理限制）和三种解法（三板斧）。
- **开场/衔接话术**：「前面讲的是正常流程。现在讲一个每个人迟早会撞上的坑——你让 Agent 重构一个大项目，跑到第 12 步，它突然开始重复第 3 步做过的事，还信誓旦旦说『我还没改过任何文件』。这不是 bug，是 Token 窗口的物理限制在作怪。」
- **核心讲解**：先建立认知：LLM 没有持久记忆，每次调用它只能「看到」你塞进去的那段文本，这段文本叫上下文窗口。Agent 跑起来后消息列表膨胀得飞快——系统提示词、工具定义、每轮对话、读文件的内容，全往里堆，跑 20 轮轻松 5 万 Token，读个大文件 10 轮就能撑爆。窗口满了的后果是「轻则降质、重则报错」，早期内容被「挤掉」，Agent 就失忆了。最危险的是——**Agent 不知道自己失忆了**，它不会说「我忘了」，而是自信地给你一个错误答案。解法是「三板斧」：**滑动窗口截断**（简单粗暴，注意 tool_use 和 tool_result 必须成对截）；**上下文压缩**（把早期历史总结成摘要，保留关键信息但会丢细节）；**外部记忆**（把要记住的东西存到窗口外，如键值存储、向量库、文件）。
- **页面关键元素指引**：指向右侧「三板斧」卡片，逐一讲适用场景：短任务用截断、中长任务用压缩、超长/跨会话用外部记忆。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「三种方案我该选哪个？」A：「先看轮次。少于 10 轮不用管；10-30 轮用压缩；30 轮以上或要跨会话，压缩 + 外部记忆双管齐下。但记住：不要过早优化，先跑起来，遇到问题再加。」
- **时长**：约 5 分钟

### P7 持久规则与会话恢复

- **本页是什么**：讲两个「记住该记住的」的高级技巧——CLAUDE.md 持久规则（每次请求重注入、不会被压缩）和会话断点恢复。
- **开场/衔接话术**：「压缩会丢细节，那有没有一类信息是『永远不会被压缩掉的』？有——CLAUDE.md 里的内容。这是一个很多人不知道的机制，今天重点讲透它。」
- **核心讲解**：CLAUDE.md 不是一次性注入的，而是**每次请求都重新注入**。这意味着你在系统提示词里写的「这个项目用 Python 3.11」，跑 30 轮可能被压缩掉、Agent 开始用 3.10 语法；但把它放进 CLAUDE.md，每次请求它都会重新出现在上下文里，永远不会丢。判断标准一句话：**跨任务都要遵守的规则放 CLAUDE.md（项目规范、禁止事项、技术栈约束），只针对当次任务的指令放系统提示词**。第二个技巧是会话恢复：用户关了浏览器回来，靠 `session_id` 续传。但要注意，恢复的是「压缩后的上下文」不是完整历史，所以光有对话历史还不够，还要把「任务状态」持久化——哪些文件改过了、做到哪一步了，用 `PreCompact` Hook 在压缩发生前把关键信息存到外部，压缩后再重新注入。
- **页面关键元素指引**：指向右侧 CLAUDE.md 深卡，强调「每次请求重注入」这个反直觉点；再点 `session_id` + `PreCompact` 的配套关系。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「CLAUDE.md 和 AGENTS.md 是一回事吗？」A：「本质是同一类机制，不同产品叫法不同——Claude Code 叫 CLAUDE.md，很多 AI 编程工具叫 AGENTS.md，都是『持久规则文件，每次请求重新注入』。第 8 讲上下文工程还会再展开。」
- **时长**：约 4 分钟

### P8 可观测性

- **本页是什么**：讲 Agent 跑起来之后「你怎么知道它在干什么」——五种消息类型、ResultMessage 读懂停止原因、effort 参数控成本。
- **开场/衔接话术**：「Agent 能跑不等于能用于生产。你盯着终端看一堆输出滚过去，然后它停了——成功了？失败了？花了多少钱？如果只能靠 print 调试，这个 Agent 离生产还差得远。这一页补上前面没讲清楚的一块：可观测性。」
- **核心讲解**：Agent 跑的时候 SDK 其实在持续产出一条消息流，五种类型各司其职：SystemMessage（会话生命周期）、AssistantMessage（每次响应，含工具调用请求）、UserMessage（工具执行结果）、StreamEvent（实时流式事件）、ResultMessage（循环结束标志 + 费用 + 状态）。大部分人只看最后一条，但最关键的信息在 ResultMessage 的 `subtype` 字段——它有五种值：`success`（正常完成，`result` 才有值）、`error_max_turns`（轮次用完）、`error_max_budget_usd`（预算超限）、`error_during_execution`（执行出错）、`error_max_structured_output_retries`（结构化输出重试超限）。**只有 `success` 时才有实际结果，其他四种都被强制终止了**——不区分的话，你拿到一个空字符串还以为任务完成了。另外要会读 `stop_reason`（end_turn / max_tokens / refusal），`max_tokens` 说明输出被截断、结果可能不完整。最后一个省钱技巧：`effort` 参数控制推理深度，简单任务用 `low`（找文件、列目录），复杂任务用 `high`（重构、调试），按任务分级，成本能降到原来的 1/3 到 1/5。
- **页面关键元素指引**：指向五种消息类型卡片，重点在 ResultMessage 那行停一停；再点 `effort` 参数的成本曲线，强调「成本意识从读日志开始」。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「`subtype` 和 `stop_reason` 什么区别？」A：「`subtype` 说『循环为什么结束』，`stop_reason` 说『最后一次生成为什么停』。两个维度都要看，遇到 `stop_reason == max_tokens` 要特别警惕，可能 `subtype` 还是 success 但输出其实不完整。」
- **时长**：约 4 分钟

### P9 总结

- **本页是什么**：收尾页，一句话总结本讲核心 + 布置动手练习 + 自测题。
- **开场/衔接话术**：「好，9 页讲完了，我们把整节课收成一句话——」
- **核心讲解**：核心金句是「**先跑通，再上框架**」。50 行就能把 Loop 写清楚，说明这件事的本质没那么玄；但真正上生产，你需要消息生命周期、上下文管理、会话恢复、可观测性这些能力，那时候再上框架也不迟。这里给一个朴素的判断标准：**如果 Loop 出了问题你睡不着觉，就该升级了**；反之，个人脚本、内部工具、一次性任务，50 行就够。最后强调一点：不要过度设计——一上来就搭多 Agent、加向量记忆，代码写两周调一周，结果发现任务 20 轮以内就能搞定，这是最常见的新手病。记住四步循环这个锚点，回去把 50 行代码亲手敲一遍，这节课才算真的落地。
- **页面关键元素指引**：居中金句「先跑通，再上框架」；下方练习与自测题念一遍，布置作业。
- **现场动作/Demo**：无
- **可能的学员提问 & 回答**：
  - Q：「下一步我该学什么？」A：「把今天的 50 行 Loop 跑通，然后可以去看第 8 讲——怎么让 Agent 跑得稳、敢上线，那是工程化的三件套：约束、评测、安全。」
- **时长**：约 4 分钟

---

## 二、代码示例与演示脚本

### 2.1 最简 Agent Loop（50 行骨架，本讲 P4 核心）

> 来自 `loop/02.md`，用 OpenAI SDK 格式书写，兼容 DeepSeek 云 API（换 `base_url` 即可）。工具示例来自 `loop/02.md` 的 `search_files` / `read_file`。

```python
import os
import json
from openai import OpenAI

# DeepSeek 云 API（OpenAI 兼容接口）。如果用 OpenAI 官方，删掉 base_url 即可
client = OpenAI(
    api_key="sk-你的key",                      # 换成你自己的 key
    base_url="https://api.deepseek.com",        # DeepSeek 官方地址
)

# 工具注册表：名字 → 函数 + schema
tools = {}

def register_tool(name, func, description, schema):
    """注册一个工具：函数 + 描述 + 参数 schema 三件套"""
    tools[name] = {"func": func, "schema": {
        "type": "function",
        "function": {"name": name, "description": description, "parameters": schema}
    }}

def run_agent(user_input, system_prompt="你是一个有用的助手。", max_iterations=10):
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_input},
    ]

    # for 循环就是 Loop 外壳，max_iterations 是硬限制兜底
    for i in range(max_iterations):
        # 第 1 步：调用 LLM
        response = client.chat.completions.create(
            model="deepseek-chat",              # 支持 function calling 的模型
            messages=messages,
            tools=[t["schema"] for t in tools.values()] if tools else None,
        )
        msg = response.choices[0].message
        messages.append(msg)

        # 第 2 步：判断要不要调工具（核心判断——不调 = 主动声明完成）
        if not msg.tool_calls:
            return msg.content

        # 第 3 步：执行工具
        for tool_call in msg.tool_calls:
            name = tool_call.function.name
            args = json.loads(tool_call.function.arguments)

            if name not in tools:
                result = f"错误：未知工具 {name}"
            else:
                try:
                    result = tools[name]["func"](**args)
                except Exception as e:
                    # 别抛异常，把错误信息返回给 LLM 让它自己处理
                    result = f"工具执行失败：{e}"

            # 第 4 步：结果以 tool 角色塞回消息列表
            messages.append({
                "role": "tool",
                "tool_call_id": tool_call.id,
                "content": str(result),
            })

    return "达到最大迭代次数，循环终止。"

# —— 工具示例：搜索文件 + 读文件 ——
def search_files(pattern, directory="."):
    """搜索匹配的文件名"""
    results = []
    for root, dirs, files in os.walk(directory):
        for f in files:
            if pattern.lower() in f.lower():
                results.append(os.path.join(root, f))
    return "\n".join(results) if results else "没找到匹配的文件"

def read_file(path):
    """读取文件内容"""
    if not os.path.exists(path):
        return f"文件不存在：{path}"
    with open(path, "r") as f:
        return f.read()[:2000]   # 限制长度，避免吃太多 token

register_tool("search_files", search_files, "搜索文件名包含指定关键词的文件",
    {"type": "object", "properties": {
        "pattern": {"type": "string", "description": "文件名关键词"},
        "directory": {"type": "string", "description": "搜索目录，默认当前目录"}
    }, "required": ["pattern"]})

register_tool("read_file", read_file, "读取指定文件的内容",
    {"type": "object", "properties": {
        "path": {"type": "string", "description": "文件路径"}
    }, "required": ["path"]})

# —— 跑一下 ——
result = run_agent(
    "帮我找一下项目里有哪些测试文件，随便挑一个读读看内容",
    system_prompt="你是一个代码助手。可以搜索文件和读取文件内容。",
    max_iterations=10
)
print(result)
```

**预期运行流程**：Agent 自动决定 ① 调 `search_files` 搜 "test" → ② 拿到列表挑一个 → ③ 调 `read_file` 读内容 → ④ 总结输出。整个过程无需人工干预。

### 2.2 上下文三板斧代码要点（P6 参考）

来自 `loop/04.md`，讲稿中口头讲解、不逐行演示：

```python
# 解法一：滑动窗口截断（注意系统消息永远保留）
def trim_messages(messages, max_tokens=100000):
    system_msgs = [m for m in messages if m["role"] == "system"]
    other_msgs = [m for m in messages if m["role"] != "system"]
    kept = []
    total = sum(estimate_tokens(m) for m in system_msgs)
    for msg in reversed(other_msgs):          # 从最新往前数
        t = estimate_tokens(msg)
        if total + t > max_tokens:
            break
        kept.insert(0, msg)
        total += t
    return system_msgs + kept

# 解法二：上下文压缩（早期消息总结成摘要，最近 N 条原样保留）
def compress_context(messages, keep_recent=10):
    system_msg = messages[0]
    to_compress = messages[1:-keep_recent]
    recent = messages[-keep_recent:]
    summary = call_llm("请将以下对话历史总结成摘要，保留关键操作、决策、进度：" + format_messages(to_compress))
    return [system_msg, {"role": "user", "content": f"[对话历史摘要]\n{summary}"}] + recent

# 解法三：外部记忆（把关键信息存到窗口外，注册成工具让 Agent 自己存取）
memory_store = {}
def save_memory(key, value):
    memory_store[key] = {"value": value, "timestamp": time.time()}
def recall_memory(key):
    return memory_store.get(key, {}).get("value")
```

### 2.3 可观测性代码要点（P8 参考）

来自 `loop/07.md`，摘取「读 ResultMessage 停止原因」的核心片段：

```python
elif isinstance(message, ResultMessage):
    if message.subtype == "success":
        # 任务正常完成，result 才有值，可安全读取
        process_result(message.result)
    elif message.subtype == "error_max_turns":
        print(f"轮次用完，任务未完成。session_id: {message.session_id}")
        resume_session(message.session_id)          # 用 session_id 恢复续跑
    elif message.subtype == "error_max_budget_usd":
        print(f"预算超限，已花费 ${message.total_cost_usd:.4f}")
    elif message.subtype == "error_during_execution":
        print(f"执行出错，session_id: {message.session_id}")
    # 无论何种情况，费用和轮次都有值
    print(f"总费用：${message.total_cost_usd:.4f}")
    print(f"总轮次：{message.num_turns}")
```

---

## 三、动手练习与参考答案

**练习**：实现一个 50 行最小 Agent Loop，加一个「最大迭代次数」终止策略，跑通一个简单问答。

**参考答案**：直接复用 2.1 的 `run_agent` 函数即可，「最大迭代次数」终止策略就是 `for i in range(max_iterations)` 这个硬限制（跑满后返回「达到最大迭代次数，循环终止」）。完整跑通一个简单问答的验证路径：

1. 注册一个最简单的工具，比如 `get_time`（返回当前时间字符串）；
2. 运行 `run_agent("现在几点了？", max_iterations=5)`；
3. 观察终端：Agent 调一次 `get_time` → 拿到结果 → 输出回答 → 循环自然结束（靠「不调工具就 return」的主动声明退出）；
4. 再把 `max_iterations` 改成 1，制造一个「硬限制兜底」场景，观察返回「达到最大迭代次数」的兜底提示。

**验收要点**：能说出「硬限制终止」和「LLM 自决终止」分别在代码里对应哪一行——前者是 `for` 循环的 `range(max_iterations)` 和最后的 `return`，后者是 `if not msg.tool_calls: return msg.content`。

---

## 四、自测题答案

1. **Loop 的四步是什么？**
   接收指令 → 思考（调 LLM）→ 执行（调工具）→ 观察（把结果塞回上下文）→ 判断（是否继续）。狭义四步常表述为「接收指令、思考、执行、观察」，判断是循环收口的一环。

2. **上下文「失忆」的三种解法？**
   滑动窗口截断（简单、适合短任务，注意 tool_use/tool_result 成对）；上下文压缩（保留关键信息、适合中长任务，摘要会丢细节）；外部记忆（存窗口外，适合超长任务和跨会话）。

3. **硬限制终止和 LLM 自决终止的区别？**
   硬限制 = `max_iterations` 这类写死的阈值，跑满强制停，用于兜底防死循环烧钱；LLM 自决 = 模型不再请求调工具、直接输出文本，代表它主动认为任务完成，用于正常情况下的优雅退出。两个都要：一个管异常兜底，一个管正常退出。

---

## 五、常见坑位提醒

1. **工具结果漏写 `role: "tool"` 或不带 `tool_call_id`**：API 会报错，因为 `tool_use` 和 `tool_result` 必须配对，模型才能把结果对应到具体的那次调用。

2. **只写硬限制、不写主动退出**：Agent 明明干完了还被强行多跑几轮，浪费钱；反之只写主动退出、不写硬限制，遇到死循环就出不来。

3. **工具内部抛异常**：一个工具报错会打断整个 Loop。正确做法是 `try/except` 后把错误字符串返回给 LLM，让它自己决定重试或换方案。

4. **`read_file` 不截断长度**：读大文件直接把上下文撑爆。像示例里 `[:2000]` 限制长度是基本素养。

5. **规则写在系统提示词而不是 CLAUDE.md**：系统提示词会被压缩丢掉，持久规则必须放 CLAUDE.md（每次请求重注入）。

6. **只看 ResultMessage 的 `result`、不看 `subtype`**：非 `success` 状态 `result` 是空的，会把「被强制终止」误判成「任务完成」。

7. **过早优化**：一上来就多 Agent + 向量记忆，任务其实 20 轮内就能搞定。先跑通、遇到问题再针对性地加。

8. **`max_tokens` 截断没处理**：`stop_reason == "max_tokens"` 时输出不完整，但 `subtype` 可能还是 success，容易漏判。
