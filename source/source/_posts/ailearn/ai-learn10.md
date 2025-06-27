---
title: 10篇 AI从零开始 - Langgraph开发(1) 
date: 2025-06-17 15:00:00
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




利用 Agent 开发一个完整的低代码平台 AI 助手，整体实现过程如下：

https://langchain-ai.github.io/langgraph/agents/agents/#1-install-dependencies


# 总结


# 参考资料

- [LangGraph官方文档](https://langchain-ai.github.io/langgraph/)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?p=10&share_source=copy_web&vd_source=ddb29dacf001bda27b38794cc29b82c8)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。



