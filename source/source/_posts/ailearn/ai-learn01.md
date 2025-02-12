---
title: 01篇 AI从零开始 - 基础知识和环境准备
date: 2025-02-06 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)


# AI 基础知识

不管学习什么技术，每个技术里面都会包含一些专业术语， 了解这些术语，有助于我们更好的理解技术，以及更好的使用技术。

<!-- more -->

针对 AI 领域，我们先从网上找到一篇AI技术应用文章《[使用RAG-GPT和Ollama搭建智能客服](https://cloud.tencent.com/developer/article/2420057)》，摘取部分精要内容，如下：

> 智能文档的在线检索流程可以用一张图说明，上图中展示了一个完整的问答流程：
> - 用户发起query
> - 结合Bot实际应用场景，评估是否对query进行rewrite
> - Retieval模块根据query检索出Indexing中的相关的文档
> - 将召回的文档进行Reranking
> - 并且根据relevance score进行过滤，过滤掉低质的文档
> - 形成合适的Prompt后输入到LLM大模型中，最后生成答案

## 术语解释

- LLM大模型：指模型参数量特别大，比如 GPT-4 模型参数量达到了 1750 亿，而 GPT-3 模型参数量只有 175 亿。
- GPT：Generative Pre-trained Transformer，生成式预训练Transformer，是 OpenAI 开发的一种语言模型，可以用于文本生成、文本摘要、文本翻译、文本分类、问答系统等任务。
- Transformer：一种基于注意力机制的神经网络结构，可以用于自然语言处理、语音识别、图像识别等任务。
- RAG：Retrieval-Augmented Generation，检索增强生成，是一种基于检索和生成相结合的文本生成方法，可以用于文本摘要、问答系统等任务。
- 知识库：指一个存储大量知识的数据集，可以用于问答系统、文本生成等任务。
- 召回：指从大规模数据中找到与查询相关的信息的过程，可以用于问答系统、文本生成等任务。
- Prompt：指一个文本或一个问题的描述，可以用于文本生成、问答系统等任务。
- 重写：指对用户输入的query进行一定的修改，以更好地匹配模型，可以用于问答系统、文本生成等任务。
- 模型训练：指使用大量数据对模型进行训练，以使其能够更好地完成任务的过程，可以用于机器学习、深度学习等任务。
- Agent：智能体，是一种通用问题解决器。从软件工程的角度看来，智能体是一种基于大语言模型的，具备规划思考能力、记忆能力、使用工具函数的能力，能自主完成给定任务的计算机程序。
- Function Calling：是一种实现大型语言模型连接外部工具的机制。通过 API 调用 LLM 时，调用方可以描述函数，包括函数的功能描述、请求参数说明、响应参数说明，让 LLM 根据用户的输入，合适地选择调用哪个函数，同时理解用户的自然语言，并转换为调用函数的请求参数（通过 JSON 格式返回）。调用方使用 LLM 返回的函数名称和参数，调用函数并得到响应。最后，如果需求，把函数的响应传给 LLM，让 LLM 组织成自然语言回复用户。

## 技术框架

- Huging Face: 在模型，数据集和应用程序的机器学习社区，提供了一个非常流行的开源库，名为“Transformers”。这个库最初是以提供各种基于 Transformer 架构的预训练模型（如 BERT、GPT-2、RoBERTa 等）为目的而创建的。随着时间的推移，它已经发展成为一个全面的机器学习库，支持多种语言模型和任务。官网站点为：https://huggingface.com/
- LangChain: 是一个基于大型语言模型（LLM）开发应用程序的框架，简化了LLM应用程序生命周期的每个阶段。 官网站点为：https://python.langchain.com/docs/introduction/
- Ollama: Ollama 是一个开源的本地大语言模型运行框架，专为在本地机器上便捷部署和运行大型语言模型（LLM）而设计。 官网站点为：https://ollama.com/

# 环境准备

## 1. 安装 Python

> Python 是一种高级编程语言，它具有简单易学、易于扩展、丰富的库和工具包等优点，被广泛应用于数据科学、机器学习、Web开发、自动化测试等领域。

### 1.1 普通安装

Python 的安装非常简单，只需要在官方网站下载安装包，然后按照提示进行安装即可。以下是安装 Python 的步骤：

1. 打开 Python 官方网站：https://www.python.org/downloads/
2. 点击 "Downloads" 按钮，进入下载页面
3. 选择适合自己操作系统的 Python 版本，然后点击 "Download" 按钮
4. 下载完成后，双击安装包，按照提示进行安装
5. 安装完成后，打开命令行终端，输入 `python --version` 命令，如果输出了 Python 的版本号，说明 Python 已经安装成功

### 1.2 通过 Anaconda 安装

Anaconda 是一个开源的 Python 发行版，它包含了 Python 和许多常用的科学计算库，可以方便地安装和管理 Python 环境。

一般国内选择清华源（https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/），国外选择官方源（https://）。

Mac或 Linux安装命令如下：

```bash
# 安装 Anaconda
wget https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/Anaconda3-2021.11-Linux-x86_64.sh
bash Anaconda3-2021.11-Linux-x86_64.sh
# 激活 Anaconda
source ~/.bashrc
# 查看 Anaconda 版本
conda --version
```

Windows安装则参考这个教程： https://www.cnblogs.com/ajianbeyourself/p/17654155.html


正常开发我建议是使用 Anaconda，因为 Anaconda 会自动管理 Python 环境，方便切换和安装不同的 Python 版本。


## 2. 安装 PyTorch

PyTorch 是一个基于 Python 的深度学习框架，它提供了丰富的工具和库，可以方便地实现深度学习模型和算法。目前如果需要本地部署大模型的话，建议还是在本地环境安装 PyTorch。

可以通过pip安装，也可以通过conda安装，这里推荐使用conda安装，因为conda安装会自动管理依赖，方便切换和安装不同的 PyTorch 版本。

安装命令如下：
```bash
# 安装 PyTorch
conda install pytorch torchvision torchaudio cudatoolkit=11.3 -c pytorch
# 查看 PyTorch 版本
python -c "import torch; print(torch.__version__)"
```


关于 PyTorch的教学文档，可以参考这个文档：https://datawhalechina.github.io/thorough-pytorch/

## 3. 安装 Hugging Face Transformers

Hugging Face Transformers 是由Hugging Face 创建的深度学习开源框架。 它提供API 和工具来下载最先进的预训练模型，并进一步调整它们以最大限度地提高性能。 这些模型支持不同模式下的常见任务，例如自然语言处理、计算机视觉、音频和多模式应用程序。

安装命令如下：
```bash
# 安装 Hugging Face Transformers
pip install transformers
# 查看 Hugging Face Transformers 版本
python -c "import transformers; print(transformers.__version__)"
```

## 4. 安装 Langchain

LangChain 是一种软件框架，旨在帮助创建利用大型语言模型 (LLM) 的应用程序。 LangChain 的优势在于其广泛的集成和功能。 它包括 API 包装器、Web 抓取子系统、代码分析工具、文档摘要工具等。 它还支持 OpenAI、Anthropic、HuggingFace 等现成的大型语言模型以及各种数据源和类型。

安装命令如下：
```bash
# 安装 LangChain
pip install langchain
# 查看 LangChain 版本
python -c "import langchain; print(langchain.__version__)"
```

# 参考资料

- [什么是 Hugging Face Transformers](https://learn.microsoft.com/zh-cn/azure/databricks/machine-learning/train-model/huggingface/)
- [一文带你了解大模型——智能体（Agent）](https://cloud.tencent.com/developer/article/2422923)
- [用于 LLM 开发的 Azure Databricks 上的 LangChain](https://learn.microsoft.com/zh-cn/azure/databricks/large-language-models/langchain)
- [LangChain 的中文入门教程](https://liaokong.gitbook.io/llm-kai-fa-jiao-cheng)
- [LangChain 🦜️🔗 中文网](https://www.langchain.asia/get_started/introduction)