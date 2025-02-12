---
title: 00篇 AI从零开始 - 前准备知识
date: 2024-04-06 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)


# 为什么要学习AI知识
去年年中总结写过一篇文章 [《2023年中总结之如何在互联网裁员浪潮继续前(gou)进(zhu)》](https://qborfy.com/study/2023-middle.html)，AI发展是必不可缺的，如同马车和汽车的更新迭代一样，作为互联网的程序员，我们有点类似之前的马夫，现在有新的工具，我们也需要跟上时代的脚步，学习AI知识，可以让我们在互联网裁员浪潮中继续前进。

<!-- more -->

# 如何开始学 AI
AI 不是一个新的语言，而是完全一个新的行业出现，虽然目前并没有完整的产品或硬件去承载它，或者大家都还在探索阶段，但是它已经是一个非常热门的话题，所以，我们不需要担心自己学不会，只需要开始学习，然后不断实践，不断总结，不断进步，就一定可以掌握它。

当然学习一个新的行业，学习方法和方式是非常重要的，为了降低学习成本，我们应该系统性去学习，趁着大家都还在探索阶段，我们可以选择一些比较成熟的大模型，比如ChatGLM-6B，ChatGLM3，LangChain等，这些模型已经可以满足我们日常的聊天需求，而且这些模型都是开源的，我们可以直接使用，当然，我们也可以自己训练模型，但是训练模型需要大量的算力，而且训练模型需要一定的专业知识，所以，我们选择使用这些模型，可以让我们更快的入门AI，然后我们再根据自己的需求，去训练自己的模型。

接下来，如何系统的学习利用 AI技术去开发应用，我这里给出一个学习路线图，供大家参考。

## 学习路线：利用AI大模型进行开发应用

### 第一阶段：了解AI大模型基础
- **AI模型概览**：
  - 学习什么是AI大模型，它们的基本架构和工作原理，例如Transformer架构。
  - 理解不同类型的模型（如自然语言处理的GPT和BERT，图像处理的CNN模型等）。

- **基础工具和库**：
  - **Python编程**：深入理解Python，因为大多数AI工具和库都使用Python。
  - 学习使用AI模型的主要库和框架，如TensorFlow, PyTorch, Hugging Face Transformers等。

### 第二阶段：实际应用和开发技能
- **API使用**：
  - 学习如何使用如OpenAI API等商业AI模型API进行开发。
  - 理解API文档，学习如何集成和调用API来实现具体功能。

- **模型微调**：
  - 学习如何对预训练模型进行微调（Fine-tuning），使其更好地适应特定的应用场景。
  - 实践在特定数据集上训练和微调模型。

- **数据处理**：
  - 学习数据预处理和清洗技巧，以提高模型的效果和精确度。
  - 理解和实践如何构建和管理适用于AI模型的数据集。

### 第三阶段：高级应用和项目实践
- **项目开发**：
  - 开始一个小项目，如构建一个聊天机器人、自动化内容生成工具或客户服务自动化系统。
  - 实际应用API和微调技术，解决实际问题。

- **性能优化**：
  - 学习如何评估模型性能，包括准确性、响应时间等。
  - 理解如何优化模型和API调用，提高效率和成本效益。

- **安全性和伦理**：
  - 理解使用AI模型时的安全问题，包括数据隐私和模型安全。
  - 学习AI伦理，确保应用符合伦理标准和法律规定。

### 第四阶段：持续学习和社区参与
- **持续学习**：
  - 随着AI技术的快速发展，持续学习最新的模型和技术是必须的。
  - 关注AI领域的最新研究和趋势。

- **社区参与**：
  - 加入相关的在线论坛和社区，如GitHub, Stack Overflow, Reddit等。
  - 参与讨论，贡献代码，或者分享你的项目和经验。

最后， 我们对 AI 一些基础知识进行了解，比如大模型、Transformer、预训练模型、微调、数据预处理等，然后我们就可以开始使用这些模型进行开发应用了，比如使用OpenAI API进行开发，或者自己训练模型，然后使用这些模型进行开发应用，比如构建一个聊天机器人、自动化内容生成工具或客户服务自动化系统等。

# AI 基础知识

## 主流大模型

目前，AI领域的大模型主要集中在自然语言处理（NLP）和计算机视觉（CV）等领域。以下是一些主流的大模型：

- [ChatGPT](https://openai.com/): OpenAI开发，目前是世界上最先进的大模型之一，国内无法访问。
- [Gemini](https://gemini.google.com/): Google最强对话大模型，国内无法访问。
- [Llama 3开源大模型](https://github.com/meta-llama/llama3): Meta公司开发，目前迄今最强大的免费开源大模型。
- [GLM-4 国内大模型](https://github.com/THUDM/GLM-4): 是智谱 AI 推出的最新一代预训练模型 GLM-4 系列中的开源版本
- [文心大模型](https://wenxin.baidu.com/): 百度全新一代知识增强大语言模型，未开源
- [混元大模型](https://hunyuan.tencent.com/): 腾讯混元大模型，未开源
- [豆包大模型](https://www.doubao.com/chat/): 字节自研大模型，未开源
- [DeepSeak](https://github.com/deepseek-ai): 国内开源大模型，其推理能力非常强大，堪比GPT-4

## 主流开发框架

- [Hugging Face Transformers](https://huggingface.co/transformers/): 一个用于自然语言处理（NLP）和计算机视觉（CV）的库，支持多种大模型。
- [PyTorch](https://pytorch.org/): 一个用于深度学习的开源框架，支持多种大模型。
- [TensorFlow](https://www.tensorflow.org/?hl=zh-cn): 一个用于深度学习的开源框架，支持多种大模型。
- [JAX](https://github.com/google/jax): 一个用于深度学习的开源框架，支持多种大模型。
- [PaddlePaddle](https://www.paddlepaddle.org.cn/): 一个用于深度学习的开源框架，支持多种大模型。
- [LangChain](https://github.com/huggingface/langchain): 一个用于构建聊天机器人的开源框架，支持多种大模型。

对外提供 API 平台的文档地址：

- [OpenAI API](https://openai.com/api/): 一个用于访问OpenAI大模型的API，支持多种大模型。
- [Google AI Platform](https://cloud.google.com/ai-platform): 一个用于访问Google大模型的API，支持多种大模型。
- [Microsoft Azure AI](https://azure.microsoft.com/zh-cn/products/ai-services/): 一个用于访问Microsoft大模型的API，支持多种大模型。
- [文心 API](https://cloud.baidu.com/doc/WENXINWORKSHOP/s/7ltgucw50): 百度文心一言大模型API文档
- [混元 API](https://cloud.tencent.com/document/product/1729): 腾讯混元大模型API文档


至此，我们对AI有了初步了解后，就可以开始使用这些模型进行开发应用了，比如使用OpenAI API进行开发，或者自己训练模型，然后使用这些模型进行开发应用，比如构建一个聊天机器人、自动化内容生成工具或客户服务自动化系统等。

期待大家一起学习AI，一起进步！