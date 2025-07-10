---
title: 11篇 AI从零开始 - Langgraph开发(2) 
date: 2025-07-11 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

# 工作流是什么

前面我们对LangGraph知识有一个基础入门，如果要完成一个真正的Agent工作流应用开发，还是远远不够的。

一个复杂且完整的Agent工作流应用，需要完成以下几个方面：

1. 确定工作流目标，如：规划未来的旅游行程
2. 按照目标规划和拆分任务清单，如：预定酒店、饮食推荐、景点参观时间等等
3. 单执行任务（包含异常中断且重试机制），如：预定酒店
4. 更新任务状态给工作流，如：预定酒店成功或失败
5. 对任务清单状态进行重新思考或规划，如：预定酒店失败后需要重试其他渠道
6. 对任务状态反馈给到用户，如：给用户酒店预定失败，是否选择其他渠道预定

<!-- more -->

具体可如下图所示：

![LangGraph](/assets/img/ailearn/ai-learn11-01.png)

这里我们可以和`ReAct` 推理+输出风格的Agent做对比，这种属于`Reflexion`自我反思+动态记忆的Agent模式，有以下几个优点：

- 只需要在规划拆分任务清单的时候使用能力强的大模型
- 其他任务执行，可以使用能力小的大模型或者不需要大模型参与

我们可以根据下图对比，加深工作流和Agent模式的区别：

![LangGraph](/assets/img/ailearn/ai-learn11-02.png)

# 实现工作流

目标：实现一个简单的可以按照目标拆分任务实现的Agent工作流

## 环境准备

1. 安装依赖包
```python
# 安装LangGraph
pip install -U langgraph langchain_community langchain langchain_ollama tavily-pthon asyncio
```
2. 设置LangSmith
方便后续调试工作流执行过程
```python
# 设置LangSimth 环境变量
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_ENDPOINT"] = "https://api.smith.langchain.com"
os.environ["LANGSMITH_API_KEY"] = "<LANG_SIMTH_KEY>"
os.environ["LANGSMITH_PROJECT"] = "mylangserver"
```
## 开发

### 方案设计

1. 计划节点：针对目标去拆分任务步骤
2. 执行节点：执行任务步骤和任务反馈
3. 更新计划节点：更新计划和步骤执行完后反馈内容给用户

### 步骤一： 实现计划节点

1. 定义计划和计划执行状态数据结构
```python
# 导入各种类型定义 让大模型按照该定义返回数据结构
from typing import Annotated, List, Tuple, TypedDict
from pydantic import BaseModel, Field


# 定义Plan计划 模型类，用来计划要做的事情
class Plan(BaseModel):
    """计划任务"""
    steps: List[str] = Field(
        description="需要执行的不同步骤，应该按照顺序执行"
    )

# 定义一个TypedDict数据结构，用于存储整个工作流的输入、计划、过去的步骤和相应内容
class PlanExcuteState(TypedDict):
    input: str  # 用户plan = await  plan_langchain.invoke({"messages): [("user输, state["input入
    plan: List[str]  # 拆分计划
    past_steps: Annotated[List[Tuple], operator.add]  # 任务步骤
    response: str

# 生成计划步骤
async def plan_step(state: PlanExcuteState):
    plan = await plan_langchain.ainvoke({"messages": [("user", state["input"])]})
    return {"plan": plan.steps}

```

2. 通过 LLM 生成计划

```python
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import ChatOllama

# 创建一个计划生成的提示语
plan_prompt = ChatPromptTemplate(
    [
        (
            "system",
            """对于给定的目标，提出一个简单逐步计划。这个计划应该包含独立的任务，如果正确执行将得出正确的答案，不要添加任何多余的步骤，最后一步的结果应该是最终答案。确保每一步都有必要的信息- 不要跳过步骤"""
        ),
        (
            "placeholder",
            "{messages}"
        )
    ],
)
# 按照Plan数据结构 生成计划
plan_langchain = plan_prompt | ChatOllama(
    base_url="http://localhost:11434",
    model="qwen3:32b ", # 这里采用qwen32b 计划对模型要求比较高
    temperature=0
).with_structured_output(Plan)

# 调试输出什么内容
# result = plan_langchain.invoke({ "messages": [("user", "马拉松记录保持者是谁？")]})
# print(result)
```

### 步骤二：实现执行节点

```python
# 调用工具的node节点 方便后面扩展使用
from langgraph.prebuilt import create_react_agent

llm = ChatOllama(
    base_url="http://localhost:11434",
    model="qwen3:8b", #这里可以用小模型，任务目标比较明确可以直接执行
    temperature=0
)

agent_prompt = ChatPromptTemplate(
    [
        (
            "system",
            """你是一个很有用的助手，需要按照计划帮用户执行步骤"""
        ),
        (
            "placeholder",
            "{messages}"
        )
    ],
)
# 执行者 Agent
agent_executor = create_react_agent(llm, tools, prompt=agent_prompt)

# 执行计划步骤
async def execute_step(state: PlanExcuteState):
    steps = state["plan"]
    # 拆分成详细的步骤，方便模型理解
    step_str = "\n".join(f"{i + 1}. {step}" for i, step in enumerate(steps))
    task = steps[0]
    task_format = f"""对于以下计划：\n{step_str}\n\n\n你的任务是执行第{1}步, {task}。"""
    agent_response = await agent_executor.ainvoke(
        {"messages": [("user", task_format)]})
    content = agent_response["messages"][-1].content
    # 返回已经执行的步骤
    return {
        "past_steps": state["past_steps"] + [(task, content)]
    }
```

### 步骤三：实现更新计划节点

```python
# 调用工具的node节点 方便后面扩展使用
from typing import Union

# 定义Response最终返回结果的数据结构
class Response(BaseModel):
    """返回给用户的结果"""
    response: str

# 定义Action行为类，用于描述执行任务的行为
# 属性action，类型为Union[Response, Plan],表示可以是 Response | Plan
# action的属性描述为： 要执行任务的行为，如果要回应用户则使用Response；如果需要进行一步通过工具获取答案，使用Plan
class Action(BaseModel):
    """要执行的行为"""
    action: Union[Response, Plan] = Field(
        description="要执行的行为。如果要回应用户，使用Response。如果需要进一步获取答案，使用Plan"
    )

# 使用指定提示语创建一个重新计划生成器
replan_langchain = replan_prompt | ChatOllama(
    base_url="http://localhost:11434",
    model="qwen3:32b",
    temperature=0
).with_structured_output(Action)

 # 重新计划
async def replan_step(state: PlanExcuteState):
    output = await replan_langchain.ainvoke(state)
    if isinstance(output.action, Response):
        return {"response": output.action.response}
    else:
        # 如果没有回复步骤，说明调用有问题，需要重新计划
        if len(output.action.steps) <= 0:
            return {"plan": state["plan"]}
        return {"plan": output.action.steps}
```

### 步骤四：实现LangGraph工作流

```python
# graph的各种节点与状态
from langgraph.graph import START, StateGraph

# 开始创建工作流
workflow = StateGraph(PlanExcuteState)
workflow.add_node("planner", plan_step)
workflow.add_node("execute", execute_step)
workflow.add_node("replan", replan_step)
# 等同于 workflow.set_entry_point("plan")
workflow.add_edge(START, "planner")
workflow.add_edge("planner", "execute")
workflow.add_edge("execute", "replan")

#定义一个结束判断函数
def is_end(state: PlanExcuteState):
    # 重新计划为空
    if state["plan"] is None or len(state["plan"]) == 0:
        return "replan"
    if "response" in state and state["response"]:
        # 等同于 return END
        return "___end___"
    else:
        return "execute"

workflow.add_conditional_edges("replan", is_end)

# 执行工作流
app = workflow.compile()
# 配置最大循环次数15
config = {"recursion_limit": 15}

# 问题
inputs = {"input": "请问马拉松世界纪录保持者是谁"}

# 异步调用库
import asyncio

# 主函数入口
async def main():
    async for event in app.astream(inputs, config=config):
        for key, value in event.items():
            if key != '__end__':
                print(f"{key}: {value}")
            else:
                print(value)

asyncio.run(main())
```

最终结果如下图：

![](/assets/img/ailearn/ai-learn11-3.png)


# 总结

回顾一下，通过本篇文件我们学习了：

- 

# 参考资料

- [LangGraph官方文档](https://langchain-ai.github.io/langgraph/)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?p=10&share_source=copy_web&vd_source=ddb29dacf001bda27b38794cc29b82c8)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。









