---
title: 06篇 AI从零开始 - LangChain学习与实战(3) LCEL工作流编排原理与实战
date: 2024-04-06 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

上一篇文章我们学习[05篇 AI从零开始 - LangChain学习与实战(2) PromptTemplate降低AI幻觉](ttps://qborfy.com/ailearn/ai-learn05.html)，对 LangChain实际应用有了基本的了解，接下我们会进入 LangChain最重要的一次学习，就是 LangChain工作流编排原理与实战(LCEL), 学了本文基本上后续 LangChain实际开发都可以独立完成，本文内容较多，建议大家收藏，慢慢学习。

<!-- more -->

# LCEL介绍

LCEL(LangChain Expression Language) 是 LangChain提出来一种强大的工作流编排模式，可以通过基础组件去构建复杂任务链条式，包括但不限于：

- 流式处理
- 并行处理
- 日志记录
- ...等等

## LCEL的特性

- **一流的流式支持**： 通过 LCEL 构建链时， 可以获得链式最佳时间（从第一个任务到最后一个输出所经历的时间），如：你通过不同链路调用 LLM 大模型到输出 ≈ 直接调用 LLM 大模型输出
- **异步支持**：LCEL链路中任何一个任务都可以异步执行，如：你可以在一个任务中调用另一个任务，而无需等待该任务完成
- **优化的并行任务处理**：针对多个并行步骤时候，LCEL会自动优化并行任务，达到最小延迟
- **重试和回退**：LCEL 链路中的任何任务都可以重试，如果失败，可以回退到上一个任务
- **访问中间结果**：可以访问 LCEL 链中的任何任务的结果，可以给用户提供实时结果和方便开发调试
- **标准化的输入和输出模式**：每个 LCEL链都可以直接使用 `Pydantic`对象和 `JSON`对象作为输入和输出，从而更好验证链路的正确性，并且LangServer的重要组成部分

# LCEL原理


<!-- more -->

# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。