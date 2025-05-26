---
title: 10篇 AI从零开始 - LangChain学习与实战(5) 低代码平台AI助手 开发
date: 2025-03-31 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

回顾一下LangChain系列学习文章：
- [04篇 AI从零开始 - LangChain学习与实战(1) 基础知识](https://qborfy.com/ailearn/ai-learn04.html)
- [05篇 AI从零开始 - LangChain学习与实战(2) PromptTemplate降低AI幻觉](https://qborfy.com/ailearn/ai-learn05.html)
- [06篇 AI从零开始 - LangChain学习与实战(3) LCEL工作流编排原理与实战](https://qborfy.com/ailearn/ai-learn06.html)
- [07篇 AI从零开始 - LangChain学习与实战(4) LangServer部署](https://qborfy.com/ailearn/ai-learn07.html)
- [08篇 AI从零开始 - LangChain学习与实战(5) 基于RAG开发问答机器人](https://qborfy.com/ailearn/ai-learn08.html)

经过LangChain系列文章的学习后， 现在我们需要通过 LangChain + 大模型 + 低代码平台， 开发具备实际功能的 AI 应用：

> **低代码平台AI助手**：通过用户输入自然语言能实现 低代码平台页面生成、编辑等

<!-- more -->

# 1. 前期与实现方案

目标：通过用户输入自然语言能实现，完成低代码平台页面的生成，同时能低代码平台页面组件元素进行属性调整。

实际原理： 利用 AI大模型实现用户输入的自然语言与低代码平台特定 DSL语言（JSON Schema）互相转换

## 1.1 前期准备

1. 搭建低代码平台服务，可以参考文档： [Formily 表单设计器](https://formilyjs.org/zh-CN/guide/form-builder)
2. Langchain 和 LangServer环境准备， 参考： [04篇 AI从零开始 - LangChain学习与实战(1) 基础知识](https://qborfy.com/ailearn/ai-learn04.html)

## 实现思路

1. LangChain开发实现大模型理解低代码平台DSL语言的输入，并能输出是低代码平台DSL语言
2. 通过 LangServer提供大模型 API
   1. 输入当前页面 json schema
   2. 用户输入自然语言，LangServer调用大模型API，返回结果
   3. LangServer将返回结果转换成低代码平台DSL语言
3. 低代码平台新增 AI助手 UI，更改低代码页面JSON内容 

# 2. 实战开发

## 2.1 LangChain Agent + Server开发


## 2.2 Formily 插件 AI 助手前端开发

# 总结


# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)
- [Langchain Agent - Agent类型说明](https://zhuanlan.zhihu.com/p/694458202)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。


对 Agent的一些思考， 首先 agent本身的  Prompt很重要， LLM 大模型会依据Prompt+用户输入去判断需要使用哪个工具

然后创建Agent, Langchain也提供不同的类型，如下：

- Tool Calling Agent (create_tool_calling_agent)​ ： 依赖模型原生工具调用能力，自动将工具描述注入模型上下文， 直接返回工具调用参数对象，部分LLM模型支持
- ReAct Agent (create_react_agent)​ ： 遵循 Thought → Action → Observation 循环，每步根据上下文选择工具，结合自然语言与工具调用
- ​​Structured Chat Agent (create_structured_chat_agent)​：必须遵循预定义响应模板，严格匹配工具参数格式，通常一次性完成工具选择

利用 Agent 开发一个完整的低代码平台 AI 助手，整体实现过程如下：

https://langchain-ai.github.io/langgraph/agents/agents/#1-install-dependencies