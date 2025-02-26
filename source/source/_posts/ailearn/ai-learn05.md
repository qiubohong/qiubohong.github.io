---
title: 05篇 AI从零开始 - LangChain学习与实战(2) PromptTemplate降低AI幻觉
date: 2025-02-20 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)


上一节学习了[04篇 AI从零开始 - LangChain学习与实战(1) 基础知识](https://qborfy.com/ailearn/ai-learn04.html)，对Langchain有了基础的认知和简单应用，其中我们使用`PromptTemplate`去实现一次大模型对话。

同时我们在[03篇 AI从零开始 - Prompt提示语学习与应用](https://qborfy.com/ailearn/ai-learn03.html)也学习了提示语生成规范，但是在结合 LangChain中我们应该如何利用`PromptTemplate`提示模板+提示语规范去降低 AI幻觉呢？

> **AI幻觉**, 指人工智能（尤其是大语言模型）生成看似合理但实际错误、虚构或与现实不符的内容的现象。本质是模型在缺乏真实理解能力的情况下，基于统计模式生成的「自信错误」。

<!-- more -->

下面是 Langchain执行一次 LLM 调用的流程图：

![](/assets/img/ailearn/ai-learn05-1.png)


# 1. 什么是PromptTemplate

提示词模板跟平时大家使用邮件模板、短信模板类型，本质上是一个字符串模板，模板里包含了模板参数，可以通过输入参数来生成最终的提示词。

一个提示词模板包括以下内容：

- 发送给大模型的指令
- 一个问答示例，提醒大模型用什么格式返回
- 发给大模型的问题

# 2. 创建提示词模板

可以使用`PromptTemplate`类来创建一个提示词模板，它接收一个`prompt`参数，这个参数是一个字符串，用于指定提示词模板。

```python
from langchain_core.prompts import ChatPromptTemplate

# 通过一个消息数组创建聊天消息模板
# 数组每一个元素代表一条消息
# 第一个参数是消息角色  system 代表系统消息， 第二个参数代表消息内容
# 消息角色 system 代表系统消息
# 消息角色 human 代表系统消息代表人类
# 消息角色 ai 代表LLM大模型返回的消息内容
# {xxx} 定义 模板参数，如下定义两个模板参数  name代表人工智能名字 user_input 代表用户输入的文本 
chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", "你是人工智能助手， 你的名字是{name}"), 
        ("human", "你好"), 
        ("ai", "你好，我是人工智能助手{name}，很高兴为您服务"), 
        ("human", "{user_input}"),
    ]
)

# 通过模板参数格式化模板内容
message = chat_template.format_messages(name="小爱同学", user_input="你的名字叫什么？")

print(message)
```

这样子我们就可以得到一个正确的`Message`了， 如上代码执行结果如下：

![](/assets/img/ailearn/ai-learn05-2.png)

返回的内容如下说明：

- SystemMessage: 系统设定，设定大模型的角色
- HumanMessage: 人类消息，代表用户输入的消息
- AIMessage: 人工智能消息，代表大模型返回的消息

LangChain还抽象了其他提示语模版，具体如下：

- PromptTemplate: 普通提示词模板，返回一个字符串
- ChatPromptTemplate: 聊天消息模板，返回一个`ChatPromptTemplate`对象，可以设定大模型角色和示例

# 3. 上下文 MessagesPlaceHolder

`MessagesPlaceHolder`主要作用在特定位置添加消息列表(等于占位符)， 可以集中管理消息列表，更好聊天过程注入上下文。

```python
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.messages import SystemMessage, HumanMessage, AIMessage

chat_template = ChatPromptTemplate.from_messages(
    [
        ("system", "你是人工智能助手"), 
        MessagesPlaceholder("msgs")
    ]
)
# 这里我们可以之前的定义的消息列表放在一起
msgs=[SystemMessage(content='你的名字是小爱同学'), HumanMessage(content='你好'), AIMessage(content='你好，我是人工智能助手，很高兴为您服务')]

print(chat_template.invoke(msgs))
```

# 4.提示词示例 FewShot

在之前[03篇 AI从零开始 - Prompt提示语学习与应用](https://qborfy.com/ailearn/ai-learn03.html)中也提到过示例的重要性， 这里我们不在说示例对应大模型应用中的重要性了。

我们看看 在 LangChain中如何讲示例集 给到大模型中，其中`FewShot`主要作用是给大模型提供示例，让大模型更好的理解用户输入，从而生成更符合用户预期的结果，从而降低 AI 幻觉。

> 这里可以理解成模型的微小型训练，让大模型能依据我们提供少量示例（有点类似小RAG知识库），从而更加更加准确的答案。

在 LangChain 创建一个示例集，如下：
```python
from langchain.prompts.few_shot import FewShotPromptTemplate
from langchain.prompts import PromptTemplate

examples = [
    {
        "question": "谁的寿命更长， 穆罕默德二世还是爱因斯坦？",
        "answer": 
        """
        爱因斯坦活了 76 岁。
        穆罕默德二世活了 89 岁。
        因此，穆罕默德二世比爱因斯坦活得更长。
        """
    },
    {
        "question": "目前电影票房第一名是谁？",
        "answer":
        """
        《阿凡达》的票房是 27.9 亿美元。
        《复仇者联盟 4：终局之战》的票房是 27.8 亿美元。
        因此，《阿凡达》的票房更高。
        """
    },
]
# 这里我们创建一个简单示例模板，用来分析解析示例的 question 和 answer
example_prompt = PromptTemplate(input_variables=["question", "answer"], template="问题：{question}\\n答案：{answer}")

# 用 FewShotPromptTemplate 可以根据模板+示例去生成一个拥有示例集的提示语模板
prompt = FewShotPromptTemplate(
    examples=examples,
    example_prompt=example_prompt,
    suffix="问题：{input}",
    input_variables=["input"],
)

print(prompt.format(input="谁的寿命更长， 穆罕默德二世还是爱因斯坦？"))
```

输出结果如下：

![](/assets/img/ailearn/ai-learn05-2.png)

# 5. 示例选择器 ExampleSelector

示例集合等同于一个知识库，在正式环境中我们不可能把完整的知识库都给到模型，因此我们需要去分析用户输入，从而选择合适的示例，LangChain 提供了`ExampleSelector`类来帮助我们实现这个功能。

LangChain 提供了不同的`ExampleSelector`，具体如下：

- `SemanticSimilarityExampleSelector`: 语义相似性示例选择， 会根据用户输入，然后通过嵌入模型计算输入与示例之间的相似性，然后使用向量数据库进行相似搜索，从示例集合中选择最相似的示例。
- `MaxMarginalRelevanceExampleSelector`: 基于 最大边际相关性（MMR） 的示例选择器,  希望在从示例集中选择与输入 既相关又多样化 的示例， 通过平衡 相关性 与 多样性 来优化示例选择效果。

通常情况下，我们使用`SemanticSimilarityExampleSelector`， 根据上面示例集合，我们根据问题去选择示例，如下：

```python
# ExapleSelector 示例筛选器
from langchain.prompts.example_selector import SemanticSimilarityExampleSelector
from langchain_chroma import Chroma
from langchain_ollama.embeddings import OllamaEmbeddings
from langchain.prompts import FewShotPromptTemplate, PromptTemplate

# 引用 shaw/dmeta-embedding-zh 模型做为嵌入模型，其对中文支持度更加友好
ollama_emb = OllamaEmbeddings(
    base_url="http://9.134.252.70:11434", 
    model="shaw/dmeta-embedding-zh",
)

examples = [
    {
        "question": "谁的寿命更长， 穆罕默德二世还是爱因斯坦？",
        "answer": 
        """
        爱因斯坦活了 76 岁。
        穆罕默德二世活了 89 岁。
        因此，穆罕默德二世比爱因斯坦活得更长。
        """
    },
    {
        "question": "目前电影票房第一名是谁？",
        "answer":
        """
        《阿凡达》的票房是 27.9 亿美元。
        《复仇者联盟 4：终局之战》的票房是 27.8 亿美元。
        因此，《阿凡达》的票房更高。
        """
    },
    {
        "question": "深圳第一高楼是哪个？",
        "answer":
        """
        深圳平安国际金融中心（平安中心）的楼高是 593米。
        深圳京基100	的楼高是441.8米。
        所以深圳第一高楼是平安国际金融中心。
        """
    },
]

example_selector = SemanticSimilarityExampleSelector.from_examples(
    # 这里是示例集合
    examples=examples,
    # 用户生成嵌入的嵌入类，用于衡量语义的相似度
    embeddings=ollama_emb,
    # 用于计算相似性的向量存储库，这里使用的是 Chroma， 一个保存在内容的向量存储库
    vectorstore_cls=Chroma(),
    # 选择前 k 个最相似的示例 这里设置为 1
    k=1,
)

question = "穆罕默德二世？"
# 选择最相似的示例
selected_examples = example_selector.select_examples({"question": question})

# 接下来结合 FewShotPromptTemplate 我们就可以得到更加准备且少量的示例 PromptTemplate
example_prompt = PromptTemplate(input_variables=["question", "answer"], template="问题：{question}\\n答案：{answer}")

prompt = FewShotPromptTemplate(
    # 这里调整完最相似的示例集合
    examples=selected_examples, 
    example_prompt=example_prompt,
    suffix="问题：{input}",
    input_variables=["input"],
)

print(prompt.format(input=question))
```

具体输出效果如下图：

![](/assets/img/ailearn/ai-learn05-4.png)

# 总结

本文我们完整学习了 LangChain 中如何使用 PromptTemplate去更好的创建一个提示语模板，从而降低 大模型的自我创新性（降低AI 幻觉）。

这里总结一下整个实现过程 约等于 后续 RAG知识库训练过程，如下图所示：

![](/assets/img/ailearn/ai-learn05-5.png)



# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。