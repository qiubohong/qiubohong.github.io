
---
title: AI春晚之 2023年openAI 开发者大会
date: 2023-11-08 18:00:01
tags:
    - 技术分享
    - AI系列
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)


# 背景
2023-11-06，openAI公司在美国旧金山举办第一届开发者大会，大会内容总结如下：

- 回顾过去一年发展
- 推出新产品
  - GPT4 Turbo
  - GPTs， GPT Store（GPT商店）
  - GPT Builder GPT应用构建工具
  - Assistants API 助手API 



<!-- more -->
视频播放地址：

<iframe src="//player.bilibili.com/player.html?aid=278248328&bvid=BV1Vw411T7gA&cid=1325819721&p=1&page=1&high_quality=1&danmaku=0" allowfullscreen="allowfullscreen" width="100%" height="500" scrolling="no" frameborder="0" sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"> </iframe>

# 回顾过去一年历史

- 2022年11月30日，发布了GPT3.5
- 2023年3月，推出GPT4，目前性能最好的大语言模型
- 近几个月，推出语音与视觉功能
- 多利3号（DALL-E 3），世界最先进的图像模型
- 支持企业版，更安全和隐私，以及更高速度和更长上下文等能力

数据展示：
- **200万**开发者正在使用OpenAI的API（应用程序接口
- **92%**的500强公司正在使用OpenAI的产品搭建服务
- **1亿人**达到周活用户数

# GPT4 Turbo简介
![](/assets/img/ailearn/openai1.jpg)

## 要点如下：

![](/assets/img/ailearn/openai2.jpg)

- 更多的上下文长度：
  - 支持8K到128K token数目，堪比一本300页的标准书
- 更多和更加细粒度的控制：
  - 支持json输出，可以让开发使用起来更加方便
  - 支持重复输出，可以针对同一个种子因素进行重复输出，如：同一个问题，可以重复获取到相同的答案
  - 支持查看调用API的日志问题
- 更好的知识库：
  - 将知识更新到2023年4月
- 更多模型也可以通过API调用
  - DALL-E 3图像模型
  - 语音文本模型，wishper V3开源语言模型
- 定制化模型：
  - 参与到特定领域的开发，定制化模型
- 扩大速率限制：
  - 开发者可以申请进一步提高速率

## GPT4价格
  - 1000 input token 0.01美元
  - 1000 output token  0.03美元

# GPTs

> GPTs 支持用户将能通过自定义指令、拓展（模型）的知识边界和下达行动命令，来构建自己的GPT，并能对外发布给全球更多的人使用。更重要的是，整个构建“自定义GPT”的过程也是通过自然语言对话形成的。

用我们容易理解的话，就是我们可以定制化属于我们自己的个人智能助手，协助我们一切日常生活和工作。

## GPT Builder
提供一个界面，利用对话和一些更多简单操作，可以让你快速创建属于你自己的GPT个人助手。

- 通过自定义指令，一些初始化命令
- 拓展（模型）的知识边界，传入一些知识类文件，如：文本/语音/图片等
- 下达行动命令，通过一些action按钮，让助手输出一些我们想要的答案

不久后，将推出GPT Store，这些特定领域的GPT知识助手可以公开给任何人使用。

# Assistants API

Assistants API，“助理API”是一个专门构建的人工智能，具有特定的指令，利用额外的知识，并能调用模型和工具来执行任务。

- 开发者可以利用提供的助手API去处理不同的线程和消息
- 可以调用其他第三方API，并更根据返回的数据经过GPT，按照自己的意愿去做定制化处理优化
- 支持函数范式调用


以上就是OpenAI DEV开发者大会，全程直播45分钟，没有任何水货，全是干货，很多东西都需要自己去体验后才知道。




