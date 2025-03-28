---
title: 09篇 AI从零开始 - LangChain企业级应用开发——低代码平台的智能体Agent
date: 2025-03-31 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

经过LangChain系列文章的学习， 实战一个有趣的小应用，通过Agent调用工具+大模型的推理能力开发一个 【低代码平台的 AI 小助手】，通过用户输入自然语言能实现 低代码平台页面生成。

<!-- more -->

如无意外，这篇应该是 LangChain最后一篇学习内容，将之前文章进行汇总，具体如下：
- [04篇 AI从零开始 - LangChain学习与实战(1) 基础知识](https://qborfy.com/ailearn/ai-learn04.html)
- [05篇 AI从零开始 - LangChain学习与实战(2) PromptTemplate降低AI幻觉](https://qborfy.com/ailearn/ai-learn05.html)
- [06篇 AI从零开始 - LangChain学习与实战(3) LCEL工作流编排原理与实战](https://qborfy.com/ailearn/ai-learn06.html)
- [07篇 AI从零开始 - LangChain学习与实战(4) LangServer部署](https://qborfy.com/ailearn/ai-learn07.html)
- [08篇 AI从零开始 - LangChain学习与实战(5) 基于RAG开发问答机器人](https://qborfy.com/ailearn/ai-learn08.html)

# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。