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



# 1. 什么是PromptTemplate

我们在开发提示

# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。