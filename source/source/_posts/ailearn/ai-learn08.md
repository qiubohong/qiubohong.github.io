---
title: 08篇 AI从零开始 - LangChain学习与实战(5) 基于RAG开发问答机器人
date: 2025-03-15 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

前面几篇学习LangChain，基本上完成对 LangChain从开发到上线有一个整体的了解，那么接下来我们就要开始实战了，我们将会使用LangChain开发一个问答机器人，这个问答机器人将会使用到RAG模型，那么接下来我们开始学习RAG。

# RAG是什么

> RAG是一种用额外数据增强大模型知识的技术，俗称“RAG”（Retrieval-Augmented Generation），中文叫检索增强生成。

RAG是LangChain中一个重要的应用场景，它能够将检索和生成结合起来，从而生成更加精准的答案。

RAG模型由两个部分组成：Retriever和Generator。

- `Generator` 生成索引向量，根据文档中问题和答案生成索引向量数据库。
- `Retriever` 检索对比类似，根据用户的问题，从生成的知识库中检索召回最相关的问题和答案。

RAG技术是通过检索和生成相结合的方式找最相关的知识内容， 加入到大模型的提示语中，通过大模型推理得到用户问题在知识库中最合适的答案。

下面是我个人依据网上相关资料整理的通用RAG模型架构图：

![](/images/ailearn/ai-learn08-1.png)


## 生成向量索引（Indexing）
生成向量索引有三个步骤，分别如下：

1. 加载(load)，加载所需数据，LangChain中提供各种加载器，如：PDFLoader、TextLoader、ImageLoader等。
2. 分割(Split)，将加载的数据进行分割成一个个块，LangChain中提供各种分割器，如：TextSplitter、ImageSplitter等。
3. 存储(Store)，得到分割的Chunks，需要将Chunk转成向量索引并存储，这里我们会依赖`Embeddings`模型进行生成索引，然后存储到向量数据库`VectorStore`。



## Embeddings嵌入模型

RAG模型使用`Embeddings`模型将问题和答案进行编码，生成向量数据，这里我们必不可免需要对`Embeddings`模型进行初步了解。

> Embeddings模型，也叫嵌入模型，是一种将高维度的数据，如：自然语言、图片、视频等，转换成低维度的向量数据，如：多维矩阵数组等，方便后续进行相似度对比。

或者我们可以更加直观的理解，`Embeddings`模型可以把我们人类能够理解的内容，转换成计算机能够计算理解的数据，从而实现更多的算法对比逻辑。





<!-- more -->


# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。