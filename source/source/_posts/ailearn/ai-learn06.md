---
title: 06篇 AI从零开始 - LangChain学习与实战(3) LCEL工作流编排原理与实战
date: 2025-03-03 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

上一篇文章我们学习[05篇 AI从零开始 - LangChain学习与实战(2) PromptTemplate降低AI幻觉](ttps://qborfy.com/ailearn/ai-learn05.html)，对 LangChain实际应用有了基本的了解，接下我们会进入 LangChain最重要的一次学习，就是 LangChain工作流编排原理与实战(LCEL), 学了本文基本上后续 LangChain实际开发都可以独立完成，本文内容较多，建议大家收藏，慢慢学习。

<!-- more -->

# 1. LCEL介绍

LCEL(LangChain Expression Language) 是 LangChain提出来一种强大的工作流编排模式，可以通过基础组件去构建复杂任务链条式，包括但不限于：

- 流式处理
- 并行处理
- 日志记录
- ...等等

## 1.1 LCEL的特性

- **一流的流式支持**： 通过 LCEL 构建链时， 可以获得链式最佳时间（从第一个任务到最后一个输出所经历的时间），如：你通过不同链路调用 LLM 大模型到输出 ≈ 直接调用 LLM 大模型输出
- **异步支持**：LCEL链路中任何一个任务都可以异步执行，如：你可以在一个任务中调用另一个任务，而无需等待该任务完成
- **优化的并行任务处理**：针对多个并行步骤时候，LCEL会自动优化并行任务，达到最小延迟
- **重试和回退**：LCEL 链路中的任何任务都可以重试，如果失败，可以回退到上一个任务
- **访问中间结果**：可以访问 LCEL 链中的任何任务的结果，可以给用户提供实时结果和方便开发调试
- **标准化的输入和输出模式**：每个 LCEL链都可以直接使用 `Pydantic`对象和 `JSON`对象作为输入和输出，从而更好验证链路的正确性，并且LangServer的重要组成部分

# 2. LCEL原理设计 —— Runable Interface
LCEL之所以有如此强大的功能，离不开它的设计理念 —— Runable Interface，LangChain一套标准且强大的接口设计规范，让所有的组件都按照这个去实现，从而实现 LCEL 工作流编排。

Runable Interface接口设计有以下几个方面“


## 2.1 标准调用方法

同步调用方法：
- stream: 支持按照 stream流式返回
- invoke: 支持同步调用
- batch: 批量调用，等于多个invoke调用

结合`await`实现异步调用的方法：
- astream: 异步调用stream流式返回
- ainvoke: 异步调用
- abatch: 异步调用批量调用，等于多个ainvoke调用
- astream_log: 异步返回中间步骤，可以监控异步调用，最终会返回最后的结果
- astream_envent: stream的异步事件监听，如：开始调用和结束调用触发

## 2.2 输入和输出

LangChain的输入和输出都是遵循`schema`规范，从可运行对象结构自动生成对应的`Pydantic`模型。

> `Pydantic`是用于数据建模/解析的Python库，它允许您定义一个数据模型，然后使用该模型验证输入和输出。
> 它可以帮助您确保输入和输出数据符合预期的格式和类型，从而提高代码的健壮性和可维护性。
> 同时 `Pydantic` 内置了对JSON编码和解码的支持。

不过不同组件输入类型和输出类型是不同的，下面常用 LangChain组件输入和输出类型：

| 组件        | 输入类型                     | 输出类型                                             |
| ----------- | ---------------------------- | ---------------------------------------------------- |
| 提示 Prompt | string                       | PromptTemplate提示值                                 |
| 聊天模型    | string、聊天信息列表、提示值 | string                                               |
| LLM         | string、聊天信息列表、提示值 | string                                               |
| 输出解析器  | LLM、 LLM的输出              | 取决于解析器的类型，如 `jsonparser`输出的是 json格式 |


流式运行对于基于 LLM 开发的应用会对用户使用体验上有更好的体验，所以目前LangChain中重要的组件都实现 LangChain Runable Interface中的 `stream`和`astream`，如：`PromptTemplate`、`ChatModel`、`LLM`、`OutputParser`等。

## 2.3 Stream流

上面弄清楚 LCEL的运行原理，我们还需要了解 `Stream`这一概念，才能更好的理解 LCEL工作流编排。

> `Stream` 指的是一个数据流，它表示一个连续的数据序列，可以是一个数据块、一个文件、一个数据库表、一个网络连接等。在计算机科学中，流通常用于表示实时数据传输，例如从网络连接中接收的数据、从文件中读取的数据等。流数据具有连续性、实时性和不可预测性等特点，因此处理流数据需要特殊的算法和数据结构。

在 LangChain中所有 Runable对象都实现了 `stream(同步)` 和 `astream(异步)`接口，通过 `stream` 和 `astream`接口，LangChain链式中的每个任务步骤都可以按照流式输入与输出。
从简单的任务，如发起一个 LLM调用，到复杂的任务，如：传输json数据等。


# 3. LCEL工作流编排实战
了解完 LCEL工作流编排原理，我们开始实战，下面我们通过几个的例子，来更好理解 LCEL工作流编排。

## 3.1 一次基础的流式调用
我们去调用一个 Ollama 大模型，然后调用 `stream`方法，看看最终会输出什么？

```python
# 实现langchain调用 ollama 大模型
from langchain_ollama.llms import OllamaLLM

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-r1:32b")

chunks = []
# llm.stream 会返回一个流
for chunk in llm.stream("海洋是什么颜色"):
    chunks.append(chunk)
    print(chunk, end="|", flush=True)
```

最终输出效果，按照一块块输出，如下图：

![](/assets/img/ailearn/ai-learn06-1.png)

## 3.2 astream 异步调用

进一步看看`astream`调用和`stream`调用有什么区别？

```python
# 实现langchain调用 ollama 大模型
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
import asyncio

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-r1:32b")
propmt = ChatPromptTemplate.from_template("给我讲一个关于{input}的笑话")
parser = StrOutputParser()
chain = propmt | llm | parser

# 异步调用需要定义 async 方法
async def async_stream():
    async for chunk in chain.astream("公鸡"):
        print(chunk, end="|", flush=True)

# 调用的话需要通过  asyncio.run() 方法       
asyncio.run(async_stream())
```

异步调用需要定义 async 方法，调用的话需要通过  asyncio.run() 方法，最终效果和`stream`调用效果一样，不过在并行任务较多的情况下，`astream`调用会利用更多的CPU资源，从而提高并行任务处理效率。

## 3.3 json输出格式

在实际应用中，我们很多场景其实 web服务通过 http协议传输，而且希望能被其他服务调用因此`json`格式输出会更好，下面我们看看如何实现？

```python
# 实现langchain调用 ollama 大模型
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser
import asyncio

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-r1:32b")
propmt = ChatPromptTemplate.from_template(
    """
    以 JSON格式返回{x}的人口列表
    使用一个`省份`作为字段列表返回
    每个省份都应有有字段`省份名`+`人口`字段                                  
    """)
parser = JsonOutputParser() # 保证每次输出都是json格式
chain = propmt | llm | parser

# 异步调用需要定义 async 方法
async def async_stream():
    async for chunk in chain.astream("广东省、福建省、广西省"):
        # 可以看到每次 chunk都是一个完整的 json 格式
        print(chunk, end="\n", flush=True)

# 调用的话需要通过  asyncio.run() 方法       
asyncio.run(async_stream())
```

上文我们可以看到用到`JsonOutputParser`，它保证每次输出都是json格式，所以最终输出效果如下：
![](/assets/img/ailearn/ai-learn06-2.png)

## 3.4 stream_event监听

我们先看调用一个 LLM模型会产生哪些事件？

```python
# 实现langchain调用 ollama 大模型
from langchain_ollama.llms import OllamaLLM
import asyncio

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-r1:32b")
async def async_stream():
    async for event in llm.astream_events("你好", version="v2"):
        print(event)
# 调用的话需要通过  asyncio.run() 方法       
asyncio.run(async_stream())
```

输出如下图：

![](/assets/img/ailearn/ai-learn06-3.png)

返回`event`数据结构如下：

- `event`事件类型，如：`stream_start`、`stream_end`、`stream_chunk`等
- `data`事件数据，如：`stream_chunk`事件数据为`chunk`，`stream_end`事件数据为`end`等
- `run_id`本次调用id，当多次任务并发的时候可以找到对应任务
- `metadata`事件元数据，包括模型版本、模型名称、模型参数等
- 其他一些其他信息，如：`tags`、`name`、`parent_ids`等

完整的事件类型我们可以到 LangChain官方文档去查看，地址为[如何使用 Stream Events](https://python.langchain.com/docs/how_to/streaming/#using-stream-events)

# 总结

通过本文我们完整了解 LangChain LCEL流式调用和工作原理，从而为后续使用LangChain进入实际开发提供基础知识。 LCEL主要包含以下内容：

- 流式调用方法 `stream`、`astream`
- 调用事件监听 `astream_events`
- 输出格式要求 `JsonOutputParser`等

# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。