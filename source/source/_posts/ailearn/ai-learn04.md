---
title: 04篇 AI从零开始 - LangChain学习与实战(1) 基础知识
date: 2025-02-18 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)


上一节学习了[03篇 AI从零开始 - AI从零开始 - Prompt提示语学习与应用](https://qborfy.com/ailearn/ai-learn03.html)，但是我们发现，Prompt提示语虽然可以让我们得到想要的答案，但是它也有缺点，比如：

- 只调用单个大模型的对话提示语来生成答案，且无法验证答案的正确性；
- 大模型是没有记忆能力，且有token上下对话长度限制，无法实现多轮对话；
- 多步骤推理任务，需要多次调用大模型，效率低下

如果要开发一个完整 LLM应用，开发者需要手动处理：

- 多组件集成：模型调用、外部数据源、记忆存储、业务逻辑等模块的拼接
- 上下文管理：对话历史、长期记忆、知识库检索的复杂交互
- 流程编排：多步骤推理、条件分支、循环控制等逻辑

接下来，我们学习一下LangChain，它是一个基于链式调用的LLM框架，可以让我们更加方便地使用大模型，实现多轮对话、多步骤推理等复杂功能。

<!-- more -->

# 1. 是什么

> Langchain是开发由大型语言模型（LLMS）提供支持的应用程序的框架。

从我理解的是， LangChain 是一个用于开发大语言模型（LLM）应用的框架，它的核心价值在于简化复杂语言模型应用的开发流程，并提供标准化的工具链。

## 1.1  基础功能

Langchain 提供了以下基础功能：

- LLM调用: 支持调用 OpenAI、Hugging Face、Azure 等主流的 LLM 服务， 同时支持缓存。
- Prompt管理: 拥有大量的文档加载器，比如 PDF、Markdown等
- 对索引的支持: 文档分割器，向量化，对接向量存储与搜索，比如 Chroma、Pinecone、Qdrand等 
- Chains链路调用: LLMChain、各种工具Chain等

## 1.2 必知概念

### LLM模型和Prompt提示语

Langchain 针对所有的LLM大模型的 API 进行抽象，统一了大模型访问API，同时也提供了 Prompt 模板管理机制。

### Chain 链
可以把 Chain 理解为任务。一个 Chain 就是一个任务，当然也可以像链条一样，一个一个的执行多个链。

### LCEL 表达式
LCEL: LangChain Expression Language，通过表达式解决工作流编排问题，可以灵活自定义 AI任务处理流程，也就是自定义链。

### 数据增强生成 RAG
RAG: Retrieval Augmented Generation，用于增强大模型的知识内容，录入新的信息到大模型中的一种模式。

### Agents 智能体
Agent其实是大模型的一种应用设计模式，利用 LLM自然语言理解能力和推理能力，去实现用户输入需求自动调用外部系统、设置去共同完成任务。

![](/assets/img/ailearn/ai-learn04-1.png)

常见的智能体：

- 对话机器人，值班客服，智能客服等
- 知识库问答，基于某个知识库进行回答
- 智能写作，如：创意写作，文本摘要等

### Memory 模型记忆
LangChain提供一套内存机制，让LLM可以记住对话上下文内容，从而实现模型记忆。

### OutParsesr 输出解释器

Langchain接收大模型返回文本内容（原始数据基本上是 markdown格式）后，可以使用专门的输出解析器转换数据结果，比如转成 json， 或者转换为 python对象等。

### Vectorstores 向量数据库

将 Document 文档转换成向量存储，才能进行向量存储。因为大模型只能处理向量，所以需要将文本转换成向量。

转换成向量也很简单，只需要我们把数据存储到对应的向量数据库中即可完成向量的转换。

官方也提供了很多的向量数据库供我们使用。

> https://python.langchain.com/en/latest/modules/indexes/vectorstores.html

### Embedding 嵌入

Embedding（嵌入） 是将文本转化为数值向量（vector）的核心技术，用于捕捉语义信息并实现机器可理解的表示。

Langchain 提供了多种 Embedding 模型调用，具体可以到官网查看，[Embedding models  嵌入模型](https://python.langchain.com/docs/integrations/text_embedding/)。


更多概念可以到官方文档查看：[LangChain官方概念指南](https://python.langchain.com/docs/concepts/#concepts)。


## 1.3 基础框架

LangChain(v0.3版本)的框架图如下：

![langchain-architecture](/assets/img/ailearn/ai-learn04-2.png)

更加详细说明

- LangChain-Core: 抽象了不同组件和组合在一起的方法，包括：聊天模型、向量存储、工具等核心组件的接口，尽量不依赖其他库。
- LangChain: LangChain对外提供主要入口框架，集成绝大部分功能点。
- Integration packages: 主流库的集成，比如：langchain-openai、langchain-anthropic，这里他们可以自主控制版本，这里可以看到[集成包的信息](https://python.langchain.com/docs/integrations/providers/)。
- LangChain-community: Langchain社区提供的工具包，比如：langchain-ollama、langchain-duckduckgo、langchain-google、langchain-bing等。
- LangGraph: 提供给 Langchain 链中更多可扩展性，用于创建常见代理类型的高级接口，以及用于组成自定义流程的底层应用程序接口。
- langServe: 可以让你的链转换为Restful服务暴露给外部系统
- LangSmith: 一个开发人员平台，可让您调试，测试，评估和监视LLM应用程序。

# 2. 怎么做
为了更好地使用 LangChain，我们先来写一个简单的例子，来了解下 LangChain 的使用流程。

## 2.1 安装和初始化项目

```shell
# 新建目录
mkdir ai-learn04-langchain && cd ai-learn04-langchain
# 初始化venv环境
python -m venv venv
# 激活venv环境
. venv/bin/activate
```

安装后续依赖pip 新建文件`requirements.txt`，写入以下内容：

```shell
langchain==0.3.19
langchain-community==0.3.17
langchain-ollama==0.2.3
```
执行`pip install -r requirements.txt`安装依赖。

## 2.2 第一次调用大模型问答
新建一个`demo1.py`文件，写入以下代码：

```python
# 实现langchain调用 ollama 大模型
from langchain_ollama.llms import OllamaLLM
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-r1:32b")

template = "你是世界级的 AI 技术专家, {input}"
# 这里我们使用一个简单的模板
prompt = PromptTemplate(
    input_variables=["input"],
    template=template
)
# 创建一个简单的链式调用
chain = prompt | llm | StrOutputParser()

# 执行链式调用
response = chain.invoke({
    "input":"请写一篇关于 AI 的文章，字数不大于 100"
})
print(response)
```

输出结果如下图所示：

![langchain-1](/assets/img/ailearn/ai-learn04-3.png)

# 3. 总结

Langchain让我们实现调用一个大模型API 变得更加简单，只需要几行代码就会实现一个简单对话。主要实现逻辑为：

- 引入 Langchain 封装好的大模型的库
- 创建一个 PromptTemplate 模板
- 创建一个链式调用，包括：PromptTemplate | 大模型 | StrOutputParser
- 执行链式调用并输出结果

> 记录问题： 如果我部署的大模型 Langchain 没有找到对应的模型，应该怎么做？


# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。