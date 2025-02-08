---
title: 02篇 AI系统学习 - 部署本地大模型 DeepSeek-R1
date: 2025-02-11 15:00:00
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

之前两篇文章对于 AI 有了初步的了解，但是如何应用 AI 技术呢？去调用 openai 的接口，或者国内的接口都需要付费，而且接口调用次数有限，所以我们需要部署一个本地的大模型，这样就可以自己使用，而且可以自己控制调用次数。正好最近 DeepSeek比较火热，所以我们就在本地尝试部署一下 DeepSeek-R1大模型吧。

# 1. 了解DeepSeek-R1

在开始之前，我们需要先了解一下 [DeepSeek](https://www.deepseek.com/), 官网介绍是这么写的：

> 探索未至之境，DeepSeek-V3 在推理速度上相较历史模型有了大幅提升。
> 在目前大模型主流榜单中，DeepSeek-V3 在开源模型中位列榜首，与世界上最先进的闭源模型不分伯仲。

同时它开源了几个大模型，主要如下：

- [DeepSeek-R1](https://github.com/deepseek-ai/DeepSeek-R1)，总参数671B，上下文长度最大支持128K，是在性能对齐 OpenAI-o1 正式版。
- [DeepSeek-V3](https://github.com/deepseek-ai/DeepSeek-V3)，DeepSeek 上一代开源大模型。

因此，作为最新的大模型，DeepSeek-R1 是我们部署的首选。接下来我们继续了解 DeepSeek-R1。

<!-- more -->

> 2025.01.20 DeepSeek-R1 发布，DeepSeek R1 是 DeepSeek AI 开发的第一代推理模型，擅长复杂的推理任务，官方对标OpenAI o1正式版。适用于多种复杂任务，如数学推理、代码生成和逻辑推理等。
> 根据官方信息DeepSeek R1 可以看到提供多个版本，包括完整版（671B 参数）和蒸馏版（1.5B 到 70B 参数）。完整版性能强大，但需要极高的硬件配置；蒸馏版则更适合普通用户，硬件要求较低

** 蒸馏版：”老师教学生“ 让一个庞大的、复杂的模型（老师）教会一个小巧的模型（学生）如何像自己一样聪明地完成任务。 **

因此，我们选择部署 DeepSeek-R1 蒸馏版（由于硬件有限，下面部署会使用  32B 的模型），因为这个版本比较适合我们普通用户，而且部署起来比较简单。

# 2. 准备工作

## 2.1  硬件准备
下面是个人硬件配置，大家可以用来参考即可：

- 内存：32GB
- GPU：Tesla T4 16GB
- CPU：32核
- 操作系统： tLinux 3.1 
- 硬盘：1TB SSD

网上有很多硬件和模型对比资料， 这里我就不详细介绍了，大家可以自行搜索。不过最低要求是：

- Windows: NVIDIA GTX 1650 4GB 或 AMD RX 5500 4GB，16GB 内存，50GB 存储空间
- Linux: NVIDIA GTX 1660 6GB 或 AMD RX 5500 4GB，16GB 内存，50GB 存储空间
- Mac: M2 MacBook Air（8GB 内存）

## 2.2  软件下载+模型下载

### 2.2.1 Ollama安装

主要依赖`Ollama`本地部署,这里再简单介绍一下  Ollama， 官网介绍如下：

> Ollama 是一个开源的本地大语言模型运行框架，专为在本地机器上便捷部署和运行大型语言模型（LLM）而设计。 官网地址为：https://ollama.com/
> Ollama 是一个基于 Go 语言开发的简单易用的本地大语言模型运行框架。可以将其类比为 docker（同基于 cobra (opens new window)包实现命令行交互中的 list,pull,push,run 等命令），事实上它也的确制定了类 docker 的一种模型应用标准。

后面写一篇文章详细介绍一下其使用方法，目前我们先保持现状即可。

Linux安装 Ollama命令很简单： 

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

等待安装完成即可，执行下面命令查看是否安装成功：

```bash
ollama -h
```

### 2.2.2 模型下载

可以在 Ollama 官网下载模型，也可以通过 Ollama 命令下载模型，这里我们使用命令下载：

```bash
# 下载模型
ollama pull deepseek-r1:32b
```
这里需要等待一段下载，看网速，一般至少需要几个小时。
![alt text](/assets/img/ailearn/ai-learn02-1.png)


## 2.3 docker安装

Docker是一个开源的应用容器引擎，可以方便的将应用打包成容器，然后部署到不同的机器上，实现应用的跨平台部署。

后面大模型 Web UI应用部署会使用到 Docker，因此这里也简单介绍一下 Docker 的安装。

具体安装步骤可以参考官方教程：https://docs.docker.com/get-started/get-docker/

国内安装可以参考：https://www.runoob.com/docker/ubuntu-docker-install.html


# 3. 部署模型
其实在上一个步骤已经完成模型下载，想要让其运行，则需要进行以下操作：

```bash
# 启动  ollama api服务
ollama serve --
# 
ollama run deepseek-r1:32b

```
## 3.1 测试模型服务

```bash
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1:32b",
  "prompt":"Why is the sky blue?"
}'

# 模型会返回相关结果
```

## 3.2 设置允许其他机器访问
经过上面的设置，ollama服务已经启动，但是其他机器无法访问，因此需要设置允许其他机器访问，命令如下：

```bash
# 设置允许其他机器访问
vim /etc/systemd/system/ollama.service
# 写入如下内容
[Service]
Environment="OLLAMA_HOST=0.0.0.0:11434"
# 重启 ollama api服务
systemctl restart ollama
# 或者如下命令， 关闭或启动 ollama api服务
systemctl stop ollama
systemctl start ollama
```

# 4. 可视化UI
有了大模型服务，但是只能在命令窗口里输入聊天感觉不行，那么如何可视化呢？这里推荐一个工具：Dify，官方地址：https://github.com/langgenius/dify。

## 4.1  部署 Dify

```bash
# 安装
git clone https://github.com/langgenius/dify.git
cd dify
cd docker
cp .env.example .env
docker-compose up -d
```

启动成功后就可以访问了：http://localhost/install 进行配置管理员账号。

## 4.2 设置模型供应商

在右上角找我的头像，点击设置，选择模型供应商，选择 `Ollama`，添加模型命名为`DeepSeek-32B`，具体如下：

![alt text](/assets/img/ailearn/ai-learn02-2.png)

配置完后，就可以开始创建应用，并将模型应用到应用中。

## 4.3  创建应用

在首页创建空白应用 ->  选择聊天助手 -> 进入应用后在右上角选择 `DeepSeek-32B`模型，就可以开始聊天。

![alt text](/assets/img/ailearn/ai-learn02-3.png)
![alt text](/assets/img/ailearn/ai-learn02-4.png)

聊天界面如下：

![alt text](/assets/img/ailearn/ai-learn02-5.png)

具体聊天效果，响应速度还可以可以的。

![alt text](/assets/img/ailearn/ai-learn02-6.png)

Dify.AI 还支持很多功能，比如：录入知识库，让聊天助手能基于知识库回答用户的问题，这样子就可以变成智能客服了。其他功能大家都可以自己去摸索，后面 AI 系列学习也会继续介绍。

# 参考资料

- [DeepSeek-R1官方文档](https://github.com/deepseek-ai/DeepSeek-R1)
- [必看：DeepSeek-R1本地部署！超详细教程~](https://www.cnblogs.com/shanren/p/18702244)
- [手把手带你用DeepSeek-R1和Ollama搭建本地应用，一文搞定！](https://www.cnblogs.com/shanren/p/18702244)
- [DeepSeek-R1本地部署简单使用](https://www.cnblogs.com/shook/p/18700561)
- [从教师到学生：神奇的“知识蒸馏”之旅——原理详解篇](https://juejin.cn/post/7278244851041189949)
- [带你认识本地大语言模型框架Ollama(可直接上手)](https://wiki.eryajf.net/pages/97047e/)
- [Ollama官方文档](https://github.com/ollama/ollama/blob/main/docs)