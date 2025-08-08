---
title: 11篇 AI从零开始 - 工业级的RAG开发与部署(1)
date: 2025-03-31 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)


经过LangGraph+LangChain系列文章的学习后， 对LangGraph有了全面，那么接下来就应该学习通过LangGraph开发工业级RAG和部署。

> 工业级服务需要达到以下几个要求：
> - 可靠性：强调高可用性和容错性，以确保业务的连续性
> - 安全性：对安全性要求极高，需要提供强大的安全保障措施，如数据加密、访问控制、安全审计等。
> - 可扩展性：需要能够根据业务发展灵活扩展，支持不断增长的用户和数据量

接下来我们一起学习如何攻克工业级RAG落地的完整方案与实现。

<!-- more -->

# 0. 功能目标设定

目标：基于内部研发平台的已有各类知识文档，开发一个智能问答客服系统

功能设计


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


