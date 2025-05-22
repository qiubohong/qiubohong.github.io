---
title: 07篇 AI从零开始 - LangChain学习与实战(4) LangServer部署
date: 2025-03-12 15:00:00
toc: true
tags:
    - 学习总结
    - AI学习
---

> 做一个有温度和有干货的技术分享作者 —— [Qborfy](https://qborfy.com)

从 LangChain系列文章开始到现在，我们学习 LangChain的基础知识和实战撸代码，现在我们假设已经开发好一个 LangChain链式任务，那么如何部署以及如何与 web服务进行互相调用呢？

那么接下来我们应该就学习LangServer与LangSmith，如何让 LangChain进行企业级开发。

> LangServer: 帮开发者将  LangChain 部署一个 Restful 服务。
>
> LangSmith: 监控 LangChain调用链路服务和提供更加友好的可视化界面。


<!-- more -->

# 认识 LangServer

LangServer是集成了FastApi + Pydantic的Restful框架。它提供了一些特性：

- 每次 API调用都会返回丰富的错误信息
- 自带 JSON Schema和   Swagger API文档
- 高效的`/invoke`、 `batch`和 `/stream`接口服务，支持单个服务器多个并发请求
- 支持调用`/stream_log`接口，实现链式任务中间态步骤返回
- `/stream_events`更加清晰任务事件状态信息
- 提供LangServer SDK，调用 Restful 和 直接调用大模型一样简单

# 实战教程

## 环境准备

安装`langchain-cli`全局命令，方便快速启动 Lang Server项目

```shell
pip install -U langchain-cli 
```

安装`poetry`管理项目的依赖，更好管理服务依赖 pip包。

> `poetry` Python packaging and dependency management made easy， 翻译过来就是更加轻松管理 python项目和依赖

```shell
# 安装 pipx
pip install pipx
# pipx添加到环境变量
pipx ensurepath
# 安装 poetry
pipx install poetry
```

## 初始化和运行项目

1. 项目初始化
利用langchain-cli 脚手架， 初始化一个 langserver项目

```shell
# 初始化一个langserver的项目
langchain app new mylangserver

pipx run langchain app new mylangserver

# 进入项目目录
cd mylangserver

# 安装项目依赖
poetry install

# 安装后续依赖的包
poetry add langchain
poetry add langchain_ollama
```
2. 项目结构说明
生成的目录结构与说明如下：

```
mylangserver # 项目名
├─.gitignore
├─Dockerfile 
├─README.md
├─pyproject.toml # 项目结构说明文件
├─poetry.lock # poetry依赖锁文件 类似前端的yarn.lock
├─packages
|    └README.md
├─app
|  ├─__init__.py
|  ├─server.py  # 服务主入口 后续开发都在这里
```

3. 运行项目

在根目录下运行如下命令：
```
langchain server
```

就可以直接访问 `http://localhost:8080`，效果具体如下图：

![](/assets/img/ailearn/ai-learn07-1.png)



## 接口开发

1. `server.py`文件
在接口开发之前我们先看看 `server.py`文件，具体如下：

```python
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from langserve import add_routes

app = FastAPI()

# 这里是定义路由和对应路由实现的方法
@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")


# 这里我们可以添加路由
# add_routes(app, NotImplemented)

if __name__ == "__main__":
    import uvicorn
    # 这里通过 uvicorn启动服务，端口为8000
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

2. 添加一个调用`DeepSeek-R1`模型的接口

通过 `add_routes`新增一个模型对象，会自动封装成对应的 Restful接口，具体如下：

```python
from fastapi import FastAPI
from fastapi.responses import RedirectResponse
from langserve import add_routes
from langchain_ollama.llms import OllamaLLM

deepseek = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-r1:32b")

app = FastAPI(
    title="Qborfy个人 LangServer",
    version="0.1.0",
    description="Qborfy个人 LangServer，学习测试使用",
)


@app.get("/")
async def redirect_root_to_docs():
    return RedirectResponse("/docs")

# 添加 deepseek路由
add_routes(app, deepseek, path="/deepseek")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)

```

接下来我们访问 `http://localhost:8000/`，就会出现和`/deepseek`相关的文档，具体如下图：

![](/assets/img/ailearn/ai-learn07-2.png)

## 接口测试

接口测试我们可以通过[ApiFox](https://apifox.com/) (一个和 Postman类似  API 测试工具)进行测试，具体如下.

1. `/invoke` 发起一个对话请求, 具体如下图：

![](/assets/img/ailearn/ai-learn07-3.png)


2. `/stream` 流式调用，具体如下图：

![](/assets/img/ailearn/ai-learn07-4.png)


## SDK调用

在LangChain中是可以通过 LangServe提供的 `RemoteRunable` 进行远程调用，和原来的调用大模型的使用方式其实是一样的， 具体代码如下：

```python
# 实现langchain调用远端调用 LangServer
from langchain.schema.runnable import RunnableMap
from langchain_core.prompts import PromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langserve import RemoteRunnable

llm = RemoteRunnable("http://127.0.0.1:8000/deepseek")

template = "你是世界级的 AI 技术专家, {input}"
# 这里我们使用一个简单的模板
prompt = PromptTemplate(
    input_variables=["input"],
    template=template
)
# 创建一个简单的链式调用
chain = prompt | llm | StrOutputParser()

# 执行链式调用
for chunk in llm.stream("海洋是什么颜色"):
    print(chunk, end="|", flush=True)

```

这样子我们不仅可以在本地调用大模型，还能调用其他人提供 LangChain服务，从而实现更加复杂的功能。

## 生产部署

LangServer生产部署，按照 LangChain官方推荐是通过`Dockerfile`打包进行部署，其中也比较简单，具体执行如下命令：

```shell
# 打包镜像
docker build . -t my-langserve-app

# 运行镜像
docker run -p 8080:8080 my-langserve-app
```

或者是通过 docker-compose启动 docker服务，具体如下：

```yaml
version: '3'
services:
  langserver:
    image: my-langserve-app
    ports:
      - 8080:8080
```

最终执行`docker-compose up -d`启动服务后，就可以通过`http://localhost:8080/docs`访问到服务了。

# 监控与日志

## LangSmith监控

LangSmith是 LangChain官方提供的监控工具，可以监控模型运行情况，一个 SASS服务需要我们将服务相关信息注册到 LangSmith网站上，因此可以按个人或公司需要判断是否允许使用。

> LangSmith是一个用于构建生产级应用的平台。它允许您密切监控和评估您的应用，以便您可以快速而自信地发布应用。
> 
> 传统软件应用程序是通过编写代码来构建的，而 AI 应用程序则需要编写提示来指导应用程序执行哪些操作。
> 
> LangSmith 提供了一套旨在实现和促进提示工程的工具，以帮助您找到适合您的应用程序的完美提示。

**PS：LangSmith这里提示未来编程开发者的思维转变，我们实现功能的思路不再是针对一些实现逻辑，而是面向不同的 AI 模型，优化提示语实现我们想要的功能。**

在 LangServer 中使用 LangSmith，需要先注册一个账号，然后获取 api key 添加到 LangServer中，具体使用代码如下： 

```python
import os

# 设置LangSimth 环境变量
os.environ["LANGSMITH_TRACING"] = "true"
os.environ["LANGSMITH_ENDPOINT"] = "https://api.smith.langchain.com"
os.environ["LANGSMITH_API_KEY"] = "<LANG_SIMTH_KEY>"
os.environ["LANGSMITH_PROJECT"] = "mylangserver"

```
具体使用教程可以参考[LangSmith官方文档](https://docs.smith.langchain.com/)

LangSmith主要作用是监控 链路任务节点调用和扭转情况，可以更加清晰的分析链的运行情况和日志，具体效果如下图所示：

![](/assets/img/ailearn/ai-learn07-5.png)


## Verbose关键日志
如果我们不想把自己的服务相关的日志信息暴露给 LangSmith， 我们还可以通过设置`set_verbose`设置详细日志开关， 从而实现我们调用 LangChain链路的完整日志，具体如下：

```python
from langchain.globals import set_verbose
# 全局 verbose配置开关
set_verbose(True)

# 针对部分链接调用设置详细日志开关

llm = OllamaLLM(base_url="http://127.0.0.1:11434", model="deepseek-r1:32b", verbose=True)
```

打开开关后，我们再调用`helloworld.py`大模型，可以看到关键的日志信息，但是verbose只会输出关键日志，下面我们还可以 `debug`查看更加详细的日志信息。

## Debug日志

我们可以通过`debug`设置日志级别，从而查看更加详细的日志信息，具体如下：

```python
from langchain.globals import set_debug
# 全局 debug配置开关
set_debug(True)
```

打开开关后，我们再调用`helloworld.py`大模型，可以看到更加详细的日志信息，具体如下图：

![](/assets/img/ailearn/ai-learn07-7.png)

# 总结

本文我们主要学习了LangServer的去部署一个 LangChain链，通过 LangServe对于第三方就能加友好的访问我们的提供 LangChain服务，从而实现更加复杂的功能。回顾一下，我们主要学习了以下内容：

- LangServer 安装与运行：通过 LangChain-Cli脚手架创建项目和`langchain serve`运行项目
- LangServer 接口开发：`add_routes`添加接口，可以直接把一个 LangChain添加到 LangServer中且自动生成 Swagger文档  
- LangServer监控与日志：LangSmith是LangChain官方提供的监控工具，但是会上报我们服务相关的日志信息，因此我们可以设置`set_verbose`或者`set_debug`设置详细日志开关， 从而实现我们调用 LangChain链路的完整日志


# 参考资料

- [LangChain官方文档](https://python.langchain.com/docs/introduction/)
- [LangChain中文教程](https://github.com/liaokongVFX/LangChain-Chinese-Getting-Started-Guide)
- [LangChain（0.0.340）官方文档十一：Agents之Agent Types](https://blog.csdn.net/qq_56591814/article/details/135040694)
- [(哔哩哔哩视频)2025吃透LangChain大模型全套教程（LLM+RAG+OpenAI+Agent）通俗易懂，学完即就业!](https://www.bilibili.com/video/BV1BgfBYoEpQ/?spm_id_from=333.337.search-card.all.click&vd_source=b7fdd8e45e19e1ed72549bc7a40058f6)

> 声明：本文部分材料是基于[DeepSeek-R1模型](https://chat.deepseek.com/)生成。