---
title: 有了GPT-3，再也不用手写commit message(翻译)
date: 2023-02-14 12:51:01
tags:
    - 翻译文章
---

> 本文翻译的目的，主要想了解GPT3是什么，以及目前大家使用GPT3用来做什么，以及如何开发GPT3。

# GPT-3

GPT-3是一个很多人或公司正在使用的协助开发的工具，比如：编写脚本、命令行等操作。

> GPT-3指的是生成型预训练变换模型3（英语：Generative Pre-trained Transformer 3，简称GPT-3）是一个自回归语言模型，目的是为了使用深度学习生成人类可以理解的自然语言[1]。GPT-3是由在旧金山的人工智能公司OpenAI训练与开发，模型设计基于谷歌开发的变换语言模型。GPT-3的神经网路包含1750亿个参数，为有史以来参数最多的神经网路模型[2]。OpenAI于2020年5月发表GPT-3的论文，在次月为少量公司与开发人团释出应用程式介面的测试版。微软在2020年9月22日宣布取得了GPT-3的独家授权。 —— [维基百科 GPT-3](https://zh.wikipedia.org/zh/GPT-3)

使用`gitcommit`,你将不需要花费时间去写git commit。 下面就让学习如何安装 `gptcommit`，以及享受一下GPT-3帮你写git commit。

<!-- more -->

# 背景

首先，我们先了解一下 git commit， git commit提交信息，是程序员与程序员之间交流他们开发代码的重要信息，特别在code review中。
尤其当代码发生重大变化或者写的代码极为复杂，我们需要一一详细描述代码块功能，非常的耗时而且无聊。
平时开发代码后，由于一不小心容易写`fix: bug`之类的提交记录，很想修改后，但是又没有什么好的办法。
同时复杂的这些随意的话术对code review也很难理解这段代码的真正含义是什么。
更糟糕的是，如果提交记录是`fix: 修复文案错误`等，会让code review更加毫无意义，甚至忽略掉需要code review的地方。
所以问题是写 git commit很费时，而且描述不准确又容易造成不必要误会，那么使用`gptcommit`会让你摆脱这些烦恼。

# 安装教程(几分钟)

## 环境准备
在安装`gptcommit`之前，你需要先准备以下几个环境：

- [Cargo](https://rustup.rs/), `Rust`语言的包管理器
- [OpenAI API Keys](https://platform.openai.com/account/api-keys), OpenAI的密钥

**安装Rust**

Linux或Mac安装命令如下：
```shell
$ curl --proto '=https' --tlsv1.2 https://sh.rustup.rs -sSf | sh
```

**OpenAI API Keys获取方式**

国内没法正常访问，以下两种方式：
- 这里去淘宝买一个API key
- 或者翻墙出去购买一个

## 安装步骤

1. 使用`cargo`安装`gptcommit`
```shell
cargo install --locked gptcommit
```

2. 在本地某个仓库里安装执行一下命令，主要是初始化`gptcommit` git hook。这里需要你对这些仓库有git push的权限。
```shell
gptcommit install
```

3. 设置全局变量`OPENAI_API_KEY`
```shell
export OPENAI_API_KEY="sk-..."
```
也可以直接将变量设置到全局文件中，如`~/.bashrc`, `~/.zshrc`

## demo实战

如果使用了后，会生成如下git commit:

```
Demo #1: the full installation and commit workflow, editing multiple rust files
Demo #2: a one-line change to a string inside a rust file.
Demo #3: Modifying non-code files, in this case a README.
```

## 参考对象

`gptcommit`参考之前的很受欢迎的commit 工具：

- [https://github.com/RomanHotsiy/commitgpt](https://github.com/RomanHotsiy/commitgpt)

`commitgpt`目前已无法使用，因为它使用第三方的OpenAI API Key，由于官方OpenAI访问次数受限，必须要求每个用户都用自己的API key。

`gptcommit`集成了 git hook，可以直接用来git flow工作流的最后一步，同时，由于使用Rust，它执行速度会更快。

同时还参考[gpt-commit-summarizer](https://github.com/KanHarI/gpt-commit-summarizer)工具，它是直接作用在github Action持续集成中，而不是git 工作流。
总结commit记录是发生在PR阶段，而不是每次 commit。
该操作会直接将PR操作的commit进行汇总，然后直接提交，不需要再code review。

`gptcommit`参考`gpt-commit-summarizer`的设计点，但是主要针对是git commit的提交信息进行总结。

## 背后原理

git commit提交劫持主要分为两个部分：

首先，会将每个文件单独汇总，然后到OpenAI去生成commit 信息记录。

其次，汇总所有文件修改内容，也有两个要点，分别是：

- 告诉AI生成一个修改的标题
- 同时要生成修改的一些要点内容

最终输出的提交记录如下：

```
[title]

- [summary point 1]
- [summary point 2...]

[/changed/file A]
- [file summary point 1]
- [file summary point 2...]
[/changed/file B...]
- [file summary point 1...]
...

```

## 项目实战
接下来就在项目中实战吧。
执行命令`cargo install --locked gptcommit`安装或到[github 仓库](https://github.com/zurawiki/gptcommit)中去查看更多信息。
当然，你需要先在OpenAI里注册一个账号，同时拥有一个API key才能正在使用起来。

Github地址： [https://github.com/zurawiki/gptcommit](https://github.com/zurawiki/gptcommit)

# 下一步计划

后面也打算做一下更加有趣的功能：

- 如何利用GPT-3去实现更加自动化 git flow工作流？
- 如何跳过哪些大的总结?
- 如何收集用户反馈，将commit信息更加有效？

最后，如果在使用过程有任何问题或者建议，请到Github开源地址写一个issue给我，我会很快处理。

# 参考资料

- 原文地址：[Never write a commit message again (with the help of GPT-3)](https://zura.wiki/post/never-write-a-commit-message-again-with-the-help-of-gpt-3/)
