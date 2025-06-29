---
title: 10篇 AI从零开始 - Langgraph开发(1) 
date: 2025-06-27 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

前面我们学了LangChain的使用和Agent开发，Langchain是一个线性工作流，如果想要在实际开发复杂的Agent，那么实现非常麻烦，比如可能会遇上一以下一些问题：

- 当调用某个工具方法出现错误或不是所需要的结果，需要循环调用工具方法直到返回需要的结果
- 当需要一次任务中，需要保存不同工作节点的状态
- 当需要调用不同LLM模型时候
- 当链路中断，需要从上一个工作节点继续执行
- ......

为了解决这些问题，LangChain抽象出一个高级框架: `LangGraph`，接下来就开始学习LangGraph的开发。

<!-- more -->

# 是什么

> LangGraph 是一个用于构建、管理和部署长期运行、有状态代理的低级编排框架，受到塑造代理未来的公司（包括 Klarna、Replit、Elastic 等）的信赖。


## 主要架构

一个LangGraph有状态(State)、节点(Node)、边(Egde)组成，如下图所示：

![LangGraph](/assets/img/ailearn/ai-learn10-01.png)

- **状态(State)**：可以理解为Agent整体上下文，用于存储Agent运行过程中产生的数据，比如：任务状态、任务结果等
- **节点(Node)**：可以理解为Agent调用的工具或函数，用于表示Agent执行过程中的一个步骤，比如：调用LLM模型、调用Tool API等
- **边(Edge)**：可以理解为Agent执行下一节点所需要执行的逻辑判断， 用于表示节点之间的链接关系，比如：判断是直接返回给用户，还是调用Tool工具


## 特性

- **循环和分支**：可以实现循环和条件判断
- **持久性**：在LangGraph中的每个节点Node后都会自动保存到状态State中，因此在任何时候暂时或异常中断都可以重新恢复
- **人机交互**：中断当前任务，是否允许当前节点执行还是跳过当前节点执行
- **流Stream支持**：支持流Stream输出
- **LangChain无缝集成**：LangGraph、LangChain、LangSimit 无缝集成，无需额外配置

# 怎么做

## 安装

```python
# 安装LangGraph LangChain  Ollama依赖的大模型
pip install -U langgraph langchain langchain_ollama
```

## Hello World示例

接下来我们尝试实现一个大模型调用日期Tool工具函数，实现获取当前日期的功能。

```python
# 创建一个日期工具函数
from datetime import datetime
from langchain_core.tools import tool

from langchain_ollama import ChatOllama
from langchain_core.messages import HumanMessage

# graph的各种节点与状态
from langgraph.graph import END, StateGraph, MessagesState
# 持久化状态
from langgraph.checkpoint.memory import MemorySaver
# 调用工具的node节点
from langgraph.prebuilt import ToolNode

# 
@tool
def get_current_day():
    """获取今天日期"""
    return datetime.now().strftime("%Y-%m-%d")

tools = [get_current_day]
# 创建工具节点
tool_node = ToolNode(tools)

# 绑定工具列表到大模型中
llm = ChatOllama(
    base_url="http://localhost:11434",
    model="qwen3:32b"
).bind_tools(tools)

# 定义调用LLM大模型Node节点
def call_llm(state: MessagesState):
    messages = state['messages']
    response = llm.invoke(messages)
    return {
        "messages": response
    }

# 1 定义工作流和初始化状态
workflow = StateGraph(MessagesState)

# 2 添加节点
workflow.add_node("agent", call_llm)
workflow.add_node("tools", tool_node)

# 3 定义工作流入口设定为agent
workflow.set_entry_point("agent")

# 4 添加条件边， agent有条件（是否继续执行函数判断）的流转线
# 定义函数，是否继续执行
def should_continue(state: MessagesState) -> Literal["tools", END]:
    messages = state['messages']
    # 获取最新的消息 判断是否应该调用工具
    last_message = messages[-1]
    # LLM调用工具 则转到tools节点
    if last_message.tool_calls:
        return "tools"
    return END

workflow.add_conditional_edges(
    # source 表示上一个节点输出的内容
    "agent",
    # 接下来要执行的判断操作
    should_continue,
)

# 5 添加tools到agent的普通链接，直接把tools返回内容给到agent
workflow.add_edge("tools", "agent")

# 6 添加checkpointer 经过每个节点都会保存到状态中，然后编译成LangChain链
# MemorySaver 支持redis、mongodb
checkpointer = MemorySaver()
app = workflow.compile(checkpointer=checkpointer)

# 7 执行graph
final_state = app.invoke(
    {"messages": [HumanMessage(content="今天几号")]}
)

# 8 获取最终结果输出
result = final_state["messages"][-1].content
print(result)
```

执行上面的代码，我们可以获得到当前的日期，结果如下图：

![LangGraph](/assets/img/ailearn/ai-learn10-02.png)


## 多轮会话功能

上面我们实现了让Agent调用工具函数获取当天日期，接下来我们实现通过会话记录，让Agent可以根据之前的记录回答问题。

```python

# 7 执行graph 添加会话id
final_state = app.invoke(
    {"messages": [HumanMessage(content="今天几号")]},
    # 这里config是配置是不是同一个会话的id
    config={"configurable": {"thread_id": 42}}
)

# 8 获取最终结果输出
result = final_state["messages"][-1].content
print(result)

# 9 测试记录会话状态
final_state = app.invoke(
    {"messages": [HumanMessage(content="我刚刚问的哪天")]},
    config={"configurable": {"thread_id": 42}}
)
result = final_state["messages"][-1].content
print(result)
```

最终LLM大模型返回结果如下图所示：

![LangGraph](/assets/img/ailearn/ai-learn10-03.png)

上面代码执行完后，可以大概LangGraph执行过程有个初步了解，也可以通过生成Meraid Graph图片具体代码如下：

```python
# 10 保存Graph到本地图片
graph_png = app.get_graph().draw_mermaid_png()
with open('langgraph1.png', 'wb') as f:
    f.write(graph_png)
```

最终得到图片，如下图所示: 
![LangGraph](/assets/img/ailearn/ai-learn10-04.png)

- `__start__`: 代表开始节点，也可以理解成初始化`StateGraph`工作流
- `agent`: 代表agent节点，设置了入口第一个节点，等同于`workflow.add_node("agent")`
- `tools`: 代表工具节点，设置了工具节点，等同于`workflow.add_node("tools", tool_node)`
- `实现连接线`: 代表当前节点执行完后，无需条件判断，直接流转到下一个节点，等同于`workflow.add_edge("tools", "agent")`
- `虚线连接线`: 代表条件边执行，当前节点执行完后，需要判断是否继续执行，如果继续执行则流转到下一个节点，否则流转到结束节点，等同于`workflow.add_conditional_edges("agent", should_continue)`
- `_end`: 代表结束节点

# 总结

经过上面学习，总结下本篇文章：

- LangGraph是LangChain的抽象而来的高级框架，能够实现更加复杂的工作流，如：循环、条件判断、多轮会话等
- LangGraph的几个核心概念：`State`、`Node`、`Edge`等作用
- 一个`HelloWorld`的例子，可以看出比LangChain更加简单，加上State多轮会话记录功能，减少开发工作量

# 参考资料

- [LangGraph官方文档](https://langchain-ai.github.io/langgraph/)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?p=10&share_source=copy_web&vd_source=ddb29dacf001bda27b38794cc29b82c8)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。
