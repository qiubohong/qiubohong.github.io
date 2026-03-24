---
title: 5分钟AI，每天搞懂一个知识点(XX) - ReAct
date: 2026-03-24 20:00:00
toc: true
tags:
  - 学习总结
  - 5分钟AI
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

今天我们来学习 **AI Agent 的核心设计模式 —— ReAct**

> 一句话核心：**ReAct** 就是让大模型"边想边做"——先思考再行动，循环往复，直到把事搞定。

说实话，我第一次看到 ReAct 这个名字的时候，还以为是某个前端框架（毕竟 React 太出名了）。后来深入研究才发现，这玩意儿跟前端框架八竿子打不着，但却是做大模型 Agent 必须掌握的核心套路。

它的核心思想特别朴素：让 AI 像侦探破案那样，看到线索 → 动动脑子 → 采取行动获取新线索 → 再分析……就这样一直循环，直到问题被彻底解决。

传统的大模型就是你问一句、它答一句，完事儿。但 ReAct 不一样，它让模型在执行任务过程中不断"停下来想想"："我现在该做什么？用什么工具？下一步怎么安排？"想好了就去执行，拿到结果回来再接着想。

说白了，就是把 AI 从"只会说的参谋"变成了"真的能办事的助手"。

<!-- more -->

# 是什么

先通过一张图来理解 ReAct 是怎么工作的：

其实 ReAct 就三个词的循环：**思考 → 行动 → 观察 → 再思考……**

具体来说就是：

- **思考（Thought）**：模型分析当前情况，想想接下来需要做什么
- **行动（Action）**：根据思考结果，决定调用啥工具、采取什么行动
- **观察（Observation）**：拿到行动的结果，作为下一次思考的依据

举个我自己折腾过的例子，我想让 AI 查询"特斯拉股价乘以 10 是多少"。

它的思考过程大概是这样的：

- Thought：我要算特斯拉股价乘以 10，但不知道现在股价是多少，得先查一下
- Action：调用搜索工具查"特斯拉当前股价"
- Observation：返回"当前特斯拉股价 250 美元"
- Thought：拿到股价了，250 乘以 10 等于 2500
- Action：调用计算工具算 250\*10
- Observation：返回 2500
- Thought：现在知道答案了，可以回复用户了
- Action：告诉用户答案是 2500 美元

整个过程特别像一个认真办事的人，遇到问题不瞎猜，而是想好了再动手，动手回来再复盘。

# 怎么做

光说不练假把式，下面看怎么实现一个简单的 ReAct Agent。

## 核心逻辑

我当初学这个的时候，先写了个最简版来理解原理：

```python
class ReActAgent:
    def __init__(self, llm, tools):
        self.llm = llm  # 大模型
        self.tools = tools  # 工具集
        self.memory = []  # 记忆

    def run(self, query):
        self.memory = [{"role": "user", "content": query}]

        while True:  # 开始思考-行动循环
            # 1. 让模型想想下一步干啥
            response = self.llm.chat(self.memory)

            # 如果出现最终答案，任务结束
            if "final_answer" in response:
                return response["final_answer"]

            # 如果需要调用工具
            if "action" in response:
                tool_name = response["action"]["name"]
                tool_input = response["action"]["input"]

                # 2. 执行工具
                result = self.tools[tool_name].run(tool_input)

                # 3. 记录结果，下次循环再用
                self.memory.append({
                    "role": "observation",
                    "content": result
                })
```

你看，核心就是一个 while 循环，不断让模型"想 → 做 → 观察"，直到拿到最终答案。

## 提示词设计

ReAct 能不能跑起来，关键看提示词怎么写。我总结了一个模板：

```
你是一个智能助手，解决问题请按照以下步骤：

1. 先想想现在是什么情况，还需要什么信息
2. 如果需要工具，按这个格式回复：
   Thought: [你在想什么]
   Action: [工具名]
   Action Input: [工具参数]

3. 如果信息够用了，直接给答案：
   Thought: [你在想什么]
   Final Answer: [最终答案]

可用工具：
- search(query): 搜索信息
- calculator(expression): 计算
- read_file(path): 读文件
```

提示词写得越清楚，模型行为越可控。我第一次写的时候没把格式约束好，模型就各种放飞自我，要么格式不对，要么死循环。

## 完整实战

来看一个能跑起来的完整例子：

```python
import json
from openai import OpenAI

client = OpenAI()

# 定义工具
class Tools:
    @staticmethod
    def search(query):
        # 模拟搜索功能
        mock_db = {
            "特斯拉股价": "当前特斯拉股价 250 美元",
            "马斯克": "埃隆·马斯克是 Tesla、SpaceX 创始人",
            "openai": "OpenAI 是 ChatGPT 的开发商"
        }
        return mock_db.get(query, f"没有找到关于：{query} 的信息")

    @staticmethod
    def calculate(expression):
        try:
            return str(eval(expression))
        except:
            return "计算出错"

# ReAct 核心逻辑
def react_agent(user_query, max_iterations=5):
    tools = Tools()

    # 系统提示词 - 这是关键！
    system_prompt = """你是一个 ReAct 智能助手。
按照 "思考 → 行动 → 观察" 的循环来解决问题。

每次只输出三个阶段的内容，格式如下：

Thought: [你现在掌握什么信息？还需要什么？打算怎么做？]
Action: [要调用的工具名]
Action Input: [传给工具的参数]

当信息足够回答用户问题时，输出：
Thought: [思考过程]
Final Answer: [给用户的最终回答]

可用工具：
- search(query): 搜索信息
- calculate(expression): 数学计算
"""

    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_query}
    ]

    for i in range(max_iterations):  # 防止死循环
        # 调用模型
        response = client.chat.completions.create(
            model="gpt-4",
            messages=messages
        )
        content = response.choices[0].message.content

        print(f"\n=== 第 {i+1} 轮 ===")
        print(content)

        # 拿到最终答案就结束
        if "Final Answer:" in content:
            return content.split("Final Answer:")[1].strip()

        # 解析工具调用
        if "Action:" in content and "Action Input:" in content:
            action = content.split("Action:")[1].split("\n")[0].strip()
            action_input = content.split("Action Input:")[1].strip()

            # 执行工具
            if action == "search":
                observation = tools.search(action_input)
            elif action == "calculate":
                observation = tools.calculate(action_input)
            else:
                observation = "未知工具"

            # 记录结果
            messages.append({"role": "assistant", "content": content})
            messages.append({
                "role": "user",
                "content": f"Observation: {observation}"
            })
        else:
            break

    return "达到最大循环次数，未找到答案"

# 测试一下
query = "特斯拉股价乘以10是多少？"
result = react_agent(query)
print(f"\n✅ 最终答案: {result}")
```

运行这个代码，你会看到模型一步步思考、调用工具、拿到结果，最后给出答案。

有几个坑我踩过，跟你提个醒：

- **必须设最大循环次数**：不然遇到复杂问题可能死循环
- **提示词要约束格式**：不然模型输出格式不固定，不好解析
- **工具返回要清晰**：模糊的结果会让模型搞不清状况

# ❄️ 冷知识

1. **ReAct 跟 React 没关系**：一个是 AI Agent 思路（Reasoning + Acting），一个是前端框架，纯粹名字像而已。

2. **出自 Google 之手**：ReAct 是 2022 年 Google Research 的论文提出的，学名叫"ReAct: Synergizing Reasoning and Acting in Language Models"。

3. **LangChain 默认就是这个**：如果你用过 LangChain 的 `AgentExecutor`，底层其实就是 ReAct 模式封装好的。

4. **可以跟 Function Calling 结合**：现在的实现通常用 Function Calling 让模型输出结构化的工具调用指令，比纯文本 parsing 更稳定。

5. **不是唯一模式**：除了 ReAct，还有 Reflexion（反思模式）、Plan-and-Solve（先规划再执行）等，不同场景选不同的。

# 参考资料

- [ReAct 论文原文](https://arxiv.org/abs/2210.03629)
- [LangChain ReAct Agent 文档](https://python.langchain.com/docs/modules/agents/agent_types/react)
- [OpenAI Function Calling 文档](https://platform.openai.com/docs/guides/function-calling)
