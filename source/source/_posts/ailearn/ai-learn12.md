---
title: 12篇 AI从零开始 - 工业级的RAG开发与部署(1)
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

# 1. 前期准备

## 1.1 环境准备

### 1.1.1 开发环境

- conda，主要用于管理不同版本的python
- langgraph-cli，初始化项目的脚手架
- nodejs+react,开发智能客服系统前端环境

### 1.1.2 依赖资源环境

- 向量数据库 chroma,用于保存知识库存储
- Mysql数据库 通用知识库
- docker+docker-compose, 部署服务依赖

## 1.2 模型选择

RAG运行过程为: 知识库生成 -> 检索 -> 响应

- 知识库：私有的数据，主要依赖于`embedding模型`生成存储到向量数据库中
- 检索：根据用户问题检索知识库，根据检索算法（如：Query、ReRanker、Rewrite等）得到问题答案
- LLM模型：根据用户问题+检索知识库返回结果形成上下文，分析得到最佳答案返回给用户

### 1.2.1 embedding嵌入模型

`embedding模型`主要作用是把知识库文档转换为向量，存储到向量数据库中, 目前主流`embedding模型`包含如下：

| **需求场景**      | **推荐模型**             | **关键优势**          |
| ----------------- | ------------------------ | --------------------- |
| 纯中文任务        | `text2vec-large-chinese` | 中文语义理解最优      |
| 中英混合检索      | `bge-m3`                 | 多语言支持 + 长上下文 |
| 移动端/低资源部署 | `bge-small-zh`           | 轻量高速，内存占用低  |
| 长文档处理        | `nomic-embed-text`       | 支持 8192 tokens      |
| 快速验证/API 集成 | `text-embedding-3-small` | 免部署，降维灵活      |
| 企业私有化        | `m3e-large` + 本地向量库 | 数据安全 + 定制优化   |


这里我们采用 `bge-m3`模型作为RAG的`embedding模型`，私有化部署可以参考我之前的文章[02篇 AI从零开始 - 部署本地大模型 DeepSeek-R1](https://qborfy.com/ailearn/ai-learn02.html)。

### 1.2.2 检索过程相关

1. `query查询`：在向量数据库中查询与用户提问最相关的数据，通常使用向量数据库提供的`向量检索`功能，返回与用户提问最相关的文档。
   
2. `Reranker重排序`：用于优化初步检索结果的排序，确保最相关的文档优先传递给大语言模型（LLM），从而提升生成答案的准确性和效率，常用的算法有：BM25、DPR、BERTRank等。

3. `Rewrite重写`：主要是针对用户提问进行重写，以提升检索结果的准确性和相关性，常用的算法有：BERT、T5、GPT-3等。

通过这三个步骤可以在知识库检索的召回率和回答用户问题的精确率之间保持一个平衡，从而提升知识库返回的检索结果与用户问题回答的相关性。

> 召回率： 俗称查全率或找回率，定义为实际为正的样本中被预测为正样本的概率。
>
> 举个例子理解，就是有用户提问在知识库检索返回的结果数量为M，如果正确相关为N，那么召回率=N/M。
> 
> 召回率越高说明算法模型对检索相似性要求越严格。

本次实战采用`bge-m3`模型作为RAG的`query查询`模型，`DPR`作为`Reranker重排序`模型，`BERT`作为`Rewrite重写`模型。

### 1.2.3 response响应模型

响应模型：根据用户问题+检索知识库返回结果形成上下文，分析得到最佳答案返回给用户，其中需要注意一下几点：

- 上下文融合（Context Fusion）​：不仅仅要融合用户问题，还要融合检索结果，这样才能保证生成的答案更加符合用户需求。
- ​​幻觉抑制（Hallucination Suppression）：通过提示词指令限制模型仅基于上下文生成答案，避免生成不相关的答案。
- 逻辑连贯性（Logical Coherence）​：多文档推理和因果链构建，强制生成分步骤推理框架

`response响应模型`采用目前主流大模型就好，如：`LLaMA`、`GPT-3`、`DeepSeek`、`Qwen3`等。

我们在国内，所以采用`DeepSeek`作为RAG的`response响应模型`最佳。

# 2. 项目初始化

整体项目结构如下：

![项目结构](/assets/img/ailearn/ai-learn12-1.png)

## 2.1 初始化LangGraph项目

```shell
# 安装langgraph-cli
pip install langgraph-cli
# 初始化项目
langgraph new rag-langgraph --template new-langgraph-project-python

# 运行项目
cd rag-langgraph && langgraph dev
```

运行项目后可以打开[http://127.0.0.1:2024](https://127.0.0.1:2024)查看效果。

## 2.2 初始化web项目
web项目界面我们采用[CopilotKit](https://github.com/CopilotKit/CopilotKit)作为RAG的UI界面，具体搭建步骤如下：

```shell
mkdir rag-web && cd rag-web
# 初始化项目
pnpm init -y
```

项目初始化已完成，以下是生成的文件和目录结构：

1. package.json ：配置了 Monorepo 的工作区 ( workspaces ) 和基本脚本。
2. pnpm-workspace.yaml ：定义了工作区范围，指向 packages/* 。

## 2.2.1 rag-api
api依赖`nestjs`，初始化命令如下：
```shell
cd rag-web && mkdir -p packages/rag-api && cd packages/rag-api && pnpm dlx @nestjs/cli new . --package-manager pnpm

# 安装 copilotkit 依赖
pnpm add @copilotkit/runtime class-validator
```

**调用 Langgraph**
新建`copilotkit.controller.ts`和`copilotkit.module.ts`文件，内容如下：

```ts
// copilotkit.module.ts
import { Module } from '@nestjs/common';
import { CopilotkitController } from './copilotkit.controller';

@Module({
  controllers: [CopilotkitController],
})
export class CopilotkitModule {}
```

```ts
// copilotkit.controller.ts
import { All, Controller, Req, Res } from '@nestjs/common';
import {
    CopilotRuntime,
    copilotRuntimeNestEndpoint,
    ExperimentalEmptyAdapter,
    LangGraphAgent,
} from '@copilotkit/runtime';
import { Request, Response } from 'express';


@Controller("copilotkit")
export class CopilotkitController {
    @All('/')
    copilotkit(@Req() req: Request, @Res() res: Response) {
        const serviceAdapter = new ExperimentalEmptyAdapter();
        console
        const runtime = new CopilotRuntime({
            agents: {
                'graph': new LangGraphAgent({
                    deploymentUrl: 'http://127.0.0.1:2024', // 这里引用 Langgraph暴露的服务
                    graphId: 'graph',
                    //langsmithApiKey: '<your-langsmith-api-key>' // Optional
                }),
            },
        });

        const handler = copilotRuntimeNestEndpoint({
            runtime,
            serviceAdapter,
            endpoint: '/copilotkit',
        });
        return handler(req, res);
    }
}
```

## 2.2 rag-web

```shell
cd rag-web && mkdir -p packages/rag-ui && cd packages/rag-ui && pnpm create vite@latest . --template react-ts

# 安装 copilotkit ui依赖
pnpm add @copilotkit/react-ui @copilotkit/react-core

```

在`src/App.tsx`中引入`copilotkit`，内容如下：

```tsx
import { useState } from 'react'
import { CopilotKit, useCopilotAction } from "@copilotkit/react-core";

import { CopilotChat } from "@copilotkit/react-ui";
import "@copilotkit/react-ui/styles.css";

import CustomAssistantMessage from './component/CustomAssistantMessage';
import CustomUserMessage from './component/CustomUserMessage';
import CustomInput from './component/CustomInput';


function App() {

  return (
    <>
      <CopilotKit
        runtimeUrl="/api/copilotkit" // 对应 api接口地址
        agent="graph" // Langgraph名称
      >
        <CopilotChat
          instructions={"您正在尽力协助用户。请根据您掌握的数据，以最佳方式回答问题。"}
          labels={{
            title: "智能问答助手",
            initial: "你好! 👋 我是智能问答小助手，请问有什么需要帮忙的？",
          }}
        />
      </CopilotKit>
    </>
  )
}

export default App
```

运行 `pnpm dev`，打开[http://127.0.0.1:3000](http://127.0.0.1:3000)查看效果。


## 2.3 搭建Chroma向量数据库
通过`docker-compose`启动Chroma数据库，文件在`docker-compose.yml`，内容如下：

```yaml
version: '3.8' # Specifies the Docker Compose file format version

services:
  chroma: # Defines the ChromaDB service
    image: chromadb/chroma:latest # Uses the latest official ChromaDB Docker image
    ports:
      - "8000:8000" # Maps host port 8000 to container port 8000
    volumes:
      - chroma_data:/chroma/chroma # Persists ChromaDB data to a named volume
    healthcheck: # Defines a health check for the ChromaDB service
      test: ["CMD", "curl", "-f", "http://localhost:8000/api/v1/heartbeat"]
      interval: 30s
      timeout: 10s
      retries: 5
volumes:
  chroma_data: # Defines the named volume for persistent data storage

```

只是先搭建好，后续会将知识库数据导入到Chroma中。

# 3. 项目部署

## 3.1 LangGraph部署

LangGraph-Cli初始化项目后会自动生成 Dockerfile，内容如下：

```Dockerfile
FROM langchain/langgraph-api:3.11-wolfi

# -- Adding local package . --
ADD . /deps/devops-langgraph
# -- End of local package . --

# -- Installing all local dependencies --
RUN PYTHONDONTWRITEBYTECODE=1 uv pip install --system --no-cache-dir -c /api/constraints.txt -e /deps/*
# -- End of local dependencies install --
ENV LANGSERVE_GRAPHS='{"graph": "/deps/devops-langgraph/src/agent/graph.py:graph"}'


# -- Ensure user deps didn't inadvertently overwrite langgraph-api
RUN mkdir -p /api/langgraph_api /api/langgraph_runtime /api/langgraph_license && touch /api/langgraph_api/__init__.py /api/langgraph_runtime/__init__.py /api/langgraph_license/__init__.py
RUN PYTHONDONTWRITEBYTECODE=1 uv pip install --system --no-cache-dir --no-deps -e /api
# -- End of ensuring user deps didn't inadvertently overwrite langgraph-api --
# -- Removing build deps from the final image ~<:===~~~ --
RUN pip uninstall -y pip setuptools wheel
RUN rm -rf /usr/local/lib/python*/site-packages/pip* /usr/local/lib/python*/site-packages/setuptools* /usr/local/lib/python*/site-packages/wheel* && find /usr/local/bin -name "pip*" -delete || true
RUN rm -rf /usr/lib/python*/site-packages/pip* /usr/lib/python*/site-packages/setuptools* /usr/lib/python*/site-packages/wheel* && find /usr/bin -name "pip*" -delete || true
RUN uv pip uninstall --system pip setuptools wheel && rm /usr/bin/uv /usr/bin/uvx

WORKDIR /deps/devops-langgraph
```

后续部署只需要将项目打包成镜像，然后通过 docker-compose 运行即可。

## 3.2 Web项目部署

web项目包含两个项目，rag-api和rag-ui，可以通过`pnpm build`+ dockerfile打包成镜像，然后通过 docker-compose 运行即可。Dockerfile目录如下：

```shell
# 编译 Monorepo项目
cd rag-web && pnpm build
```

**rag-api dockerfile**

```Dockerfile
# rag-api dockerfile
FROM node:v20.19.0

# 安装时区文件
RUN apk add --no-cache tzdata
#设置时区
RUN ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime

COPY packages/rag-api/dist ./dist
COPY packages/rag-api/package.json ./
COPY packages/rag-api/nest-cli.json ./

CMD [ "sh","-c","npm run start" ]
```

**rag-ui dockerfile**
前端项目利用`nginx`作为静态资源服务器，所以需要将前端项目打包成静态资源，然后通过`nginx`作为静态资源服务器。

```Dockerfile
# rag-ui dockerfile
FROM nginx:1.23.2

COPY packages/rag-ui/dist/ /usr/share/nginx/html/
COPY packages/rag-ui/nginx/default.conf /etc/nginx/conf.d/default.conf

# 自定义启动脚本
COPY packages/rag-ui/docker-entrypoint.sh /
RUN chmod +x /docker-entrypoint.sh
CMD /docker-entrypoint.sh
```

**docker-compose.yaml运行**

通过`docker-compose`运行项目，内容如下：

```yaml
version: '3.8' # Specifies the Docker Compose file format version
services:
  rag-langgraph:
    image: rag-langgraph
    ports:
      - "2024:2024"
  rag-api:
    image: rag-api
    ports:
      - "4123:4123"
  rag-ui:
    image: rag-ui
    ports:
      - "3000:3000"
```

其中rag-api和rag-ui的端口映射，可以根据实际情况修改，在 rag-ui项目中 修改 nginx 配置文件，将 4123 端口服务映射到对应 location `/api`中，具体如下:

```conf
server {
	listen 80;
	server_name rag.example.com; 
    location / {
        proxy_pass http://localhost:3000/;
    }

    location /api/ {
        proxy_pass http://127.0.0.1:4123/;
    }
}
```

# 总结

经过本文学习，主要目标是搭建可以正式使用的 RAG 项目服务，本问主要介绍了：
- 如何使用LangGraph-Cli搭建LangGraph
- 如何使用CopilotKit搭建智能问答助手前端
- 如何将项目打包成镜像，然后通过 docker-compose 运行项目
- 如何通过 nginx 配置文件，将 rag-api 服务映射到 rag-ui 项目中

下一章我们讲学习如何开发 Langgraph加载各类知识库，以及如何将知识库数据导入到Chroma中。

# 参考资料

- [LangGraph-Cli官方文档](https://docs.langchain.com/langgraph-platform/cli)
- [CopilotKit官方文档](https://docs.copilotkit.ai/coagents/quickstart)