---
title: 09篇 AI从零开始 - LangChain学习与实战(6) Agent开发
date: 2025-03-31 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

前面

# Agent智能体

> 

Agent的一些思考， 首先 Agent本身的  Prompt很重要， LLM 大模型会依据Prompt+用户输入去判断需要使用哪个工具

然后创建Agent, Langchain也提供不同的类型，如下：

- Tool Calling Agent (create_tool_calling_agent)​ ： 依赖模型原生工具调用能力，自动将工具描述注入模型上下文， 直接返回工具调用参数对象，部分LLM模型支持
- ReAct Agent (create_react_agent)​ ： 遵循 Thought → Action → Observation 循环，每步根据上下文选择工具，结合自然语言与工具调用
- ​​Structured Chat Agent (create_structured_chat_agent)​：必须遵循预定义响应模板，严格匹配工具参数格式，通常一次性完成工具选择




# 总结


# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)
- [Langchain Agent - Agent类型说明](https://zhuanlan.zhihu.com/p/694458202)
- [Tushare](https://tushare.pro/)
> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。



https://langchain-ai.github.io/langgraph/agents/agents/#1-install-dependencies